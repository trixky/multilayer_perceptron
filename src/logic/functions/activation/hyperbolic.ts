import type FunctionBundleModel from "../../../models/function_bundle";

// hyperbolic_tangent implements the hyperbolic tangent activation function
export function hyperbolic_tangent(z: number) {
    
    return  Math.tanh(z);
}

// hyperbolic_tangent_derivate implements the derivative of the hyperbolic tangent activation function
export function hyperbolic_tangent_derivate(z: number): number {
    // Sources:
    // f'(x) = 1 - tanh^2(x)
    // https://socratic.org/questions/what-is-the-derivative-of-tanh-x

    const tanhX = Math.tanh(z);

    return 1 - tanhX * tanhX;
}

const description = `One advantage of tanh over some other activation functions such as the step function is that it produces a smooth non-linear output that ranges between -1 and 1.

One benefit of the tanh activation function is that it can be helpful in dealing with inputs that have negative values, as it maps negative values to negative outputs and positive values to positive outputs. Additionally, tanh can help reduce the impact of outliers in the data by compressing large values into a smaller range.

It is also worth noting that the tanh function can suffer from the vanishing gradient problem, which can make it difficult to train deep neural networks.`

export default <FunctionBundleModel>{
    id: "hyperbolic_tangent",
    label: "hyperbolic",
    description,
    activation: hyperbolic_tangent,
    derivative: hyperbolic_tangent_derivate,
}