import type PatientModel from './patient'

export default interface Dataset {
    training: Array<PatientModel>,
    prediction: Array<PatientModel>
}