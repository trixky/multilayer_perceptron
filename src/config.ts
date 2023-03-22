import { Functions } from "./models/hidden_layer"

const DATASET_SIZE = 569

export default {
    inputs: {
        input_layer: {
            size: {
                default: 30
            }
        },
        hidden_layers: {
            number: {
                min: 2,
                max: 6,
                default: 2,
                random: {
                    clamper: {
                        luck: 4,
                        threshold: 3,
                        cut: 3
                    }
                }
            },
            size: {
                min: 2,
                max: 42,
                default: 16,
                random: {
                    clamper: {
                        luck: 7,
                        threshold: 20,
                        cut: 18
                    }
                }
            },
            function: {
                default: Object.keys(Functions)[Object.values(Functions).indexOf(Functions.sigmoid)]
            }
        },
        output_layer: {
            size: {
                default: 2
            },
            function: {
                default: Object.keys(Functions)[Object.values(Functions).indexOf(Functions.sigmoid)]
            }
        },
        dataset: {
            size: DATASET_SIZE,
            train_test_ratio: {
                default: 300,
                min: 100,
                max: DATASET_SIZE - 100,
            }
        }
    },
    visuals: {
        layers: {
            dimensions: {
                width: 400,
                height: 500
            },
            line_width: 0.3,
        }
    }
}