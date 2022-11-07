import { json } from "@blockless/sdk"
import { HttpClient, HttpClientOptions } from "../../utils/http"
import RedisStorage from "../../utils/redisStorage"
import { BaseSource, SpotPriceData, TwapData } from "./base"

export class CarbonCreditExchangeSource extends BaseSource {
  private market: string
  private httpClient: HttpClient
  private redisClient: RedisStorage

  /**
   * 
   * @param source 
   * @param market 
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
   * Fetches the mean price
   * 
   * @returns 
   */
  fetchPrice(): f64 {
    let value: f64 = 0.0

    return <f64>value
  }

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

  fetchTwapData(): TwapData {
    let twapData = new TwapData()

    const twapResponse = this.redisClient.get(this.id + '_twap')
    if (twapResponse) twapData.setData(twapResponse)

    return twapData
  }

  saveTwapData(twapData: TwapData): boolean {
    this.redisClient.set(this.id + '_twap', twapData.toString())
    return true
  }

  /**
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
    twapData.priceMean = priceAverage
    this.saveTwapData(twapData)
  }
}