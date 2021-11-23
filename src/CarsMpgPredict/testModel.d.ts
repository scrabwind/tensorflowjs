import type { Rank, Tensor } from '@tensorflow/tfjs'

type normalizedData = {
  inputMax: Tensor<Rank>
  inputMin: Tensor<Rank>
  labelMax: Tensor<Rank>
  labelMin: Tensor<Rank>
}
export type { normalizedData }
