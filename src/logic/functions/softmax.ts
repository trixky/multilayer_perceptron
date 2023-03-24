// softmax is the softmax mathematical function implementation
export default function softmax(x: number[]): number[] {
    // https://www.youtube.com/watch?v=KpKog-L9veg&t=505s&ab_channel=StatQuestwithJoshStarmer

    // Calculate the exponential of each element in the input array
    const exps = x.map(Math.exp);

    // Calculate the sum of all the exponential values
    const sumExps = exps.reduce((acc, curr) => acc + curr, 0);

    // Divide each exponential value by the sum to obtain a probability distribution
    return exps.map((exp) => exp / sumExps);
}