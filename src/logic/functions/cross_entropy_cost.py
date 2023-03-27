# https://lindevs.com/calculate-binary-cross-entropy-using-tensorflow-2

from tensorflow import keras

# yActual = [1, 0, 0, 1]
# yPredicted = [0.8, 0.2, 0.6, 0.9]

yActual = [1, 0]
yPredicted = [0.6, 0.4]

bceObject = keras.losses.BinaryCrossentropy()
# bceTensor = bceObject(yActual, yPredicted)
# bce = bceTensor.numpy()
bceTensor = keras.losses.binary_crossentropy(yActual, yPredicted)
bce = bceTensor.numpy()

print(bce)





# Backpropagate error and store in neurons
def backward_propagate_error(network, expected):
    for i in reversed(range(len(network))):
        layer = network[i]
        errors = list()
        if i != len(network)-1:
            # if layer is not the ouput
            for j in range(len(layer)):
                # for each neuron
                error = 0.0
                for neuron in network[i + 1]:
                    error += (neuron['weights'][j] * neuron['delta'])
                # its error = all next weight * all next error
            errors.append(error)
        else:
            for j in range(len(layer)):
                neuron = layer[j]
                errors.append(neuron['output'] - expected[j])
                for j in range(len(layer)):
                    neuron = layer[j]
                    neuron['delta'] = errors[j] * transfer_derivative(neuron['output'])


# Update network weights with error
def update_weights(network, row, l_rate):
    for i in range(len(network)):
        inputs = row[:-1]
        if i != 0:
            inputs = [neuron['output'] for neuron in network[i - 1]]
            for neuron in network[i]:
                for j in range(len(inputs)):
                    neuron['weights'][j] -= l_rate * neuron['delta'] * inputs[j]
                    neuron['weights'][-1] -= l_rate * neuron['delta'] # bias