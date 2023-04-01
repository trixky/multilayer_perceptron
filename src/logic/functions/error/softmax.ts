// softmax implements the softmax activation function
export function softmax(x: number[]): number[] {
    // Sources:
    // https://www.youtube.com/watch?v=KpKog-L9veg&t=505s&ab_channel=StatQuestwithJoshStarmer
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/

    // Calculate the exponential of each element in the input array
    const exps = x.map(Math.exp);

    // Calculate the sum of all the exponential values
    const sumExps = exps.reduce((acc, curr) => acc + curr, 0);

    // Divide each exponential value by the sum to obtain a probability distribution
    return exps.map((exp) => exp / sumExps);
}

// softmax_derivate implements the derivative of the softmax activation function
export function softmax_derivate(x: number[]): number[] {
    // Sources:
    // https://www.youtube.com/watch?v=KpKog-L9veg&t=505s&ab_channel=StatQuestwithJoshStarmer
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/

    // Calculate the exponential of each element in the input array
    const exps = x.map(Math.exp);

    // Calculate the sum of all the exponential values
    const sumExps = exps.reduce((acc, curr) => acc + curr, 0);

    // Divide each exponential value by the sum to obtain a probability distribution
    return exps.map((exp) => exp / sumExps);
}

export const description = `The softmax activation function is commonly used in the output layer of a multilayer perceptron (MLP) for classification problems.

One advantage of softmax is that it produces a probability distribution over the classes, which can be useful in multiclass classification problems. It ensures that the sum of the probabilities of all classes adds up to one, allowing the model to output the probability of each class as a confidence score.

In addition, the softmax function is differentiable, which means it can be used with gradient-based optimization algorithms used in training neural networks.

However, there are some potential drawbacks to using softmax. One issue is that it can be sensitive to outliers or extreme values, which can result in unstable or inaccurate predictions. Additionally, it assumes that each class is mutually exclusive, which means that an input can only belong to one class. If a problem involves classes that are not mutually exclusive, other techniques such as multi-label classification may be more appropriate.`

// Sources:
// https://www.youtube.com/watch?v=M59JElEPgIg&ab_channel=StatQuestwithJoshStarmer
// https://stackoverflow.com/questions/33541930/how-to-implement-the-softmax-derivative-independently-from-any-loss-function
// https://www.youtube.com/watch?v=09c7bkxpv9I&ab_channel=MLDawn