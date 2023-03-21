import { Functions } from "./models/hidden_layer"

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