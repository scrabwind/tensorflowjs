import { Car, CarData } from './getData.d'

async function getData(): Promise<CarData[]> {
  const carsDataResponse: Response = await fetch(
    'https://storage.googleapis.com/tfjs-tutorials/carsData.json'
  )
  const carsData = await carsDataResponse.json()
  const cleaned: CarData[] = carsData
    .map((car: Car) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car: CarData) => car.mpg != null && car.horsepower != null)

  return cleaned
}

export default getData
