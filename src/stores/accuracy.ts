import { writable } from 'svelte/store';
import type AccuracyModel from '../models/accuracy';

function create_default_accuracy(): Array<AccuracyModel> {
    return []
}

function create_accuracy_store() {
    const { subscribe, update, set } = writable(create_default_accuracy());

    return {
        subscribe,
        reset: () => {
            set(create_default_accuracy())
        },
        push: (accuracy: AccuracyModel) => {
            update(accuracies => {
                accuracies.push(accuracy)

                return accuracies
            })
        }
    }
}

const accuracy_store = create_accuracy_store();

export default accuracy_store;