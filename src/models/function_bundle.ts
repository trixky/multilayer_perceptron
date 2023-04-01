export default interface Function {
    id: string,
    label: string,
    description: string,
    activation: ((z: number) => number) | ((z: number, option: number) => number),
    derivative: ((z: number) => number) | ((z: number, option: number) => number),
}