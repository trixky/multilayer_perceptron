import { writable } from 'svelte/store';

function create_progress_store() {
    return writable(false);
}

const progress_store = create_progress_store();

export default progress_store;