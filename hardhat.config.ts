import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-ethers"

require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      forking: {
        url: "https://alfajores-forno.celo-testnet.org"
      }
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: {
        mnemonic: process.env.ACCOUNT_MEMONIC,
        path: "m/44'/60'/0'/0"
      },
      chainId: 42220
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.ACCOUNT_MEMONIC,
        path: "m/44'/60'/0'/0"
      },
      chainId: 44787
    }
  }
}

export default config
