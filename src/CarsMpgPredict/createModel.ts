import * as tf from '@tensorflow/tfjs'

const createModel = () => {
  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }))
  model.add(tf.layers.dense({ units: 1, useBias: true }))
  return model
}

export default createModel
