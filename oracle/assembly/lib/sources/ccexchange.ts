import { json } from "@blockless/sdk"
import { HttpClient, HttpClientOptions } from "../../utils/http"
import RedisStorage from "../../utils/redisStorage"
import { BaseSource, SpotPriceData, TwapData } from "./base"

export class CarbonCreditExchangeSource extends BaseSource {
  private market: string
  private httpClient: HttpClient
  private redisClient: RedisStorage

  /**
   * Construct the exchange source class
   * 
   * @param id unique identifier of the exchange source
   * @param source json api source
   * @param market target object to parse from the returning json
   */
  constructor(id: string, source: string, market: string) {
    super(id, 'Carbon Credits ' + market + ' / USD | CarbonCreditExchange')

    const httpClientHeaders = new Map<string, string>()
    const httpClientOptions = new HttpClientOptions(
      source,
      httpClientHeaders
    )

    this.market = market
    this.httpClient = new HttpClient(httpClientOptions)
    this.redisClient = new RedisStorage()
  }

  /**
   * Fetches the mean price from twap data storage
   * 
   * @returns the mean price of the exchange
   */
  fetchPrice(): f64 {
    let value: f64 = 0.0

    const storageClient = new RedisStorage()
    const sourceData = storageClient.get(this.id + '_twap')
    const sourceJson = <json.JSON.Obj>json.JSON.parse(sourceData)

    if (sourceJson.has('priceMean') && sourceJson.getFloat('priceMean')!._num > 0) {
      value = sourceJson.getFloat('priceMean')!._num
    }

    return <f64>value
  }

  /**
   * Fetches the spot price from the remote source
   * 
   * @returns spot price and timestamp 
   */
  fetchSpotPrice(): SpotPriceData {
    let spotPriceData = new SpotPriceData()

    if (this.httpClient) {
      const response = this.httpClient.get('/')

      if (response.has('markets')) {
        const markets = response.getObj('markets')!

        if (markets.has(this.market)) {
          spotPriceData.setData(
            <i64>response.getInteger('lastUpdated')!._num,
            <f64>markets.getObj(this.market)!.getFloat('last')!._num
          )
        }
      }
    }

    return spotPriceData
  }

  /**
   * Fetch twap data from the database
   * 
   * @returns twap data object
   */
  fetchTwapData(): TwapData {
    let twapData = new TwapData()

    const twapResponse = this.redisClient.get(this.id + '_twap')
    if (twapResponse) twapData.setData(twapResponse)

    return twapData
  }

  /**
   * Saves twap data to the database
   * 
   * @param twapData twap data object
   * @returns success state for the data storage
   */
  saveTwapData(twapData: TwapData): boolean {
    this.redisClient.set(this.id + '_twap', twapData.toString())
    return true
  }

  /**
   * Execute a twap calculation on all recorded spot price data
   * 
   * @returns 
   */
  aggregateTwapData(): void {
    const spotPrice = this.fetchSpotPrice()
    const twapData = this.fetchTwapData()
    twapData.insertSpotPrice(spotPrice.ts, spotPrice.priceLast)

    let priceCumulative: f64 = 0.0
    let tsLast: i64 = 0
    let tsLatest: i64 = spotPrice.ts
    let tsElapsed: i64 = 0

    const pricesArray = twapData.prices._arr
    for (let i = 1; i < pricesArray.length; i++) {
      const price = <json.JSON.Obj>pricesArray[i]
      const priceLast = <json.JSON.Obj>pricesArray[i - 1]

      const priceTs = price.getInteger('ts')!._num
      const priceLastTs = priceLast.getInteger('ts')!._num
      const priceLastValue = <f64>priceLast.getFloat('value')!._num

      priceCumulative += priceLastValue * <f64>(priceTs - priceLastTs)
      if (i === 1) tsLast = priceLastTs
    }

    // Calc
    tsElapsed = tsLatest - tsLast
    const priceAverage = (priceCumulative / <f64>tsElapsed) || 0

    // Save New TWAP Data
    twapData.priceMean = priceAverage || spotPrice.priceLast
    this.saveTwapData(twapData)
  }
}