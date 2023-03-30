import { Functions } from "./models/layer"

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
                        cut: 2
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
                default: 50,
                min: 10,
                max: 90,
                step: 1,
            }
        },
        learning_rate: {
            start: {
                default: 0.7,
                min: 0.3,
                max: 5,
                step: 0.1,
            },
            end: {
                default: 0.5,
                min: 0.1,
                max: 5,
                step: 0.1,
            }
        },
        epochs: {
            default: 1000, // default for 16x16
            min: 100,
            max: 3000,
            step: 100,
        }
    },
    visuals: {
        labels: {
            valid: {
                malignant: 'TP', // true positive
                benign: 'TN' // true negative
            },
            invalid: {
                malignant: 'FP', // true positive
                benign: 'FN' // true negative
            },
        },
        colors: {
            global_accuracy: {
                default: 'black',
                background: 'white'
            },
            diagnosis: {
                valid: {
                    malignant: 'rgb(153, 204, 255)',
                    benign: 'rgb(153, 255, 153)'
                },
                invalid: {
                    malignant: 'rgb(255, 153, 153)',
                    benign: 'rgb(255, 204, 153)'
                },
            },
            default: "#eee"
        },
        layers: {
            dimensions: {
                width: 400,
                height: 500
            },
            line_width: 0.3,
        },
    },
    module: {
        random: {
            bias: {
                min: -1,
                max: 1,
            },
            weight: {
                min: -1,
                max: 1,
            }
        }
    },
    math: {
        log: {
            clip: 1e-15
        }
    },
    backup: {
        file: {
            name: "backup",
            extension: ".model.json"
        }
    }
}