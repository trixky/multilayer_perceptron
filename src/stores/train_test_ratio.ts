import { writable } from 'svelte/store';
import Config from '../config'

function create_train_test_ratio_store() {
    return writable(Config.inputs.dataset.train_test_ratio.default);
}

const train_test_ratio_store = create_train_test_ratio_store();

export default train_test_ratio_store;