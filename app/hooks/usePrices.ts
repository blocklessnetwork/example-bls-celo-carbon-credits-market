import { useCelo } from "@celo/react-celo"
import { useEffect, useState } from "react"
import { CELO_ORACLE_ABI, CELO_ORACLE_ADDRES, CO2_ORACLE_ABI, CO2_ORACLE_ADDRESS } from "../constants/tokens"
import { formatFixed } from "@ethersproject/bignumber"

interface UsePricesResponse {
  prices: {
    celo: number
    bCO2: number
  },
  isLoading: boolean
  error: any
}

export const usePrices = (): UsePricesResponse => {
  const { address, kit } = useCelo()
  const [celoPrice, setCeloPrice] = useState(0)
  const [bco2Price, setBCO2Price] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  async function updatePrices() {
    const celoOracleContract = new kit.connection.web3.eth.Contract(CELO_ORACLE_ABI as any, CELO_ORACLE_ADDRES)
    const tokenContract = new kit.connection.web3.eth.Contract(CO2_ORACLE_ABI as any, CO2_ORACLE_ADDRESS)

    setCeloPrice(parseFloat(formatFixed(await celoOracleContract.methods.lastPrice().call(), 6)))
    setBCO2Price(parseFloat(formatFixed(await tokenContract.methods.latestAnswer().call(), 10)))
    setIsLoading(false)
  }

  useEffect(() => {
    if (address) {
      setIsLoading(true)
      updatePrices()
    } else {
      setCeloPrice(0)
      setBCO2Price(0)
      setIsLoading(false)
    }
  }, [address])

  return {
    prices: {
      celo: celoPrice,
      bCO2: bco2Price
    },
    isLoading,
    error: null
  }
}