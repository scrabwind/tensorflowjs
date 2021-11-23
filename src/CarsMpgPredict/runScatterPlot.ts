import * as tfvis from '@tensorflow/tfjs-vis'
import type { CarData, ScatterData } from './getData.d'

interface ScatterPlotParams {
  xLabel?: string
  yLabel?: string
  height?: number
  width?: number
  data: CarData[]
}

const runScatterPlot = async ({
  xLabel,
  yLabel,
  width = parseInt(process.env.WIDTH ?? '0'),
  height = parseInt(process.env.HEIGHT ?? '0'),
  data,
}: ScatterPlotParams): Promise<void> => {
  const values: ScatterData[] = data.map(d => ({
    x: d.horsepower,
    y: d.mpg,
  }))
  return tfvis.render.scatterplot(
    { name: 'Horsepower v MPG' },
    { values },
    {
      xLabel,
      yLabel,
      height,
      width,
    }
  )
}

export default runScatterPlot
