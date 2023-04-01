export default interface Function {
    id: string,
    label: string,
    description: string,
    recommendation: {
        max_learning_rate: {
            start: number,
            final: number,
        },
    }
    activation: ((z: number) => number) | ((z: number, option: number) => number),
    derivative: ((z: number) => number) | ((z: number, option: number) => number),
}