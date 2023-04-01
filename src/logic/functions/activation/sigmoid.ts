import type FunctionBundleModel from "../../../models/function_bundle";

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

const max_start_learning_rate_recommendation = 1
const max_final_learning_rate_recommendation = 0.3

const description = `One advantage of sigmoid over some other activation functions such as ReLU or Leaky ReLU is that it produces an output that is bounded between 0 and 1, which can be useful in certain types of problems.

One benefit of the sigmoid activation function is that it can be helpful in problems where the output needs to be in a specific range, such as binary classification problems where the output needs to be either 0 or 1. Sigmoid can also be useful in problems where the output needs to be interpreted as a probability.

However, there are some potential drawbacks to using the sigmoid activation function. One issue is that the output of the sigmoid function saturates for large positive or negative values of x, which can cause gradients to become very small during backpropagation, leading to slow learning and potentially causing the model to get stuck in a local minimum. Additionally, the output of the sigmoid function is not centered around zero, which can make it difficult to train deep neural networks.

It is recommended to use a learning rate that starts below ${max_start_learning_rate_recommendation.toString()} and ends below ${max_final_learning_rate_recommendation.toString()}.`

export default <FunctionBundleModel>{
    id: "sigmoid",
    label: "sigmoid",
    description,
    recommendation: {
        max_learning_rate: {
            start: max_start_learning_rate_recommendation,
            final: max_final_learning_rate_recommendation
        },
    },
    activation: sigmoid,
    derivative: sigmoid_derivate,
}