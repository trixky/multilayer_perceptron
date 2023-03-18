export default interface Patient {
    id: string,
    diagnosis: boolean, // malignant (M) : true / benign (B) : false
    inputs: Array<number> // real-valued input features
}