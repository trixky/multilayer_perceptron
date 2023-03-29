import { writable } from 'svelte/store';
import type ModelModel from '../logic/model';

function create_default_model(): ModelModel | null {
    return <ModelModel | null>null
}

function create_model_store() {
    const { subscribe, set } = writable(<ModelModel | null>create_default_model());

    return {
        subscribe,
        reset: () => {
            set(null)
        },
        set
    }
}

const model_store = create_model_store();

export default model_store;