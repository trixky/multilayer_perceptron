import Config from '../../config'

// log_clip avoid the log(0) error with the clipping method
function log_clip(x: number) {
    // https://scikit-learn.org/stable/modules/generated/sklearn.metrics.log_loss.html

    return x != 0 ? Math.log(x) : Math.log(Config.math.log.clip)
}

// cross_entropy_cost is the cross entropy cost mathematical function implementation
export function cross_entropy_cost(result: number[], expected: number[]): number[] {
    // https://www.youtube.com/watch?v=Md4b67HvmRo&t=614s&ab_channel=DigitalSreeni

    const costs = [];

    for (let i = 0; i < result.length; i++) {
        // For each result

        // Compute its cost and save it
        costs.push(-(result[i] * log_clip(expected[i]) + (1 - result[i]) * log_clip(1 - expected[i])))
    }

    return costs;
}