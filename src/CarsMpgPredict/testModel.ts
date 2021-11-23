import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import type { normalizedData } from './testModel.d'
import type { CarData } from './getData.d'

const testModel = (
  model: tf.Sequential,
  inputData: CarData[],
  normalizationData: normalizedData,
  width: number = parseInt(process.env.WIDTH ?? '0'),
  height: number = parseInt(process.env.HEIGHT ?? '0')
) => {
  const { inputMax, inputMin, labelMax, labelMin } = normalizationData

  console.log(normalizationData)

  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100)
    const preds = model.predict(xs.reshape([100, 1]))

    const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin)

    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin)

    return [unNormXs.dataSync(), unNormPreds.dataSync()]
  })

  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val, y: preds[i] }
  })

  const originalPoints = inputData.map(d => ({
    x: d.horsepower,
    y: d.mpg,
  }))

  tfvis.render.scatterplot(
    { name: 'Model Predictions vs Original Data' },
    {
      values: [originalPoints, predictedPoints],
      series: ['original', 'predicted'],
    },
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      width: width,
      height: height,
    }
  )
}

export default testModel
