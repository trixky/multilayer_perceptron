// derivate_softmax_bce compute the derivate of an ouput for the output layer according to its expected result
export function derivate_softmax_bce(output: number, expected: number): number {
    // https://www.mldawn.com/back-propagation-with-cross-entropy-and-softmax/
    return output - expected
}

// derivate_sigmoid compute the derivate of the sigmoid for the hidden layers
export function derivate_sigmoid(output: number): number {
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/
    // https://machinelearningmastery.com/implement-backpropagation-algorithm-scratch-python/

    return output * (1 - output)
}
