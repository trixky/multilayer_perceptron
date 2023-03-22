import { writable } from 'svelte/store';
import type { LayerCaracteristics as LayerCaracteristicsModel } from '../models/layer';
import { Functions } from '../models/layer';
import Config from '../config'

function new_default_output_layers(): LayerCaracteristicsModel {
    return <LayerCaracteristicsModel>{
        size: Config.inputs.output_layer.size.default,
        function: Config.inputs.output_layer.function.default
    }
}

function create_output_layer_caracteristic_store() {
    const { subscribe, update, set } = writable(new_default_output_layers());

    return {
        subscribe,
        reset: () => {
            set(new_default_output_layers())
        },
        change_layer_function: (index: number) => {
            update(output_layer => {
                const function_index = Object.values(Functions).indexOf(output_layer.function)
                const new_function_index = (function_index + 1) % Object.values(Functions).length

                output_layer.function = Object.values(Functions)[new_function_index]

                return output_layer
            })
        },
        randomize: () => {
            update(output_layer => {
                // TODO (use rand)
                output_layer.function = Functions.sigmoid

                return output_layer
            })
        }
    };
}

const output_layer_caracteristic_store = create_output_layer_caracteristic_store();

export default output_layer_caracteristic_store;