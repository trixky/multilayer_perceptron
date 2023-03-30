import type { Layer as LayerModel } from "./layer";
import type WeightModel from './weight'
import type { LayerCaracteristics as LayerCaracteristicsModel } from './layer';

export default interface ModelBackup {
    hidden_layer_caracteristics: Array<LayerCaracteristicsModel>,
    output_layer_caracteristics: LayerCaracteristicsModel,
    hidden_layers: Array<LayerModel>,
    output_layer: LayerModel,
    learned_weights: Array<WeightModel>
}
