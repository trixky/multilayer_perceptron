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

// Sources:
// https://www.youtube.com/watch?v=M59JElEPgIg&ab_channel=StatQuestwithJoshStarmer
// https://stackoverflow.com/questions/33541930/how-to-implement-the-softmax-derivative-independently-from-any-loss-function
// https://www.youtube.com/watch?v=09c7bkxpv9I&ab_channel=MLDawn