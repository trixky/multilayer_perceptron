import type Perceptron from "./perceptron"

export enum Functions {
    sigmoid = "sigmoid", // sigmoid
    hyperboloid_tangent = "hyperboloid", // hyperboloid tangent
    rectified_linear_unit = "retified-l-u", // rectified linear unit
}

export interface HiddenLayerCaracteristics {
    size: number,
    function: Functions,
}

export interface HiddenLayer {
    caracteristics: HiddenLayerCaracteristics
    perceptrons: Array<Perceptron>
}