export default interface Function {
    id: string,
    label: string,
    priority_luck: number, // 1 to 100
    activation: ((z: number) => number) | ((z: number, option: number) => number),
    derivative: ((z: number) => number) | ((z: number, option: number) => number),
}