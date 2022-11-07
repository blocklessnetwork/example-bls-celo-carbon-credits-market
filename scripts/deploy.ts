const { ethers } = require('hardhat')

async function main() {
  const CCOOracle = await ethers.getContractFactory("CCOOracle");
  const oracle = await CCOOracle.deploy();

  // await oracle.update();
  const randValue = Math.random() * 1000
  await oracle.__callback(parseInt((randValue * 1e10).toString()));

  console.log(`Updated price with ${await oracle.latestAnswer()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
