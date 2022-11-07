import clsx from "clsx"
import styled from "styled-components"
import { switchWalletNetwork } from "../../utils/web3"
import { DEFAULT_CHAIN_ID } from "../../variables/connectors"
import { useWeb3Injector } from "../../hooks/useWeb3Injector"
import { Button } from "@chakra-ui/react"

interface BannerChainInfoProps { }

export default function BannerChainInfo({ }: BannerChainInfoProps) {
    const { isSupported } = useWeb3Injector()
    
    const bannerChainInfoClasses = clsx({
        'unsupported': isSupported === false
    })

    const switchNetwork = () => {
        switchWalletNetwork(DEFAULT_CHAIN_ID)
    }

    return <BannerChainInfoInner className={bannerChainInfoClasses}>
        You are connected to an unsupported network. <Button variant='outline' size='xs' onClick={switchNetwork}>Switch Network</Button>
    </BannerChainInfoInner >
}

const BannerChainInfoInner = styled.div`
    font-size: 0.75rem;

    display: none;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 1rem;

    background-color: var(--bls--beige-01);

    button {
        margin-left: 0.75rem;

        &:hover, &:active, &:focus {
            background-color: transparent !important;
        }
    }

    &.testnet {
        font-style: italic;
        background-color: var(--bls--black);
        color: var(--bls--white);
    }

    &.unsupported {
        display: flex;

        background-color: var(--bls--red-01);
        color: var(--bls--white);
    }
`