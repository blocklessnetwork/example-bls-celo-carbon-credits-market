import { json } from "@blockless/sdk"

export class TwapData {
  public ts: i64
  public priceMean: f64
  public prices: json.JSON.Arr
  public isValid: boolean = false

  constructor() {
    this.ts = 0
    this.priceMean = 0.0
    this.prices = new json.JSON.Arr()
  }

  setData(dataStr: string): void {
    if (dataStr && dataStr !== '') {
      const parsedTwapData = <json.JSON.Obj>json.JSON.parse(dataStr)

      this.ts = <i64>parsedTwapData.getInteger('ts')!._num
      this.priceMean = <f64>parsedTwapData.getFloat('priceMean')!._num
      this.prices = parsedTwapData.getArr('prices')!
    }
  }

  insertSpotPrice(ts: i64, priceLast: f64): void {
    const priceObj = new json.JSON.Obj()
    priceObj.set('ts', ts)
    priceObj.set('value', priceLast)
    this.prices.push(priceObj)
    this.ts = ts
  }

  toString(): string {
    const data = new json.JSON.Obj()
    data.set('ts', this.ts)
    data.set('priceMean', this.priceMean)
    data.set('prices', this.prices)

    return data.toString()
  }
}

export class SpotPriceData {
  public ts: i64
  public priceLast: f64

  constructor() {
    this.ts = 0
    this.priceLast = 0.0
  }

  setData(ts: i64, priceLast: f64): void {
    this.ts = ts
    this.priceLast = priceLast
  }

  toString(): string {
    return ''
  }
}

export abstract class BaseSource {
  protected id: string
  protected description: string

  constructor(id: string, description: string) {
    this.id = id
    this.description = description
  }

  abstract fetchPrice(): f32

  abstract fetchSpotPrice(): SpotPriceData

  abstract fetchTwapData(): TwapData

  abstract saveTwapData(twapData: TwapData): boolean

  abstract aggregateTwapData(): void
}