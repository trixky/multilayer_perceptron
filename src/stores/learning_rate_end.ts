import { writable } from 'svelte/store';
import Config from '../config'

function create_learning_rate_end_store() {
    return writable(Config.inputs.learning_rate.end.default);
}

const learning_rate_end_store = create_learning_rate_end_store();

export default learning_rate_end_store;