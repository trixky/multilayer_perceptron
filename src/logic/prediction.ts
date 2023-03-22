import type ModelModel from "../models/model";
import type PatientModel from '../models/patient'
import type MiniBatchModel from '../models/mini_batch'
import type PredictionModel from '../models/prediction'

// sigmoid implement the mathematical sigmoid function
function sigmoid(z: number) {
    const k = 2;

    return 1 / (1 + Math.exp(-z / k));
}

// predict_patient predicts the patient result values according to the model
export function predict_patient(model: ModelModel, patient: PatientModel): PredictionModel {
    // Intitialize the patient prediction
    const patient_prediction = <PredictionModel>{
        layers: []
    }

    // Intitialize the previous layer values with the patient inputs
    let previous_values: Array<number> = patient.inputs

    model.layers.forEach(layer => {
        // For each layer of the model

        // Initialize the result values of the layer
        const current_values: Array<number> = []

        layer.perceptrons.forEach(perceptron => {
            // For each perceptron of the layer

            // Initialize the sum of the previous layer values
            let current_sum: number = 0

            perceptron.weights.forEach((weight, weight_index) => {
                // For each perceptron weight

                // Add the to the sum the corresponding previous layer value
                // Affected by its weight
                current_sum += previous_values[weight_index] * weight
            })

            // Add the perceptron bias to the sum
            current_sum += perceptron.bias

            // Call the sigmoid function on the sum
            // TODO: use the perceptron function
            const current_value = sigmoid(current_sum)

            // Save the final result value to the layer result values
            current_values.push(current_value)
        })

        // Save the current layer result values as the previous one for the next iteration
        previous_values = current_values

        // Save the current layer result values in the patient prediction
        patient_prediction.layers.push(current_values)
    })

    return patient_prediction
}

// predict_mini_batch predicts the mini-batch result values according to the model
export function predict_mini_batch(model: ModelModel, mini_batch: MiniBatchModel): PredictionModel {
    // Intitialize the mini-batch prediction
    let mini_batch_prediction = <PredictionModel>{
        layers: model.layers.map(layer => layer.perceptrons.map(_ => 0))
    }

    mini_batch.patients.forEach((patient, patient_index) => {
        // For each patient of the mini-batch

        // Compute the patient prediction
        const patient_prediction = predict_patient(model, patient)

        // add each result values of each layers of the patient prediction to the mini-bach prediction
        patient_prediction.layers.forEach((layer, layer_index) => {
            layer.forEach((value, value_index) => {
                mini_batch_prediction.layers[layer_index][value_index] += value
            })
        })
    })

    // Compute the mean of each result values of each layers of each patients of the mini-batch
    mini_batch_prediction.layers = mini_batch_prediction.layers.map(layer => layer.map(value => value / mini_batch.patients.length))

    return mini_batch_prediction
}