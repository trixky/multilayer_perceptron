import { writable } from 'svelte/store';
import type AccuracyModel from '../models/accuracy';

function create_default_accuracy(): AccuracyModel | null {
    return <AccuracyModel | null>null
}

function create_accuracy_store() {
    const { subscribe, set } = writable(create_default_accuracy());

    return {
        subscribe,
        reset: () => {
            set(create_default_accuracy())
        },
        set
    }
}

const accuracy_store = create_accuracy_store();

export default accuracy_store;