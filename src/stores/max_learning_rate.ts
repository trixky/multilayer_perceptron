import { derived } from 'svelte/store';
import HiddenLayerCaracteristicStore from './hidden_layer';

interface MaxLearningRate {
    start: number,
    final: number,
}

const max_learning_rate_store = derived(
    HiddenLayerCaracteristicStore,
    $HiddenLayerCaracteristicStore => {
        const max_learning_rates = <MaxLearningRate>{
            start:  Number.POSITIVE_INFINITY,
            final: Number.POSITIVE_INFINITY,
        }

        $HiddenLayerCaracteristicStore.forEach(hidden_layer => {
            if (hidden_layer.function.recommendation.max_learning_rate.start < max_learning_rates.start) max_learning_rates.start = hidden_layer.function.recommendation.max_learning_rate.start
            if (hidden_layer.function.recommendation.max_learning_rate.final < max_learning_rates.final) max_learning_rates.final = hidden_layer.function.recommendation.max_learning_rate.final
        })

        return max_learning_rates
    }
);

export default max_learning_rate_store
