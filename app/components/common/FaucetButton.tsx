import { useCelo } from "@celo/react-celo"
import { Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FAUCET_ABI, FAUCET_ADDRESS } from "../../constants/tokens"

export default function FaucetButton() {
  const { getConnectedKit, initialised, account, address } = useCelo()
  const [isLoading, setIsLoading] = useState(false)
  const [isWithdrawAllowed, setIsWithdrawAllowed] = useState(false)

  useEffect(() => {
    if (address) {
      validateWithdrawTokens()
    }
  }, [address])

  const validateWithdrawTokens = async () => {
    const connectedKit = await getConnectedKit()
    const faucetContract = new connectedKit.connection.web3.eth.Contract(
      FAUCET_ABI as any,
      FAUCET_ADDRESS
    )

    setIsWithdrawAllowed(await faucetContract.methods.allowedToWithdraw(address).call())
  }

  const getTokens = async () => {
    setIsLoading(true)

    const connectedKit = await getConnectedKit()
    const faucetContract = new connectedKit.connection.web3.eth.Contract(
      FAUCET_ABI as any,
      FAUCET_ADDRESS
    )

    await faucetContract.methods.requestTokens().send({ from: address, amount: 0 })
    await validateWithdrawTokens()

    setIsLoading(false)
  }

  return (
    <FaucetButtonInner>
      <Button
        isLoading={isLoading}
        onClick={() => getTokens()}
        disabled={!(initialised && account) || !isWithdrawAllowed}
        colorScheme='orange'>
        Get tCO2e from the Faucet
      </Button>
    </FaucetButtonInner>
  )
}

const FaucetButtonInner = styled.div`
    .chakra-button__icon {
        margin-top: 1px;
    }
    
    .chakra-icon {
        width: auto;
        height: 12px;
    }
`