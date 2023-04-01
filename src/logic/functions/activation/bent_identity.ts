import type FunctionBundleModel from "../../../models/function_bundle";

// bent_identity implements the bent identity activation function
export function bent_identity(z: number) {
    return ((Math.sqrt(z * z + 1) - 1) / 2) + z;
}

// bent_identity_derivate implements the derivative of the bent identity activation function
export function bent_identity_derivate(z: number): number {
    return (z / (2 * Math.sqrt(z * z + 1))) + 1;
}

const max_start_learning_rate_recommendation = 0.3
const max_final_learning_rate_recommendation = 0.1

const description = `The advantage of the "Bent Identity" activation function is that it allows for both non-linear activation and partial linearity. This means that it enables the model to learn complex relationships between inputs and outputs while retaining some linearity that can be beneficial in certain cases.

Furthermore, the "Bent Identity" activation function has an interesting property called "resilience to perturbations". This means that it is relatively insensitive to random perturbations in the inputs, which can help reduce overfitting and improve the model's generalization ability.

It is recommended to use a learning rate that starts below ${max_start_learning_rate_recommendation.toString()} and ends below ${max_final_learning_rate_recommendation.toString()}.`

export default <FunctionBundleModel>{
    id: "bent_identity",
    label: "bent identity",
    description,
    recommendation: {
        max_learning_rate: {
            start: max_start_learning_rate_recommendation,
            final: max_final_learning_rate_recommendation
        },
        
    },
    activation: bent_identity,
    derivative: bent_identity_derivate,
}

// Sources:
// https://www.gabormelli.com/RKB/Bent_Identity_Activation_Function#:~:text=A%20Bent%20Identity%20Activation%20Function,activation%20of%20Bent%20Identity%20Neurons.