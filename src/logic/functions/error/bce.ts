// cross_entropy_cost is the cross entropy cost mathematical function implementation
export function binary_cross_entropy(outputs: number[], expected: boolean[]): number[] {
    // Sources:
    // https://www.youtube.com/watch?v=Md4b67HvmRo&t=614s&ab_channel=DigitalSreeni
    // https://towardsdatascience.com/understanding-binary-cross-entropy-log-loss-a-visual-explanation-a3ac6025181a

    return outputs.map((output, output_index) => {
        return -(expected[output_index] ? Math.log(output) : Math.log(1 - output))
    });
}

// binary_cross_entropy_wrt_softmax_input_derivate computes the derivative of the binary cross entropy function wrt the softmax function
export function binary_cross_entropy_wrt_softmax_input_derivate(outputs: number[], expected: boolean[]): number[] {
    // Sources:
    // https://www.mldawn.com/back-propagation-with-cross-entropy-and-softmax/

    return outputs.map((output, output_index) => {
        return output - Number(expected[output_index])
    });
}

// softmax_bce_derivate compute the derivate of an ouput for the output layer according to its expected result
export function softmax_bce_derivate(output: number, expected: number): number {
    // Sources:
    // https://www.mldawn.com/back-propagation-with-cross-entropy-and-softmax/

    return output - expected
}


// ----------------------------------- test

// Sources:
// https://lindevs.com/calculate-binary-cross-entropy-using-tensorflow-2

// const outputs = [0.8, 0.2, 0.6, 0.9]
// const expected = [true, false, false, true]
// const expected_output = 0.3669845875401002

// const outputs = [0.6, 0.4]
// const expected = [true, false]
// const expected_output = 0.5108254

// const outputs = [0.6, 0.4]
// const expected = [false, true]
// const expected_output = 0.916

// console.log(total_binary_cross_entropy(outputs, expected))
