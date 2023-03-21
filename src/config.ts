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
            },
            size: {
                min: 1,
                max: 60,
                default: 16
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