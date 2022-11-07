import { TokenList } from "../types"
import { isAddress } from "ethers/lib/utils"

/**
 * Helper function to get tokens
 * 
 * @param tokens 
 * @param symbolOrAddress 
 * @param extend 
 * @returns 
 */
export const getToken = (tokens: TokenList, symbolOrAddress: string, extend = {}) => {
    const t = Object.entries(tokens)
        .map(([address, token]) => token)
        .find(token => isAddress(symbolOrAddress) ? token.address.toLowerCase() === symbolOrAddress.toLowerCase() : token.symbol.toLowerCase() === symbolOrAddress.toLowerCase())
    return { ...t, ...extend }
}

/**
 * A collection of token address for all relevant chains
 */
export const chainTokenUnits = {
    56: {
        BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        USDT: '0x55d398326f99059fF775485246999027B3197955',
        ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        TUSD: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
        C98: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
        BTCB: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
    },
    97: {
        BUSD: '0xF62428599bD9dE9c57bBA020E35A3097678b2754',
        USDC: '0x64544969ed7EBf5f083679233325356EbE738930',
        USDT: '0x377533D0E68A22CF180205e9c9ed980f74bc5050',
        ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        TUSD: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
        C98: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
        BTCB: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
    }
}

/**
 * A collection of token information
 */
export const chainTokenUnitsInfo = {
    BNB: {
        name: 'Binance Coin',
        symbol: 'BNB',
        coingeckoId: 'bnb',
        image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        decimals: 18,
    },
    BUSD: {
        name: 'Binance USD',
        symbol: 'BUSD',
        coingeckoId: 'busd',
        image: 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png',
        decimals: 18,
    },
    USDT: {
        name: 'Tether',
        symbol: 'USDT',
        coingeckoId: 'tether',
        image: 'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png',
        decimals: 18,
    },
    USDC: {
        name: 'USD Coin',
        symbol: 'USDC',
        coingeckoId: 'usd-coin',
        image: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
        decimals: 18,
    },
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        coingeckoId: 'ethereum',
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        decimals: 18,
    },
    CAKE: {
        name: 'PancakeSwap',
        symbol: 'CAKE',
        coingeckoId: 'pancakeswap',
        image: 'https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png',
        decimals: 18,
    },
    TUSD: {
        name: 'TrueUSD',
        symbol: 'TUSD',
        coingeckoId: 'true-usd',
        image: 'https://assets.coingecko.com/coins/images/3449/large/tusd.png',
        decimals: 18,
    },
    C98: {
        name: 'Coin98',
        symbol: 'C98',
        coingeckoId: 'coin98',
        image: 'https://assets.coingecko.com/coins/images/17117/large/logo.png',
        decimals: 18,
    },
    BTCB: {
        name: 'Bitcoin',
        symbol: 'BTCB',
        coingeckoId: 'bitcoin-bep2',
        image: 'https://assets.coingecko.com/coins/images/8749/large/4023.png',
        decimals: 18,
    }
}

/**
 * A collection map of token address and their information, sorted by each supported chain
 */
interface ChainTokensInterface {
    [key: number]: any
}
export const chainTokens: ChainTokensInterface = {
    56: {
        PRIMARY: {
            address: '',
            ...chainTokenUnitsInfo.BNB
        }
    },
    97: {
        PRIMARY: {
            address: '',
            ...chainTokenUnitsInfo.BNB
        },
        [chainTokenUnits[97].BUSD]: {
            address: chainTokenUnits[97].BUSD,
            ...chainTokenUnitsInfo.BUSD
        },
        [chainTokenUnits[97].USDC]: {
            address: chainTokenUnits[97].USDC,
            ...chainTokenUnitsInfo.USDC
        },
        [chainTokenUnits[97].USDT]: {
            address: chainTokenUnits[97].USDT,
            ...chainTokenUnitsInfo.USDT
        }
    }
}