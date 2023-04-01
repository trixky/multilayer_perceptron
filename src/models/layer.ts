import type PerceptronModel from "./perceptron"
import type FunctionModel from './function_bundle'

export interface LayerCaracteristics {
    size: number,
    function: FunctionModel,
}

export interface Layer {
    caracteristics: LayerCaracteristics
    perceptrons: Array<PerceptronModel>
}