import Config from '../../config'

// log_clip avoid the log(0) error with the clipping method
function log_clip(x: number) {
    // https://scikit-learn.org/stable/modules/generated/sklearn.metrics.log_loss.html

    return x != 0 ? Math.log(x) : Math.log(Config.math.log.clip)
}

// cross_entropy_cost is the cross entropy cost mathematical function implementation
export function binary_cross_entropy(outputs: number[], expected: boolean[]): number[] {
    // https://www.youtube.com/watch?v=Md4b67HvmRo&t=614s&ab_channel=DigitalSreeni
    // https://towardsdatascience.com/understanding-binary-cross-entropy-log-loss-a-visual-explanation-a3ac6025181a

    return outputs.map((output, output_index) => {
        return -(expected[output_index] ? Math.log(output) : Math.log(1 - output))
    });
}

// derivated_binary_cross_entropy_wrt_softmax_input computes the derivative of the binary cross entropy function wrt the softmax function
export function derivated_binary_cross_entropy_wrt_softmax_input(outputs: number[], expected: boolean[]): number[] {
    // https://www.mldawn.com/back-propagation-with-cross-entropy-and-softmax/

    return outputs.map((output, output_index) => {
        return output - Number(expected[output_index])
    });
}

// ----------------------------------- test

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
