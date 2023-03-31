import type FunctionModel from "../../../models/function";

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

export const hyperbolic_tangent_bundle = <FunctionModel>{
    id: "hyperbolic_tangent",
    label: "hyperbolic",
    priority_luck: 3,
    activation: hyperbolic_tangent,
    derivative: hyperbolic_tangent_derivate,
}