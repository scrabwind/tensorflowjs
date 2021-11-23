import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

const trainModel = async (
  model: tf.Sequential,
  inputs: tf.Tensor<tf.Rank>,
  labels: tf.Tensor<tf.Rank>,
  width: number = parseInt(process.env.WIDTH ?? '0'),
  height: number = parseInt(process.env.HEIGHT ?? '0')
) => {
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  })

  const batchSize = 32
  const epochs = 50
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'],
      { width: width, height: height, callbacks: ['onEpochEnd'] }
    ),
  })
}

export default trainModel
