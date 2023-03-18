import type PatientModel from '../models/patient'

// parse_patient_line parse a line of the the file
function parse_patient_line(patient_line: string): PatientModel {
    // Initilalize the patient object
    const patient = <PatientModel>{}
    
    // Split the cases of the patient
    const patient_cases = patient_line.split(',')
    
    // Read the id of the patient (first case)
    patient.id = patient_cases[0]
    // Read the diagnosis of the patient (seconde case)
    patient.diagnosis = patient_cases[1] == 'M'
    // Read the inputs of the patient (the rest of the cases)
    patient.inputs = patient_cases.slice(2).map(input => parseFloat(input))
    
    return patient
}

// parse_file parse the file
export default function parse_file(file: string): Array<PatientModel> {
    // Split the patients of the file
    const patients_lines = file.split('\n')

    // Parse patients from their corresponding lines
    const patients = patients_lines.map(patient_line => parse_patient_line(patient_line))
    
    return patients
}