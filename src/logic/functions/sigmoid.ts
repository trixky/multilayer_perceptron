
// sigmoid is the sigmoid mathematical function implementation
export function sigmoid(z: number) {
    // Set the constant k to 2
    const k = 2;

    // Calculate and return the sigmoid of z using the formula 1 / (1 + e^(-z/k))
    return 1 / (1 + Math.exp(-z / k));
}

// sigmoid_derivate compute the derivate of the sigmoid for the hidden layers
export function sigmoid_derivate(output: number): number {
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/
    // https://machinelearningmastery.com/implement-backpropagation-algorithm-scratch-python/

    return output * (1 - output)
}
