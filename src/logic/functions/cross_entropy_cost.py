# https://lindevs.com/calculate-binary-cross-entropy-using-tensorflow-2

from tensorflow import keras

yActual = [1, 0, 0, 1]
yPredicted = [0.8, 0.2, 0.6, 0.9]

bceObject = keras.losses.BinaryCrossentropy()
# bceTensor = bceObject(yActual, yPredicted)
# bce = bceTensor.numpy()
bceTensor = keras.losses.binary_crossentropy(yActual, yPredicted)
bce = bceTensor.numpy()

print(bce)
