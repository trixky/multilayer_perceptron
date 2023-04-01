import type FunctionBundleModel from "../../../models/function_bundle";

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

const description = `The Swish function is a relatively new activation function that has gained popularity in recent years.

One advantage of Swish over other activation functions is that it is differentiable everywhere, which can be helpful for gradient-based optimization algorithms used in training neural networks. It has been shown to achieve higher accuracy in certain types of problems compared to ReLU or sigmoid activation functions.

Swish also has a smoothness property that can be beneficial in some types of optimization algorithms. It is also similar in shape to the ReLU function, which means that it can be used as a drop-in replacement for ReLU in many cases.

However, it is important to note that Swish can be computationally more expensive than other activation functions, such as ReLU or Leaky ReLU. It may also not be suitable for problems where a bounded output is necessary, such as in binary classification problems.`

export default <FunctionBundleModel>{
    id: "swish",
    label: "swish",
    description,
    activation: swish,
    derivative: swish_derivate,
}