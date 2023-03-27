import type { Layer as LayerModel } from "../models/layer";
import type { LayerCaracteristics as LayerCaracteristicsModel } from '../models/layer';
import type PerceptronModel from "../models/perceptron";
import type PatientModel from "../models/patient";
import Config from '../config'
import sigmoid from "./functions/sigmoid";
import { softmax } from "./functions/softmax";
import { derivated_binary_cross_entropy_wrt_softmax_input } from "./functions/bce";
import { derivate_sigmoid } from "../models/derivation";
import type Patient from "../models/patient";

interface LearnedWeights {
    hidden_layers: Array<Array<Array<number>>>,
    output_layer: Array<Array<number>>,
}

interface Accuracy {
    mean: number,
    net: {
        valid: {
            malignant: number,
            benign: number,
        },
        invalid: {
            malignant: number,
            benign: number,
        }
    }
}


export default class Model {
    private hidden_layers: Array<LayerModel>;
    private output_layer: LayerModel
    private learned_weights: Array<LearnedWeights>;

    // =========================================================== Constructor / copy / randomize
    // =================================
    // ==================

    constructor(hidden_layer_caracteristics: Array<LayerCaracteristicsModel>, output_layer_caracteristics: LayerCaracteristicsModel) {
        // ----------------------- Initialize hidden layers
        this.hidden_layers = Array(hidden_layer_caracteristics.length).fill(null)
        hidden_layer_caracteristics.forEach((hidden_layer_caracteristic, hidden_layer_caracteristic_index) => {
            const first_hidden_layer = hidden_layer_caracteristic_index == 0
            const previous_layer_size = first_hidden_layer ? Config.inputs.input_layer.size.default : hidden_layer_caracteristics[hidden_layer_caracteristic_index - 1].size

            this.hidden_layers[hidden_layer_caracteristic_index] = <LayerModel>{
                caracteristics: hidden_layer_caracteristic,
                perceptrons: Array(hidden_layer_caracteristic.size).fill(null).map(_ => <PerceptronModel>{
                    bias: 0,
                    weights: Array(previous_layer_size).fill(null).map(_ => 0),
                    output: 0,
                    error: 0
                })
            }
        })

        // ----------------------- Initialize output layers
        const last_hidden_layer = hidden_layer_caracteristics[hidden_layer_caracteristics.length - 1]
        this.output_layer = <LayerModel>{
            caracteristics: output_layer_caracteristics,
            perceptrons: Array(output_layer_caracteristics.size).fill(null).map(_ => <PerceptronModel>{
                bias: 0,
                weights: Array(last_hidden_layer.size).fill(null).map(_ => 0),
                output: 0,
                error: 0
            })
        }

        // ----------------------- Initialize output layers
        this.learned_weights = []

        // ----------------------- Randomize hidden and output layers
        this.randomize()
    }

    copy() {
        // TODO
    }

    private randomize() {
        // ----------------------- Randomize hidden layers
        this.hidden_layers = this.hidden_layers.map(layer => <LayerModel>{
            perceptrons: layer.perceptrons.map(perceptron => <PerceptronModel>{
                bias: Config.module.random.bias.max - Math.random() * Math.abs(Config.module.random.bias.min - Config.module.random.bias.max),
                weights: perceptron.weights.map(_ => Config.module.random.weight.max - Math.random() * Math.abs(Config.module.random.weight.min - Config.module.random.weight.max)),
                error: perceptron.error,
                output: perceptron.output
            })
        })

        // ----------------------- Randomize output layers
        this.output_layer = <LayerModel>{
            perceptrons: this.output_layer.perceptrons.map(perceptron => <PerceptronModel>{
                bias: Config.module.random.bias.max - Math.random() * Math.abs(Config.module.random.bias.min - Config.module.random.bias.max),
                weights: perceptron.weights.map(_ => Config.module.random.weight.max - Math.random() * Math.abs(Config.module.random.weight.min - Config.module.random.weight.max)),
                error: perceptron.error,
                output: perceptron.output
            })
        }
    }

    // =========================================================== Getter / Setter
    // =================================
    // ==================

    get_outputs(): Array<number> {
        return this.output_layer.perceptrons.map(perceptron => perceptron.output)
    }

