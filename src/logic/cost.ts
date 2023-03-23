import type PatientModel from "../models/patient";
import type { PatientPrediction as PatientPredictionModel, MiniBatchPrediction as MiniBatchPredictionModel } from "../models/prediction";
import type OutputCostModel from "../models/output_cost";
import type MiniBatchModel from "../models/mini_batch";

// estimate_patient_output_layer_cost estimates the cost of each perceptron output
// of the output layer by comparing the patient result and the prediction
export function estimate_patient_output_layer_cost(patient: PatientModel, prediction: PatientPredictionModel): OutputCostModel {
    // Initialize the patient output cost
    const patient_output_cost = <OutputCostModel>{
        perceptron_costs: Array(2).fill(0)
    }

    // Extract the output layer from the prediction
    const output_layer = prediction.layers[prediction.layers.length - 1]

    // Compute the cost of the first perceptron output
    patient_output_cost.perceptron_costs[0] = Math.pow(output_layer[0] - Number(patient.diagnosis), 2)
    // Compute the cost of the second perceptron output
    patient_output_cost.perceptron_costs[1] = Math.pow(output_layer[1] - Number(!patient.diagnosis), 2)

    return patient_output_cost
}

// estimate_mini_batch_output_layer_cost estimates the cost of each patient prediction and compute the mean
export function estimate_mini_batch_output_layer_cost(mini_batch: MiniBatchModel, predictions: MiniBatchPredictionModel): OutputCostModel {
    // Initialize the mini-batch output cost
    const mini_batch_output_cost = <OutputCostModel>{
        perceptron_costs: Array(2).fill(0)
    }

    mini_batch.patients.forEach((patient, patient_index) => {
        // For each patient of the mini-batch
        // Estimate the patient output layer cost
        const patient_output_layer_cost = estimate_patient_output_layer_cost(patient, predictions.patients[patient_index])
        // Sum the patient output layer cost to the mini-batch output cost
        patient_output_layer_cost.perceptron_costs.forEach((perceptron_cost, perceptron_cost_index) => {mini_batch_output_cost.perceptron_costs[perceptron_cost_index] += perceptron_cost})
    })

    // Do the mean of the mini-batch output costs
    mini_batch_output_cost.perceptron_costs = mini_batch_output_cost.perceptron_costs.map(perceptron_cost => perceptron_cost / mini_batch.patients.length)

    return mini_batch_output_cost
}

// estimate_total_cost estimates the total cost of a output layer cost
export function estimate_total_cost(output_cost: OutputCostModel): number {
    return output_cost.perceptron_costs.reduce((cost, a) => cost + a, 0);
}