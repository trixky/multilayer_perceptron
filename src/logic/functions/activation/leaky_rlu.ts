import type FunctionBundleModel from "../../../models/function_bundle";

import Config from "../../../config"

// leaky_rectified_linear_unit implements the leaky rectified linear unit activation function
export function leaky_rectified_linear_unit(z: number, alpha: number = Config.inputs.dataset.slope.default) {
    // Sources:
    // https://paperswithcode.com/method/leaky-relu
    // https://ml-cheatsheet.readthedocs.io/en/latest/activation_functions.html

    return z >= 0 ? z : alpha * z;
}

// leaky_rectified_linear_unit_derivate implements the derivative of the leaky rectified linear unit activation function
export function leaky_rectified_linear_unit_derivate(z: number, alpha: number = Config.inputs.dataset.slope.default): number {
    // Sources:
    // https://stats.stackexchange.com/questions/275521/what-is-the-derivative-of-leaky-relu

    return z >= 0 ? 1 : alpha;
}

const description = `One advantage of Leaky ReLU over the standard Rectified Linear Unit (ReLU) activation function is that it addresses the "dying ReLU" problem, which can occur when the gradient of the ReLU function becomes zero, causing neurons to stop learning.

One benefit of the Leaky ReLU activation function is that it allows for the learning of negative values, which can be important in certain types of problems. It also addresses the "dying ReLU" problem by introducing a small non-zero slope for negative values, which allows the neuron to continue learning even when the input is negative.`

export default <FunctionBundleModel>{
    id: "leaky_rectified_linear_unit",
    label: "leaky-rlu",
    description,
    activation: leaky_rectified_linear_unit,
    derivative: leaky_rectified_linear_unit_derivate,
}