    get_errors(): Array<Array<number>> {
        return [...this.get_hidden_layers_errors(), this.get_output_layer_errors()]
    }

    get_hidden_layers_errors(): Array<Array<number>> {
        return this.hidden_layers.map(hidden_layer => hidden_layer.perceptrons.map(perceptron => perceptron.error))
    }

    get_output_layer(): Array<number> {
        return this.output_layer.perceptrons.map(perceptron => perceptron.output)
    }

    get_output_layer_errors(): Array<number> {
        return this.output_layer.perceptrons.map(perceptron => perceptron.error)
    }

    get_weights(): Array<Array<Array<number>>> {
        return [...this.get_hidden_layers_weights(), this.get_output_layer_weights()]
    }

    get_hidden_layers_weights(): Array<Array<Array<number>>> {
        return this.hidden_layers.map(hidden_layer => hidden_layer.perceptrons.map(perceptron => perceptron.weights))
    }

    get_output_layer_weights(): Array<Array<number>> {
        return this.output_layer.perceptrons.map(perceptron => perceptron.weights)
    }

    // =========================================================== Accuracy (predict)
    // =================================
    // ==================

    get_accuracy(patients: Array<PatientModel>): Accuracy {
        const accuracy = <Accuracy>{
            mean: 0,
            net: {
                valid: {
                    malignant: 0,
                    benign: 0,
                },
                invalid: {
                    malignant: 0,
                    benign: 0,
                }
            }
        }

        patients.map(patient => {
            const outputs = this.predict(patient)
            console.log("*********")
            console.log(patient.diagnosis)
            console.log(outputs)

            accuracy.mean += outputs[Number(!patient.diagnosis)]

            if (patient.diagnosis) {
                // If the diagnosis is malignant
                outputs[0] > 0.5 ? accuracy.net.valid.malignant++ : accuracy.net.invalid.malignant++
            } else {
                // Else the diagnosis is benign
                outputs[1] > 0.5 ? accuracy.net.valid.benign++ : accuracy.net.invalid.benign++
            }

        })

        accuracy.mean /= patients.length

        return accuracy
    }

    // =========================================================== Predict (forward)
    // =================================
    // ==================

    predict(patient: PatientModel): Array<number> {
        this.forward(patient)

        return this.get_output_layer()
    }

    // =========================================================== Train (forward + backward)
    // =================================
    // ==================

    train(patients: Array<PatientModel>) {
        this.learned_weights = []

        patients.forEach(patient => {
            this.forward(patient)
            this.backward(patient)
            this.learn(patient)
        })

        this.fit()
    }

    // =========================================================== Forward
    // =================================
    // ==================

    private forward(patient: PatientModel) {
        // ----------------------- Forward hidden layers
        this.hidden_layers.forEach((hidden_layer, hidden_layer_index) => {
            // For each layer of the model
            const first_hidden_layer = hidden_layer_index == 0
            const inputs = first_hidden_layer ? patient.inputs : this.hidden_layers[hidden_layer_index - 1].perceptrons.map(perceptron => perceptron.output)

            // compute and active the outputs
            hidden_layer.perceptrons.forEach(perceptron => {
                const weighed_inputs = perceptron.weights.map((weight, weight_index) => weight * inputs[weight_index]).reduce((a, b) => a + b, 0)
                const bias = perceptron.bias

                perceptron.output = sigmoid(weighed_inputs + bias)
            })
        })

        // ----------------------- Forward output layers
        const last_hidden_layer = this.hidden_layers[this.hidden_layers.length - 1]
        const inputs = last_hidden_layer.perceptrons.map(perceptron => perceptron.output)

        // compute the outputs
        this.output_layer.perceptrons.forEach(perceptron => {
            const weighed_inputs = perceptron.weights.map((weight, weight_index) => weight * inputs[weight_index]).reduce((a, b) => a + b, 0)
            const bias = perceptron.bias

            perceptron.output = weighed_inputs + bias
        })

        const unactivated_outputs = this.output_layer.perceptrons.map(perceptron => perceptron.output)
        const activated_outputs = softmax(unactivated_outputs)

        // Active the outputs
        this.output_layer.perceptrons.forEach((perceptron, perceptron_index) => {
            perceptron.output = activated_outputs[perceptron_index]
        })
    }

