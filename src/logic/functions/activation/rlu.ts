import type FunctionBundleModel from "../../../models/function_bundle";

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

const max_start_learning_rate_recommendation = 0.6
const max_final_learning_rate_recommendation = 0.1

const description = `One of the main advantages of ReLU over other activation functions is that it is computationally efficient and can be easily implemented.

One benefit of the ReLU activation function is that it is non-linear, which allows the MLP to learn complex relationships between inputs and outputs. It is also known to work well in practice and has been shown to be effective in many different types of problems.

Another benefit of ReLU is that it can help address the vanishing gradient problem, which can occur when gradients become very small during backpropagation. ReLU can prevent gradients from vanishing by keeping them at a maximum value of 1, which can help speed up the training process and improve model performance.

However, it is important to note that ReLU can suffer from the "dying ReLU" problem, where neurons can become inactive and stop learning if the input to the neuron is consistently negative. In such cases, other activation functions such as Leaky ReLU or ELU may be more appropriate. Additionally, ReLU may not be suitable for problems where negative values are important, such as in image processing tasks.

It is recommended to use a learning rate that starts below ${max_start_learning_rate_recommendation.toString()} and ends below ${max_final_learning_rate_recommendation.toString()}.`

export default <FunctionBundleModel>{
    id: "rectified_linear_unit",
    label: "rlu",
    description,
        recommendation: {
        max_learning_rate: {
            start: max_start_learning_rate_recommendation,
            final: max_final_learning_rate_recommendation
        },
    },
    activation: rectified_linear_unit,
    derivative: rectified_linear_unit_derivate,
}