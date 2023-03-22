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
        },
        randomize: () => {
            const random_hidden_layers: Array<HiddenLayerCaracteristicsModel> = []

            // Find a random layer number
            let random_hidden_layer_nbr = Math.ceil(Math.random() * (Config.inputs.hidden_layers.number.max - Config.inputs.hidden_layers.number.min)) + Config.inputs.hidden_layers.number.min;

            // random layer number clamper
            if (random_hidden_layer_nbr > Config.inputs.hidden_layers.number.random.clamper.threshold && Math.floor(Math.random() * Config.inputs.hidden_layers.number.random.clamper.luck) != 0) {
                random_hidden_layer_nbr -= Config.inputs.hidden_layers.number.random.clamper.cut
            }

            for (let i = 0; i < random_hidden_layer_nbr; i++) {
                // Find a random function
                const random_function = Object.values(Functions)[(Math.floor(Math.random() * Object.keys(Functions).length))];

                // Find a random layer size
                let random_size = Math.ceil(Math.random() * (Config.inputs.hidden_layers.size.max - Config.inputs.hidden_layers.size.min)) + Config.inputs.hidden_layers.size.min;

                // random layer size clamper
                if (random_size > Config.inputs.hidden_layers.size.random.clamper.threshold && Math.floor(Math.random() * Config.inputs.hidden_layers.size.random.clamper.luck) != 0) {
                    random_size -= Config.inputs.hidden_layers.size.random.clamper.cut
                }

                random_hidden_layers.push(<HiddenLayerCaracteristicsModel>{
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