    // =========================================================== Backward
    // =================================
    // ==================

    private backward(patient: PatientModel) {
        // https://machinelearningmastery.com/implement-backpropagation-algorithm-scratch-python/

        this.error_backpropagation_output_layer(patient)
        this.error_backpropagation_hidden_layers()
    }

    // error_backpropagation_output_layer estimates the errors of the output layer
    // by comparing the patient result and the prediction
    private error_backpropagation_output_layer(patient: PatientModel) {
        // Compute the output layer errors using the derivated binary cross entropy wrt the softmax output
        derivated_binary_cross_entropy_wrt_softmax_input(this.output_layer.perceptrons.map(perceptron => perceptron.output), [patient.diagnosis, !patient.diagnosis])
            // Update the output layer errors
            .forEach((bce_error, bce_error_index) => {
                this.output_layer.perceptrons[bce_error_index].error = bce_error
            })
    }

    // error_backpropagation_hidden_layers estimates the errors of the hidden layers
    // by comparing the patient result and the prediction
    private error_backpropagation_hidden_layers() {
        this.hidden_layers.reverse().forEach((hidden_layer, hidden_layer_index) => {
            const last_hidden_layer = hidden_layer_index == 0
            const next_layer = last_hidden_layer ? this.output_layer : this.hidden_layers[hidden_layer_index - 1]

            hidden_layer.perceptrons.forEach((current_perceptron, current_perceptron_index) => {
                current_perceptron.error = 0

                next_layer.perceptrons.forEach(next_perceptron => {
                    current_perceptron.error += next_perceptron.weights[current_perceptron_index] * next_perceptron.error * derivate_sigmoid(next_perceptron.output)
                })
            })
        })

        this.hidden_layers.reverse()
    }

    private learn(patient: PatientModel) {
        const inputs = this.hidden_layers[this.hidden_layers.length - 1].perceptrons.map(perceptron => perceptron.output)

        const learned_weight_output_layer = this.output_layer.perceptrons.map(perceptron =>
            perceptron.weights.map((_, weight_index) => perceptron.weights[weight_index] - Config.inputs.learning.rate.default * perceptron.error * inputs[weight_index])
        )

        const learned_weights_hidden_layers = this.hidden_layers.map((hidden_layer, hidden_layer_index) => {
            const first_hidden_layer = hidden_layer_index == 0
            const inputs = first_hidden_layer ? patient.inputs : this.hidden_layers[hidden_layer_index - 1].perceptrons.map(perceptron => perceptron.output)

            return hidden_layer.perceptrons.map(perceptron =>
                perceptron.weights.map((_, weight_index) =>
                    perceptron.weights[weight_index] - Config.inputs.learning.rate.default * perceptron.error * inputs[weight_index]
                )
            )
        })

        this.learned_weights.push(<LearnedWeights>{
            hidden_layers: learned_weights_hidden_layers,
            output_layer: learned_weight_output_layer,
        })
    }

    // fit updates the weight of the model to fit with the expected result using the calculated errors
    private fit() {
        this.output_layer.perceptrons.forEach((perceptron, perceptron_index) => {
            perceptron.weights.forEach((_, weight_index) => {
                this.output_layer.perceptrons[perceptron_index].weights[weight_index] = this.learned_weights
                    .map(learned_weights => learned_weights.output_layer[perceptron_index][weight_index])
                    .reduce((a, b) => a + b) / this.learned_weights.length
            });
        })

        this.hidden_layers.forEach((hiddeen_layer, hidden_layer_index) =>
            hiddeen_layer.perceptrons.forEach((perceptron, perceptron_index) => {
                perceptron.weights.forEach((_, weight_index) => {
                    this.hidden_layers[hidden_layer_index].perceptrons[perceptron_index].weights[weight_index] = this.learned_weights
                        .map(learned_weights => learned_weights.hidden_layers[hidden_layer_index][perceptron_index][weight_index])
                        .reduce((a, b) => a + b) / this.learned_weights.length
                });
            }))
    }
}