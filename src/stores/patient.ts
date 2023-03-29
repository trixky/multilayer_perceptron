import { writable } from 'svelte/store';
import type PatientModel from '../models/patient';
import { shuffle_patients } from '../logic/shuffle';
import { min_max_normalizer } from '../logic/normalizer';

function create_default_patients(): Array<PatientModel> {
    return []
}

function create_patient_store() {
    const { subscribe, update, set } = writable(create_default_patients());

    return {
        subscribe,
        reset: () => {
            set(create_default_patients())
        },
        set,
        shuffle: () => {
            update(patients => {
                patients = shuffle_patients(patients)

                return patients
            })
        },
        normalize_min_max: () => {
            update(patients => {
                min_max_normalizer(patients)

                return patients
            })
        },
    }
}

const patient_store = create_patient_store();

export default patient_store;