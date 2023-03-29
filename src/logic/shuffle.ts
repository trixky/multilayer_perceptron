import type PatientModel from '../models/patient'

// shuffle_patients generates a shuffled patients copy
export function shuffle_patients(patients: Array<PatientModel>): Array<PatientModel> {
    // Generates a copy of the patients
    let patients_copy = patients.map(patient => 
        <PatientModel>{
            id: patient.id,
            diagnosis: patient.diagnosis,
            inputs: patient.inputs,
        }
    )

    // Shuffle the copy
    return patients_copy.sort(_ => 0.5 - Math.random())
}