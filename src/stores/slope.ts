import { writable } from 'svelte/store';
import Config from '../config'

function create_slope_store() {
    return writable(Config.inputs.dataset.slope.default);
}

const slope_store = create_slope_store();

export default slope_store;