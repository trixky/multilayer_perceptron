import type FunctionModel from "../../../models/function";

// bent_identity implements the bent identity activation function
export function bent_identity(z: number) {
    return ((Math.sqrt(z * z + 1) - 1) / 2) + z;
}

// bent_identity_derivate implements the derivative of the bent identity activation function
export function bent_identity_derivate(z: number): number {
    return (z / (2 * Math.sqrt(z * z + 1))) + 1;
}

export const bent_identity_bundle = <FunctionModel>{
    id: "bent_identity",
    label: "bent identity",
    priority_luck: 10,
    activation: bent_identity,
    derivative: bent_identity_derivate,
}

// Sources:
// https://www.gabormelli.com/RKB/Bent_Identity_Activation_Function#:~:text=A%20Bent%20Identity%20Activation%20Function,activation%20of%20Bent%20Identity%20Neurons.