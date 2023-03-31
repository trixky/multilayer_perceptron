import type FunctionModel from "../../../models/function";
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

export default <FunctionModel>{
    id: "exponential_linear_unit",
    label: "elu",
    priority_luck: 3,
    activation: exponential_linear_unit,
    derivative: exponential_linear_unit_derivate,
}