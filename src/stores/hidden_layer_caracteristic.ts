import { writable } from 'svelte/store';
import type { HiddenLayerCaracteristics as HiddenLayerCaracteristicsModel } from '../models/hidden_layer';
import { Functions } from '../models/hidden_layer';

import Config from '../config'

function new_default_hidden_layer(): HiddenLayerCaracteristicsModel {
    return <HiddenLayerCaracteristicsModel>{
        size: Config.inputs.hidden_layers.size.default,
        function: Config.inputs.hidden_layers.function.default
    }
}

function new_default_hidden_layers(): Array<HiddenLayerCaracteristicsModel> {
    const HiddenLayerCaracteristics = <Array<HiddenLayerCaracteristicsModel>>[]

    for (let i = Config.inputs.hidden_layers.number.default; i > 0; i--) {
        HiddenLayerCaracteristics.push(new_default_hidden_layer())
    }

    return HiddenLayerCaracteristics
}

function create_hidden_layer_caracteristic_store() {
    const { subscribe, update, set } = writable(new_default_hidden_layers());

    return {
        subscribe,
        reset: () => {
            set(new_default_hidden_layers())
        },
        add_layer: (hidden_layer_caracteristics: HiddenLayerCaracteristicsModel) => {
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
                    hidden_layers.push(<HiddenLayerCaracteristicsModel>{
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
        update_layer_size: (size: number, index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length) {
                    hidden_layers[index].size = size
                }

                return hidden_layers
            })
        },
        increase_layer_size: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length) {
                    hidden_layers[index].size++
                }

                return hidden_layers
            })
        },
        decrease_layer_size: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length) {
                    hidden_layers[index].size--
                }

                return hidden_layers
            })
        },
        change_layer_function: (index: number) => {
            update(hidden_layers => {
                if (index < hidden_layers.length && hidden_layers[index].function != null) {
                    const function_index = Object.values(Functions).indexOf(hidden_layers[index].function)
                    const new_function_index = (function_index + 1) % Object.values(Functions).length

                    hidden_layers[index].function = Object.values(Functions)[new_function_index]

                }

                return hidden_layers
            })
        },
        move_up_layer: (index: number) => {
            update(hidden_layers => {
                if (index > 0) {
                    const layer_up = hidden_layers[index - 1]
                    const layer_up_copy = <HiddenLayerCaracteristicsModel>{
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
                    const layer_down_copy = <HiddenLayerCaracteristicsModel>{
                        size: layer_down.size,
                        function: layer_down.function
                    }

                    hidden_layers[index + 1] = hidden_layers[index]
                    hidden_layers[index] = layer_down_copy

                }
                return hidden_layers
            })
        }
    };
}

const hidden_layer_caracteristic_store = create_hidden_layer_caracteristic_store();

export default hidden_layer_caracteristic_store;