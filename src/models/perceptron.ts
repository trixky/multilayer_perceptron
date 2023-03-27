export default interface Perceptron {
    bias: number,
    weights: Array<number>
    output: number,
    error: number,
}