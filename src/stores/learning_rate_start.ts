import { writable } from 'svelte/store';
import Config from '../config'

function create_learning_rate_start_store() {
    return writable(Config.inputs.learning_rate.start.default);
}

const learning_rate_start_store = create_learning_rate_start_store();

export default learning_rate_start_store;