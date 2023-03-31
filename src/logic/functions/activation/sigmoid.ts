import type FunctionModel from "../../../models/function";

// sigmoid implements the sigmoid activation function
export function sigmoid(z: number) {
    // Set the constant k to 2
    const k = 2;

    // Calculate and return the sigmoid of z using the formula 1 / (1 + e^(-z/k))
    return 1 / (1 + Math.exp(-z / k));
}

// sigmoid_derivate implements the derivative of the sigmoid activation function
export function sigmoid_derivate(z: number): number {
    // Sources:
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/
    // https://machinelearningmastery.com/implement-backpropagation-algorithm-scratch-python/

    return z * (1 - z)
}

export default <FunctionModel>{
    id: "sigmoid",
    label: "sigmoid",
    priority_luck: 100,
    activation: sigmoid,
    derivative: sigmoid_derivate,
}