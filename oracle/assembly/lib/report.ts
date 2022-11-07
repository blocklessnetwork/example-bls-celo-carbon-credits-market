import Env from "../utils/env"
import { json } from "@blockless/sdk"
import { HttpClient, HttpClientOptions } from "../utils/http"
import RedisStorage from "../utils/redisStorage"

/**
 * Fetch average price for multiple sources, based on their recorded twap prices.
 * 
 * @returns 
 */
const fetchAverage = (): f64 => {
  const storageClient = new RedisStorage()

  const sources = ['cc_california', 'cc_california_2']
  const prices = new json.JSON.Arr()

  let price = 0.0

  for (let s = 0; s < sources.length; s++) {
    const source = sources[s]
    const sourceData = storageClient.get(source + '_twap')
    const sourceJson = <json.JSON.Obj>json.JSON.parse(sourceData)

    if (sourceJson.has('priceMean') && sourceJson.getFloat('priceMean')!._num > 0) {
      prices.push(sourceJson.getFloat('priceMean')!)
      price = price + sourceJson.getFloat('priceMean')!._num
    }
  }


  price = price / prices._arr.length

  return price
}

/**
 * Report the average price through an Open Zepplen Relay Task (Gasless Transaction).
 */
const reportAverage = (price: f64): void => {
  const httpClientHeaders = new Map<string, string>()
  const httpClientOptions = new HttpClientOptions(
    Env.REPORT_TASK_ENDPOINT,
    httpClientHeaders
  )

  const httpClient = new HttpClient(httpClientOptions)

  if (httpClient) {
    let body = new json.JSON.Obj()
    body.set('price', price)

    httpClient.post('/', body.toString())
  }
}

/**
 * Executes the fecth and report functions in sequence
 */
const runReport = (): void => {
  const price = fetchAverage()
  reportAverage(price)

  process.stdout.write('success')
}

export default runReport