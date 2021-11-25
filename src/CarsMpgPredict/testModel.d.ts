import type { Rank, Tensor } from '@tensorflow/tfjs'

type normalizedData = {
  inputMax,inputMin, labelMax,labelMin : Tensor<Rank>
}
export type { normalizedData }