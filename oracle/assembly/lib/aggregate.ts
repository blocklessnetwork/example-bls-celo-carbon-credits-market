import { CarbonCreditExchangeSource } from "./sources/ccexchange"

/**
 * Aggregate API response and compute TWAP for sources
 * 
 */
const runAggregate = (): void => {
  // Exchange Source 1
  const ccExchangeSource1 = new CarbonCreditExchangeSource(
    'cc_california', 
    'https://carbon-credits-aggregator-1.txlabs.workers.dev', 
    'CALIFORNIA'
  ) 
  ccExchangeSource1.aggregateTwapData()

  // Exchange Source 2
  const ccExchangeSource2 = new CarbonCreditExchangeSource(
    'cc_california_2',
    'https://carbon-credits-aggregator-2.txlabs.workers.dev',
    'CALIFORNIA'
  )
  ccExchangeSource2.aggregateTwapData()

  process.stdout.write('success')
}

export default runAggregate