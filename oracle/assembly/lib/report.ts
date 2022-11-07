import Env from "../utils/env"
import Web3 from "../utils/web3"

const report = (): void => {
  // Web3 Client
  const web3Client = new Web3()
  console.log('web3Client.getBlock(): ' + web3Client.getBlock().toString())
}

/**
 * Report
 * 
 */
const runReport = (): void => {
  report()
  process.stdout.write('Run Report Function : ' + Env.RPC_NODE_ENDPOINT)
}

export default runReport