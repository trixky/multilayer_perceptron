// softmax is the softmax mathematical function implementation
export function softmax(x: number[]): number[] {
    // https://www.youtube.com/watch?v=KpKog-L9veg&t=505s&ab_channel=StatQuestwithJoshStarmer
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/

    // Calculate the exponential of each element in the input array
    const exps = x.map(Math.exp);

    // Calculate the sum of all the exponential values
    const sumExps = exps.reduce((acc, curr) => acc + curr, 0);

    // Divide each exponential value by the sum to obtain a probability distribution
    return exps.map((exp) => exp / sumExps);
}

// https://www.youtube.com/watch?v=M59JElEPgIg&ab_channel=StatQuestwithJoshStarmer
// https://stackoverflow.com/questions/33541930/how-to-implement-the-softmax-derivative-independently-from-any-loss-function
// https://www.youtube.com/watch?v=09c7bkxpv9I&ab_channel=MLDawn
// https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbUZpb2NJZ1R2Um51TWhNaVFGdTByQ2g3NHVrUXxBQ3Jtc0trQUNqYjA4a0JtVWxtc1NobkQyckx0NUw0RkxpYVJoejN4a3VabWI1dmZsVkdwU0ItYVJlQ190ZUNuZEdKMkdQZ2FvNmJGR05ZYmhFZXNrX0Fnc3Q3SDNGUTM2dVZoQjluQTNxZjNjLXVsNjRZZjBxdw&q=https%3A%2F%2Fwww.mldawn.com%2Fback-propagation-with-cross-entropy-and-softmax%2F&v=znqbtL0fRA0

export function derivated_softmax(x: number[]): number[] {
    // https://www.youtube.com/watch?v=KpKog-L9veg&t=505s&ab_channel=StatQuestwithJoshStarmer
    // https://www.mldawn.com/the-derivative-of-softmaxz-function-w-r-t-z/

    // Calculate the exponential of each element in the input array
    const exps = x.map(Math.exp);

    // Calculate the sum of all the exponential values
    const sumExps = exps.reduce((acc, curr) => acc + curr, 0);

    // Divide each exponential value by the sum to obtain a probability distribution
    return exps.map((exp) => exp / sumExps);
}