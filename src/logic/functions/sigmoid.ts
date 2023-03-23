export default function sigmoid(z: number) {
    // Set the constant k to 2
    const k = 2;

    // Calculate and return the sigmoid of z using the formula 1 / (1 + e^(-z/k))
    return 1 / (1 + Math.exp(-z / k));
}