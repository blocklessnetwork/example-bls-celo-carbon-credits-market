import Web3 from "web3"
import { useCelo } from "@celo/react-celo"
import { useEffect, useState } from "react"
import { CO2_TOKEN_ABI, CO2_TOKEN_ADDRESS } from "../constants/tokens"

interface UseBalancesResponse {
  balances: {
    celo: number
    bCO2: number
  }
  isLoading: boolean
  error: any
}

export const useBalances = (): UseBalancesResponse => {
  const { address, getConnectedKit } = useCelo()
  const [celoBalance, setCeloBalance] = useState(0)
  const [bco2Balance, setBCO2Balance] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  async function updateBalance() {
    const connectedKit = await getConnectedKit()
    const celoTokens = await connectedKit.celoTokens.balancesOf(address!)
    const tokenContract = new connectedKit.connection.web3.eth.Contract(CO2_TOKEN_ABI as any, CO2_TOKEN_ADDRESS)

    setCeloBalance(parseFloat(Web3.utils.fromWei(celoTokens.CELO!.toFixed())))
    setBCO2Balance(parseFloat(Web3.utils.fromWei(await tokenContract.methods.balanceOf(address).call())))
    setIsLoading(false)
  }

  useEffect(() => {
    if (address) {
      setIsLoading(true)
      updateBalance()
    } else {
      setCeloBalance(0)
      setBCO2Balance(0)
      setIsLoading(false)
    }
  }, [address])

  useEffect(() => {
    const interval = setInterval(() => {
      if (address) {
        updateBalance()
      } else {
        clearInterval(interval)
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [])


  return {
    balances: {
      celo: celoBalance,
      bCO2: bco2Balance
    },
    isLoading,
    error: null
  }
}