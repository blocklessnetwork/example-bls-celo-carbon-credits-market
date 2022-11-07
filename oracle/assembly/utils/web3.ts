import Env from "./env"
import { HttpClient, HttpClientOptions } from "./http"
import { json } from "@blockless/sdk"

export default class Web3 {
  private rpcClient: HttpClient

  /**
   * Initialize an instance of Redis Storage
   * 
   */
  constructor() {
    const rpcClientHeaders = new Map<string, string>()
    rpcClientHeaders.set('Content-Type', 'application/json')

    const rpcClientOptions = new HttpClientOptions(
      Env.RPC_NODE_ENDPOINT,
      rpcClientHeaders
    )

    this.rpcClient = new HttpClient(rpcClientOptions)
  }

  getBlock(): i32 {
    let value = 0

    if (this.rpcClient) {
      let body = new json.JSON.Obj()
      body.set('id', 1)
      body.set('jsonrpc', '2.0')
      body.set('method', 'eth_blockNumber')

      const response = this.rpcClient.post('/', body.toString())

      if (response.has('result')) {
        const hexValue = response.get('result')!.toString()
        value = <i32>parseInt(hexValue, 16)
      }
    }

    return value
  }
}