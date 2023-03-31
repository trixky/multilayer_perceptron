import type { Layer as LayerModel } from "../models/layer";
import type { LayerCaracteristics as LayerCaracteristicsModel } from '../models/layer';
import type PerceptronModel from "../models/perceptron";
import type PatientModel from "../models/patient";
import Config from '../config'
import SigmoidBundle from "./functions/activation/sigmoid";
import { softmax } from "./functions/error/softmax";
import { binary_cross_entropy_wrt_softmax_input_derivate } from "./functions/error/bce";
import type AccuracyModel from "../models/accuracy";
import type WeightModel from '../models/weight'
import type ModelBackupModel from '../models/backup'

export default class Model {
    private hidden_layer_caracteristics: Array<LayerCaracteristicsModel>

    private hidden_layers: Array<LayerModel>;
    private output_layer: LayerModel
    private learned_weights: Array<WeightModel>;

    // =========================================================== Constructor / copy / randomize
    // =================================
    // ==================

    constructor(hidden_layer_caracteristics: Array<LayerCaracteristicsModel>) {
        // ----------------------- Initialize hidden layers
        this.hidden_layer_caracteristics = hidden_layer_caracteristics
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
            perceptrons: Array(Config.inputs.output_layer.size.default).fill(null).map(_ => <PerceptronModel>{
                bias: 0,
                weights: Array(last_hidden_layer.size).fill(null).map(_ => 0),
                output: 0,
                error: 0
            })
        }

        // ----------------------- Initialize learned weights layers
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

    // =========================================================== Import / Export
    // =================================
    // ==================

    // export exports a model from a backup
    export(): ModelBackupModel {
        return <ModelBackupModel>{
            hidden_layer_caracteristics: this.hidden_layer_caracteristics,
            hidden_layers: this.hidden_layers,
            output_layer: this.output_layer,
            learned_weights: this.learned_weights,
        }
    }

    // import imports a model from a backup
    import(model_backup: ModelBackupModel) {
        this.hidden_layer_caracteristics = model_backup.hidden_layer_caracteristics
        this.hidden_layers = model_backup.hidden_layers
        this.output_layer = model_backup.output_layer
        this.learned_weights = model_backup.learned_weights
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

    get_accuracy(patients: Array<PatientModel>): AccuracyModel {
        const accuracy = <AccuracyModel>{
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

    train(patients: Array<PatientModel>, current_learning_rate: number) {
        this.learned_weights = []

        patients.forEach(patient => {
            this.forward(patient)
            this.backward(patient)
            this.learn(patient, current_learning_rate)
        })

        this.fit()
    }

    // =========================================================== Forward
    // =================================
    // ==================

    private forward(patient: PatientModel) {
        // ----------------------- Hidden layers
        this.hidden_layers.forEach((hidden_layer, hidden_layer_index) => {
            // For each layer of the model
            const first_hidden_layer = hidden_layer_index == 0
            const inputs = first_hidden_layer ? patient.inputs : this.hidden_layers[hidden_layer_index - 1].perceptrons.map(perceptron => perceptron.output)

            // compute and active the outputs
            hidden_layer.perceptrons.forEach(perceptron => {
                const weighed_inputs = perceptron.weights.map((weight, weight_index) => weight * inputs[weight_index]).reduce((a, b) => a + b, 0)
                const bias = perceptron.bias

                perceptron.output = this.hidden_layer_caracteristics[hidden_layer_index].function.activation(weighed_inputs + bias)
            })
        })

        // ----------------------- Output layer
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
        binary_cross_entropy_wrt_softmax_input_derivate(this.output_layer.perceptrons.map(perceptron => perceptron.output), [patient.diagnosis, !patient.diagnosis])
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
                    current_perceptron.error += next_perceptron.weights[current_perceptron_index] * next_perceptron.error * this.hidden_layer_caracteristics[hidden_layer_index].function.derivative(next_perceptron.output)
                })
            })
        })

        this.hidden_layers.reverse()
    }

    private learn(patient: PatientModel, current_learning_rate: number) {
        const inputs = this.hidden_layers[this.hidden_layers.length - 1].perceptrons.map(perceptron => perceptron.output)

        // ----------------------- Output layer
        const learned_weights_output_layer = this.output_layer.perceptrons.map(perceptron => {
            const correction = current_learning_rate * perceptron.error

            // ------- weights
            const learned_weights = perceptron.weights.map((_, weight_index) =>
                perceptron.weights[weight_index] - correction * inputs[weight_index])

            // ------- bias
            const learned_bias = perceptron.bias - correction * Config.inputs.learning_rate.bias.inputs_factor * Config.inputs.learning_rate.bias.limiter

            return [...learned_weights, learned_bias]
        })


        // ----------------------- Hidden layers
        const learned_weights_hidden_layers = this.hidden_layers.map((hidden_layer, hidden_layer_index) => {
            const first_hidden_layer = hidden_layer_index == 0
            const inputs = first_hidden_layer ? patient.inputs : this.hidden_layers[hidden_layer_index - 1].perceptrons.map(perceptron => perceptron.output)

            return hidden_layer.perceptrons.map(perceptron => {
                const correction = current_learning_rate * perceptron.error

                // ------- weights
                const learned_weights = perceptron.weights.map((_, weight_index) =>
                    perceptron.weights[weight_index] - correction * inputs[weight_index]
                )
                // ------- bias
                const learned_bias = perceptron.bias - correction * Config.inputs.learning_rate.bias.inputs_factor * Config.inputs.learning_rate.bias.limiter

                return [...learned_weights, learned_bias]
            })
        })

        this.learned_weights.push(<WeightModel>{
            hidden_layers: learned_weights_hidden_layers,
            output_layer: learned_weights_output_layer,
        })
    }

    // fit updates the weight of the model to fit with the expected result using the calculated errors
    private fit() {
        // ----------------------- Ouput layer
        this.output_layer.perceptrons.forEach((perceptron, perceptron_index) => {
            // ------- weights
            perceptron.weights.forEach((_, weight_index) => {
                this.output_layer.perceptrons[perceptron_index].weights[weight_index] = this.learned_weights
                    .map(learned_weights => learned_weights.output_layer[perceptron_index][weight_index])
                    .reduce((a, b) => a + b) / (this.learned_weights.length)
            });

            // ------- bias
            this.output_layer.perceptrons[perceptron_index].bias = this.learned_weights.map(learned_weights => learned_weights.output_layer[perceptron_index][learned_weights.output_layer[perceptron_index].length - 1]).reduce((a, b) => a + b) / (this.learned_weights.length - 1)
        })

        // ----------------------- Hidden layers
        this.hidden_layers.forEach((hiddeen_layer, hidden_layer_index) =>
            hiddeen_layer.perceptrons.forEach((perceptron, perceptron_index) => {
                // ------- weights
                perceptron.weights.forEach((_, weight_index) => {
                    this.hidden_layers[hidden_layer_index].perceptrons[perceptron_index].weights[weight_index] = this.learned_weights
                        .map(learned_weights => learned_weights.hidden_layers[hidden_layer_index][perceptron_index][weight_index])
                        .reduce((a, b) => a + b) / (this.learned_weights.length)
                });

                // ------- bias
                this.hidden_layers[hidden_layer_index].perceptrons[perceptron_index].bias = this.learned_weights.map(learned_weights => learned_weights.hidden_layers[hidden_layer_index][perceptron_index][learned_weights.hidden_layers[hidden_layer_index][perceptron_index].length - 1]).reduce((a, b) => a + b) / (this.learned_weights.length - 1)
            }))
    }
}