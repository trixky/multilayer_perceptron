import type FunctionModel from "../../../models/function";

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

export const leaky_rectified_linear_unit_bundle = <FunctionModel>{
    id: "leaky_rectified_linear_unit",
    label: "leaky-rlu",
    priority_luck: 3,
    activation: leaky_rectified_linear_unit,
    derivative: leaky_rectified_linear_unit_derivate,
}