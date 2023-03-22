import type PerceptronModel from "./perceptron"

export enum Functions {
    sigmoid = "sigmoid", // sigmoid
    hyperboloid_tangent = "hyperboloid", // hyperboloid tangent
    rectified_linear_unit = "retified-l-u", // rectified linear unit
}

export interface LayerCaracteristics {
    size: number,
    function: Functions,
}

export interface Layer {
    caracteristics: LayerCaracteristics
    perceptrons: Array<PerceptronModel>
}