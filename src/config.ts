import { Functions } from "./models/hidden_layer"

export default {
    inputs: {
        hidden_layer: {
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
        }
    }
}