import type FunctionModel from "../../../models/function";

import Config from '../../../config'
import { sigmoid } from './sigmoid'

// swish implements the swish activation function
export function swish(z: number, beta: number = Config.inputs.dataset.scaling_factor.default) {
    // Sources:
    // https://en.wikipedia.org/wiki/Swish_function

    return z * sigmoid(beta * z);
}

// swish_derivate implements the derivative of the swish activation function
export function swish_derivate(z: number, beta: number = Config.inputs.dataset.scaling_factor.default): number {
    const y = swish(z, beta);

    return y + beta * y * (1 - y);
}

export default <FunctionModel>{
    id: "swish",
    label: "swish",
    priority_luck: 3,
    activation: swish,
    derivative: swish_derivate,
}