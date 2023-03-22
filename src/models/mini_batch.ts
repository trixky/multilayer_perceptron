import type PatientModel from './patient'

export default interface MiniBatch {
    patients: Array<PatientModel>
}