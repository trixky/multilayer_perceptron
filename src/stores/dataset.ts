import { writable } from 'svelte/store';
import Config from '../config'
import type DatasetModel from '../models/dataset'
import type PatientModel from '../models/patient'

function create_default_accuracy(): DatasetModel {
    return <DatasetModel>{
        prediction: [],
        training: []
    }
}

function create_dataset_store() {
    const { subscribe, update, set } = writable(create_default_accuracy());

    return {
        subscribe,
        reset: () => {
            set(create_default_accuracy())
        },
        set_prediction: (patients: Array<PatientModel>) => {
            update(dataset => {
                dataset.prediction = patients

                return dataset
            })
        },
        set_training: (patients: Array<PatientModel>) => {
            update(dataset => {
                dataset.training = patients

                return dataset
            })
        }
    }
}

const train_test_ratio_store = create_dataset_store();

export default train_test_ratio_store;
