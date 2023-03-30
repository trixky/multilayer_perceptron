import type { Layer as LayerModel } from "./layer";
import type WeightModel from './weight'

export default interface ModelBackup {
    hidden_layers: Array<LayerModel>,
    output_layer: LayerModel,
    learned_weights: Array<WeightModel>
}
