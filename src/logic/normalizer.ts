import Config from '../config'
import type PatientModel from '../models/patient'

interface MinMax {
    min: number,
    max: number,
    diff: number
}

// min_max_normalizer normalize patients inputs ([0,...,1]) according to their min and max
export function min_max_normalizer(patients: Array<PatientModel>) {
    // Initializes the min max inputs array
    const min_max_inputs = Array(Config.inputs.input_layer.size.default).fill(null).map(_ => <MinMax>{
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY,
        diff: 0
    })

    // Find the min and max of each input
    patients.forEach(patient => {
        patient.inputs.forEach((input, input_index) => {
            if (input > min_max_inputs[input_index].max) min_max_inputs[input_index].max = input
            if (input < min_max_inputs[input_index].min) min_max_inputs[input_index].min = input
        })
    })

    // Compute the diff between the min and max of each input
    min_max_inputs.forEach(input => {
        input.diff = input.max - input.min
    })

    // Normalizes each input of each patient using the min/max/diff of the corresponding input
    patients.forEach(patient => patient.inputs = patient.inputs.map((input, input_index) => (input - min_max_inputs[input_index].min) / min_max_inputs[input_index].diff))
}