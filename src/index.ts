import dotenv from 'dotenv'
import * as tfvis from '@tensorflow/tfjs-vis'

import getData from './CarsMpgPredict/getData'
import runScatterPlot from './CarsMpgPredict/runScatterPlot'
import createModel from './CarsMpgPredict/createModel'
import convertToTensor from './CarsMpgPredict/convertToTensor'
import trainModel from './CarsMpgPredict/trainModel'
import testModel from './CarsMpgPredict/testModel'

dotenv.config()
async function run(): Promise<void> {
  tfvis.visor().toggleFullScreen()
  const data = await getData()
  await runScatterPlot({
    xLabel: 'Horsepower',
    yLabel: 'MPG',
    width: parseInt(process.env.WIDTH ?? '0'),
    height: parseInt(process.env.HEIGHT ?? '0'),
    data: data,
  })

  const model = createModel()
  tfvis.show.modelSummary({ name: 'Model Summary' }, model)

  const tensorData = convertToTensor(data)

  const { inputs, labels, normalizedData } = tensorData

  await trainModel(model, inputs, labels, 1000, 400)
  testModel(model, data, normalizedData)
}
run()
