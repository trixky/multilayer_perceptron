import Config from '../../config'

// log_clip avoid the log(0) error with the clipping method
function log_clip(x: number) {
    // https://scikit-learn.org/stable/modules/generated/sklearn.metrics.log_loss.html

    return x != 0 ? Math.log(x) : Math.log(Config.math.log.clip)
}

// cross_entropy_cost is the cross entropy cost mathematical function implementation
export function cross_entropy_cost(result: number[], expected: boolean[]): number[] {
    // https://www.youtube.com/watch?v=Md4b67HvmRo&t=614s&ab_channel=DigitalSreeni
    // https://towardsdatascience.com/understanding-binary-cross-entropy-log-loss-a-visual-explanation-a3ac6025181a

    return result.map((result, result_index) => {
        return -(expected[result_index] ? Math.log(result) : Math.log(1 - result))
    });
}

// total_cross_entropy_cost use the cross_entropy_cost function to compute the total cost of a result
export function total_cross_entropy_cost(result: number[], expected: boolean[]): number {
    // Compute the mean of the result costs computed from the cross_entropy_cost function
    return cross_entropy_cost(result, expected).reduce((a, b) => a + b) / result.length
}

// ----------------------------------- test

// https://lindevs.com/calculate-binary-cross-entropy-using-tensorflow-2

// const results = [0.8, 0.2, 0.6, 0.9]
// const expected = [true, false, false, true]
// const expected_result = 0.3669845875401002

// console.log(total_cross_entropy_cost(results, expected))
