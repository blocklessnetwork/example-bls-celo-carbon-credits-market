# Carbon Market Tracker for CELO built with Blockless

## Development

**Install dependencies**

`npm install`

**Prepare Environment Variables**

Copy `.env.example` to `.env`

See mandatory environment variables.


**Build and Execute**

Install the bls CLI and execute `run.sh`.

You may also run the following command:

```
bls function invoke \
  --env STORAGE_ENDPOINT={{ENTER_YOUR_UPSTASH_ENDPOINT}} \
  --env STORAGE_ACCESS_TOKEN={{ENTER_YOUR_UPSTASH_ACCESS_TOKEN}} \
  --env RPC_NODE_ACCESS_TOKEN={{ENTER_RPC_NODE_ACCESS_TOKEN}}
```

## Configuration

Use bls.toml to modify blockless function configuration.

**Permissions**

To access an external resource through the Http Client, include the resource base url under [deployment.permissions].

**Mandatory Environment Variables:**

| KEY                   | DESCRIPTION                           |
|-----------------------|---------------------------------------|
| STORAGE_ENDPOINT      | Upstash's redis HTTP access endpoint  |
| STORAGE_ACCESS_TOKEN  | Upstash's redis HTTP access token     |
| RPC_NODE_ACCESS_TOKEN | Access token for your chosen RPC node |


## Deploy

Login to your bls console and execute the following command.

```
bls function deploy
```

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
