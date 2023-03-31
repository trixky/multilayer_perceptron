import type FunctionModel from "../../../models/function";

// rectified_linear_unit implements the rectified linear unit tangent activation function
export function rectified_linear_unit(z: number) {
    // Sources:
    // https://en.wikipedia.org/wiki/Rectifier_(neural_networks)

    return Math.max(0, z);
}

// rectified_linear_unit implements the derivative of the rectified linear unit tangent activation function
export function rectified_linear_unit_derivate(z: number): number {
    // Sources:
    // https://stats.stackexchange.com/questions/333394/what-is-the-derivative-of-the-relu-activation-function

    return z > 0 ? 1 : 0;
}

// Sources:
// https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/

export const rectified_linear_unit_bundle = <FunctionModel>{
    id: "rectified linear unit",
    label: "rectified_linear_unit",
    priority_luck: 3,
    activation: rectified_linear_unit,
    derivative: rectified_linear_unit_derivate,
}