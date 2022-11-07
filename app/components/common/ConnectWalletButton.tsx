import { useCelo } from "@celo/react-celo"
import { Button } from "@chakra-ui/react"
import styled from "styled-components"

export default function ConnectWalletButton() {
    const { connect } = useCelo()

    return (
        <WalletConnectButtonInner>
            <Button
                variant='outline'
                onClick={() => connect().catch(() => {})}>
                Connect
            </Button>
        </WalletConnectButtonInner>
    )
}

const WalletConnectButtonInner = styled.div`
    .chakra-button__icon {
        margin-top: 1px;
    }
    
    .chakra-icon {
        width: auto;
        height: 12px;
    }
`