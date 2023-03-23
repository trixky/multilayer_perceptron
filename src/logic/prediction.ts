import type ModelModel from "../models/model";
import type PatientModel from '../models/patient'
import type MiniBatchModel from '../models/mini_batch'
import type { PatientPrediction as PatientPredictionModel, MiniBatchPrediction as MiniBatchPredictionModel } from '../models/prediction'
import sigmoid from './functions/sigmoid'


// predict_patient predicts the patient result values according to the model
export function predict_patient(model: ModelModel, patient: PatientModel): PatientPredictionModel {
    // Intitialize the patient prediction
    const patient_prediction = <PatientPredictionModel>{
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
export function predict_mini_batch(model: ModelModel, mini_batch: MiniBatchModel): MiniBatchPredictionModel {
    // Intitialize the mini-batch prediction
    let mini_batch_prediction = <MiniBatchPredictionModel>{
        patients: []
    }

    mini_batch.patients.forEach((patient, patient_index) => {
        // For each patient of the mini-batch

        // Compute the patient prediction
        const patient_prediction = predict_patient(model, patient)

        // Add the patient prediction to the mini batch patient predictions
        mini_batch_prediction.patients.push(patient_prediction)
    })

    return mini_batch_prediction
}