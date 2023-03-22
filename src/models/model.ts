import type {Layer as LayerModel} from "./layer"

export default interface Model {
    layers: Array<LayerModel>
}