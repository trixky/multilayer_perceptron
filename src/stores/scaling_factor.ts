import { writable } from 'svelte/store';
import Config from '../config'

function create_scaling_factor_store() {
    return writable(Config.inputs.dataset.scaling_factor.default);
}

const scaling_factor_store = create_scaling_factor_store();

export default scaling_factor_store;