import type FunctionBundleModel from "../../../models/function_bundle";
import Config from '../../../config'

// exponential_linear_unit implements the exponential linear unit tangent activation function
export function exponential_linear_unit(z: number, alpha: number = Config.inputs.dataset.slope.default) {
    // Sources:
    // https://paperswithcode.com/method/elu
    // https://ml-cheatsheet.readthedocs.io/en/latest/activation_functions.html
    // https://deeplearninguniversity.com/elu-as-an-activation-function-in-neural-networks/

    return z >= 0 ? z : alpha * (Math.exp(z) - 1);
}

// exponential_linear_unit implements the derivative of the exponential linear unit tangent activation function
export function exponential_linear_unit_derivate(z: number, alpha: number = Config.inputs.dataset.slope.default): number {
    // Sources:
    // https://www.analyticsvidhya.com/blog/2021/04/activation-functions-and-their-derivatives-a-quick-complete-guide/

    return z >= 0 ? 1 : alpha * Math.exp(z);
}

const max_start_learning_rate_recommendation = 0.6
const max_final_learning_rate_recommendation = 0.1

const description = `One advantage of ELU over some other activation functions is that it reduces the vanishing gradient problem, which can occur when using activation functions such as the sigmoid or hyperbolic tangent.

One benefit of the ELU activation function is that it can produce negative values, which can help the model learn more complex and nuanced relationships between inputs and outputs. Additionally, the exponential function in ELU can help speed up the training process by encouraging the model to focus on the most informative features of the data.

It is recommended to use a learning rate that starts below ${max_start_learning_rate_recommendation.toString()} and ends below ${max_final_learning_rate_recommendation.toString()}.`


export default <FunctionBundleModel>{
    id: "exponential_linear_unit",
    label: "elu",
    description,
    recommendation: {
        max_learning_rate: {
            start: max_start_learning_rate_recommendation,
            final: max_final_learning_rate_recommendation
        },

    },
    activation: exponential_linear_unit,
    derivative: exponential_linear_unit_derivate,
}