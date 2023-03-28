export default interface Accuracy {
    mean: number,
    net: {
        valid: {
            malignant: number,
            benign: number,
        },
        invalid: {
            malignant: number,
            benign: number,
        }
    }
}
