import { writable } from 'svelte/store';
import type { Layer as LayerModel } from '../models/layer';
import type ModelModel from '../models/model';
import type PerceptronModel from '../models/perceptron';
import type { LayerCaracteristics as LayerCaracteristicsModel } from '../models/layer';
import Config from '../config'

function new_blank_model(): ModelModel {
    return <ModelModel>{
        layers: [],
    }
}

function create_model_store() {
    const { subscribe, update, set } = writable(new_blank_model());

    return {
        subscribe,
        initialize: (hidden_layer_caracteristics: Array<LayerCaracteristicsModel>, output_layer: LayerCaracteristicsModel) => {
            const model = new_blank_model()

            hidden_layer_caracteristics.forEach((hidden_layer_caracteristic, index) => {
                const layer = <LayerModel>{
                    caracteristics: hidden_layer_caracteristic,
                    perceptrons: Array(hidden_layer_caracteristic.size).fill(null).map(_ => <PerceptronModel>{
                            bias: 0,
                            weights: Array(index == 0 ? Config.inputs.input_layer.size.default : hidden_layer_caracteristics[index - 1].size).fill(null).map(_ => 0)
                        }
                    )
                }

                model.layers.push(layer)
            })

            model.layers.push(<LayerModel>{
                caracteristics: output_layer,
                perceptrons: Array(Config.inputs.output_layer.size.default).fill(null).map(_ => <PerceptronModel>{
                    bias: 0,
                    weights: Array(hidden_layer_caracteristics[hidden_layer_caracteristics.length - 1].size).fill(null).map(_ => 0)
                })
            })

            set(model)
        },
        randomize: () => {
            update(model => {
                model.layers = model.layers.map(layer => <LayerModel>{
                    perceptrons: layer.perceptrons.map(perceptron => <PerceptronModel>{
                        bias: Config.module.random.bias.max - Math.random() * Math.abs(Config.module.random.bias.min - Config.module.random.bias.max),
                        weights: perceptron.weights.map(_ => Config.module.random.weight.max - Math.random() * Math.abs(Config.module.random.weight.min - Config.module.random.weight.max))
                    })
                })

                return model
            })
        }
    };
}

const model_store = create_model_store();

export default model_store;