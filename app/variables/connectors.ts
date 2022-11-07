import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

export const CHAIN_ID = 42220
export const TESTNET_CHAIN_ID = 44787
export const LOCALHOST = 31337
export const DEFAULT_CHAIN_ID = TESTNET_CHAIN_ID

console.log('MAINNET_CHAIN_ID', CHAIN_ID)
console.log('TESTNET_CHAIN_ID', TESTNET_CHAIN_ID)
console.log('LOCAL_CHAIN_ID', LOCALHOST)
console.log('DEFAULT_CHAIN_ID', DEFAULT_CHAIN_ID)

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        CHAIN_ID,
        TESTNET_CHAIN_ID,
        LOCALHOST
    ],
})

export const networkOnlyConnector = new NetworkConnector({
    defaultChainId: DEFAULT_CHAIN_ID,
    urls: {
        [CHAIN_ID]: "https://forno.celo.org",
        [TESTNET_CHAIN_ID]: "https://alfajores-forno.celo-testnet.org",
        [LOCALHOST]: 'http://127.0.0.1:8545'
    } 
})

export const allConnectors = {
    'injected': injectedConnector,
    'network': networkOnlyConnector
} as any