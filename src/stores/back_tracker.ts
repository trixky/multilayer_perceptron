import { writable } from 'svelte/store';
import type { LayerCaracteristics as LayerCaracteristicsModel } from '../models/layer';

import Config from '../config'

function new_default_layer(): LayerCaracteristicsModel {
    return <LayerCaracteristicsModel>{
        size: Config.inputs.hidden_layers.size.default,
        function: Config.inputs.hidden_layers.function.default
    }
}

function new_default_layers(): Array<LayerCaracteristicsModel> {
    const LayerCaracteristics = <Array<LayerCaracteristicsModel>>[]

    for (let i = Config.inputs.hidden_layers.number.default; i > 0; i--) {
        LayerCaracteristics.push(new_default_layer())
    }

    return LayerCaracteristics
}

function create_layer_caracteristic_store() {
    const { subscribe, update, set } = writable(new_default_layers());

    return {
        subscribe,
        reset: () => {
            set(new_default_layers())
        },
    }
}

const layer_caracteristic_store = create_layer_caracteristic_store();

export default layer_caracteristic_store;