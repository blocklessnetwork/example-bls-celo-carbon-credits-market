import { BigNumber } from "ethers"

const { ethers } = require('hardhat')

async function main() {
  const BlocklessTCO2e = await ethers.getContractFactory("BlocklessTCO2e")
  const BlocklessTCO2eFaucet = await ethers.getContractFactory("BlocklessTCO2eFaucet")
  const BlocklessTCO2eOracle = await ethers.getContractFactory("BlocklessTCO2eOracle")

  const token = await BlocklessTCO2e.deploy()
  const oracle = await BlocklessTCO2eOracle.deploy('bls.function.id', 'BCO2 / USD', 8)
  const faucet = await BlocklessTCO2eFaucet.deploy(token.address, oracle.address)

  const randValue = Math.random()
  await oracle.__callback(parseInt((randValue * 1e8).toString()));
  
  console.log('Token', await token.address)
  console.log('Oracle', await oracle.latestAnswer())
  console.log('Faucet', await faucet.address, await faucet.waitTime())
  console.log('Fund Faucet', await token.transfer(faucet.address, 100000))
  console.log('Faucet Withdraw', await faucet.requestTokens())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})