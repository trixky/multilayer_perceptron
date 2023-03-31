import { writable } from 'svelte/store';
import type { LayerCaracteristics as LayerCaracteristicsModel } from '../models/layer';
import { bundles as FunctionBundles } from '../logic/functions/activation/bundles'
import type { bundle_types as FunctionBundleTypes } from '../logic/functions/activation/bundles'

import Config from '../config'

function new_default_hidden_layer(): LayerCaracteristicsModel {
    return <LayerCaracteristicsModel>{
        size: Config.inputs.hidden_layers.size.default,
        function: FunctionBundles[Config.inputs.hidden_layers.function.default]
    }
}

function new_default_hidden_layers(): Array<LayerCaracteristicsModel> {
    const LayerCaracteristics = <Array<LayerCaracteristicsModel>>[]

    for (let i = Config.inputs.hidden_layers.number.default; i > 0; i--) {
        LayerCaracteristics.push(new_default_hidden_layer())
    }

    return LayerCaracteristics
}

function create_hidden_layer_caracteristic_store() {
    const { subscribe, update, set } = writable(new_default_hidden_layers());

    return {
        subscribe,
        reset: () => {
            set(new_default_hidden_layers())
        },
        add_layer: (hidden_layer_caracteristics: LayerCaracteristicsModel) => {
            update(hidden_layers => {
                if (hidden_layers.length < Config.inputs.hidden_layers.number.max) {
                    hidden_layers.push(hidden_layer_caracteristics)
                }

                return hidden_layers
            })
        },
        add_default_layer: () => {
            update(hidden_layers => {
                if (hidden_layers.length < Config.inputs.hidden_layers.number.max) {
                    hidden_layers.push(new_default_hidden_layer())
                }
                return hidden_layers
            })
        },
        add_last_copy_layer: () => {
            update(hidden_layers => {
                if (hidden_layers.length < Config.inputs.hidden_layers.number.max) {
                    hidden_layers.push(<LayerCaracteristicsModel>{
                        size: hidden_layers[hidden_layers.length - 1].size,
                        function: hidden_layers[hidden_layers.length - 1].function
                    })
                }

                return hidden_layers
            })
        },
        remove_layer: (index: number) => {
            update(hidden_layers => {
                if (hidden_layers.length > Config.inputs.hidden_layers.number.min) {
                    if (index < hidden_layers.length) {
                        hidden_layers.splice(index, 1)
                    }
                }

                return hidden_layers
            })
        },
        increase_layer_size: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length && hidden_layers[index].size < Config.inputs.hidden_layers.size.max) {
                    hidden_layers[index].size++
                }

                return hidden_layers
            })
        },
        decrease_layer_size: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length && hidden_layers[index].size > Config.inputs.hidden_layers.size.min) {
                    hidden_layers[index].size--
                }

                return hidden_layers
            })
        },
        change_layer_function: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length && hidden_layers[index].function != null) {
                    const function_bundles_keys = Object.keys(FunctionBundles)
                    const function_index = function_bundles_keys.findIndex(function_bundle => function_bundle === hidden_layers[index].function.id)
                    const new_function_index = (function_index + 1) % function_bundles_keys.length
                    
                    hidden_layers[index].function = FunctionBundles[function_bundles_keys[new_function_index] as FunctionBundleTypes]
                }

                return hidden_layers
            })
        },
        move_up_layer: (index: number) => {
            update(hidden_layers => {
                if (index > 0) {
                    const layer_up = hidden_layers[index - 1]
                    const layer_up_copy = <LayerCaracteristicsModel>{
                        size: layer_up.size,
                        function: layer_up.function
                    }

                    hidden_layers[index - 1] = hidden_layers[index]
                    hidden_layers[index] = layer_up_copy

                }
                return hidden_layers
            })
        },
        move_down_layer: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length - 1) {
                    const layer_down = hidden_layers[index + 1]
                    const layer_down_copy = <LayerCaracteristicsModel>{
                        size: layer_down.size,
                        function: layer_down.function
                    }

                    hidden_layers[index + 1] = hidden_layers[index]
                    hidden_layers[index] = layer_down_copy

                }
                return hidden_layers
            })
        },
        randomize: () => {
            const random_hidden_layers: Array<LayerCaracteristicsModel> = []

            // Find a random layer number
            let random_hidden_layer_nbr = Math.ceil(Math.random() * (Config.inputs.hidden_layers.number.max - Config.inputs.hidden_layers.number.min)) + Config.inputs.hidden_layers.number.min;

            // random layer number clamper
            if (random_hidden_layer_nbr > Config.inputs.hidden_layers.number.random.clamper.threshold && Math.floor(Math.random() * Config.inputs.hidden_layers.number.random.clamper.luck) != 0) {
                random_hidden_layer_nbr -= Config.inputs.hidden_layers.number.random.clamper.cut
            }

            for (let i = 0; i < random_hidden_layer_nbr; i++) {
                // Find a random function
                const function_bundles_values = Object.values(FunctionBundles)
                const random_function = function_bundles_values[(Math.floor(Math.random() * function_bundles_values.length))];

                // Find a random layer size
                let random_size = Math.ceil(Math.random() * (Config.inputs.hidden_layers.size.max - Config.inputs.hidden_layers.size.min)) + Config.inputs.hidden_layers.size.min;

                // random layer size clamper
                if (random_size > Config.inputs.hidden_layers.size.random.clamper.threshold && Math.floor(Math.random() * Config.inputs.hidden_layers.size.random.clamper.luck) != 0) {
                    random_size -= Config.inputs.hidden_layers.size.random.clamper.cut
                }

                random_hidden_layers.push(<LayerCaracteristicsModel>{
                    function: random_function,
                    size: random_size
                })
            }

            set(random_hidden_layers)
        }
    };
}

const hidden_layer_caracteristic_store = create_hidden_layer_caracteristic_store();

export default hidden_layer_caracteristic_store;