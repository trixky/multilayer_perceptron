import { writable } from 'svelte/store';
import Config from '../config'

function create_epoch_store() {
    return writable(Config.inputs.epochs.default);
}

const epoch_store = create_epoch_store();

export default epoch_store;