import * as tf from '@tensorflow/tfjs'

import { CarData } from './getData.d'

const convertToTensor = (data: CarData[]) => {
  return tf.tidy(() => {
    tf.util.shuffle(data)

    const inputs = data.map((d: CarData) => d.horsepower)
    const labels = data.map((d: CarData) => d.mpg)

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1])
    const labelTensor = tf.tensor2d(labels, [labels.length, 1])

    const inputMax = inputTensor.max()
    const inputMin = inputTensor.min()
    const labelMax = labelTensor.max()
    const labelMin = labelTensor.min()

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin))

    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin))
    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      normalizedData: { inputMax, inputMin, labelMax, labelMin },
    }
  })
}

export default convertToTensor
