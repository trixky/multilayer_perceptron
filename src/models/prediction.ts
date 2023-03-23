export interface PatientPrediction {
    layers: Array<Array<number>> // layers // perceptrons // result value
}

export interface MiniBatchPrediction {
    patients: Array<PatientPrediction>
}