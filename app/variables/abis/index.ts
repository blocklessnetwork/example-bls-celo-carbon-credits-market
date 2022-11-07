import { NETWORKS } from '@app/config/networks'
import { ConfigLockdrop } from '@app/types'

export const COMPTROLLER_ABI = [
    "function claimComp(address) public",
    "function claimComp(address holder,address[] cTokens) public",
    "function compBorrowerIndex(address, address) public view returns (uint256)",
    "function compBorrowState(address) public view returns (uint224, uint32)",
    "function compSpeeds(address) public view returns (uint256)",
    "function compSupplierIndex(address, address) public view returns (uint256)",
    "function compSupplyState(address) public view returns (uint224, uint32)",
    "function enterMarkets(address[]) returns (uint[])",
    "function exitMarket(address) returns (uint256)",
    "function getAccountLiquidity(address) external view returns (uint256, uint256, uint256)",
    "function getAllMarkets() public view returns (address[])",
    "function getAssetsIn(address) view returns (address[])",
    "function markets(address) external view returns (bool, uint256, bool)",
    "function borrowGuardianPaused(address) external view returns (bool)",
    "function mintGuardianPaused(address) external view returns (bool)",
    "function collateralGuardianPaused(address) external view returns (bool)",
    "function pauseGuardian() public view returns (address)",
    "function admin() public view returns (address)",
    "function liquidationIncentiveMantissa() public view returns (uint256)",
    "function liquidateCalculateSeizeTokens(address ctokenBorrowed, address ctokenSeize, uint256 repayAmount) public view returns (uint256, uint256)",
]

export const ORACLE_ABI = [
    'function getUnderlyingPrice(address) public view returns (uint)',
    'function feeds(address) public view returns (address)',
]

export const CTOKEN_ABI = [
    "function approve(address, uint256)",
    "function balanceOf(address) external view returns (uint256)",
    "function allowance(address, address) external view returns (uint256)",
    "function borrow(uint256) returns (uint256)",
    "function borrowBalanceStored(address) external view returns (uint256)",
    "function borrowIndex() public view returns (uint256)",
    "function borrowRatePerTimestamp() external view returns (uint256)",
    "function exchangeRateCurrent() public view returns (uint256)",
    "function exchangeRateStored() public view returns (uint256)",
    "function getCash() external view returns (uint256)",
    "function mint(uint256) returns (uint256)",
    "function redeemUnderlying(uint256) returns (uint256)",
    "function redeem(uint256) returns (uint256)",
    "function repayBorrow(uint256) returns (uint256)",
    "function repayBorrowBehalf(uint) returns (uint)",
    "function supplyRatePerTimestamp() external view returns (uint256)",
    "function totalBorrowsCurrent() external view returns (uint256)",
    "function totalBorrows() external view returns (uint256)",
    "function totalReserves() external view returns (uint256)",
    'function totalSupply() external view returns (uint256)',
    "function reserveFactorMantissa() external view returns (uint256)",
    "function underlying() external view returns (address)",
    "function decimals() view returns (uint8)",
    "function interestRateModel() view returns (address)",
    "function liquidateBorrow(address account, uint256 amount, address ctoken) external returns (uint)",
    "function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint)",
    "event Failure(uint256 error, uint256 info, uint256 detail)",
];

export const CBNB_ABI = [
    "function borrow(uint256) returns (uint256)",
    "function approve(address, uint256)",
    "function mint() payable",
    "function redeemUnderlying(uint256) returns (uint256)",
    "function redeem(uint256) returns (uint256)",
    "function repayBorrow() payable",
    "function balanceOf(address) external view returns (uint256)",
    "function liquidateBorrow(uint256 amount, address account, address ctoken) external returns (uint)",
    "event Failure(uint256 error, uint256 info, uint256 detail)",
]

export const ERC20_ABI = [
    "function allowance(address, address) external view returns (uint256)",
    "function approve(address, uint256)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) external view returns (uint256)",
    "function totalSupply() external view returns (uint256)",
    "event Transfer(address indexed from, address indexed to, uint256 amount)",
];

export const LOCKDROP_ABI = [
    "function name() external view returns (string)",
    "function deposit(uint256) external public returns (bool)",
    "function claim()",
    "function balanceOf(address) external view returns (uint256)",
    "function claimUnlockTime() external view returns (uint256)",
    "function totalDeposits() external view returns (uint256)"
]

const abis = [] as any[]
NETWORKS.map(network => {
    const config = network.config

    if (config) {
        const pools = config.pools

        for (const p in pools) {
            if (Object.prototype.hasOwnProperty.call(pools, p)) {
                const pool = pools[p];
                
                abis.push([pool.comptroller, COMPTROLLER_ABI])
                abis.push([pool.oracle, ORACLE_ABI])

                Object.values(pool.markets).map(market => {
                    abis.push([market.contract, CTOKEN_ABI])

                    if (!!market.token.address) {
                        abis.push([market.token.address, ERC20_ABI])
                    }
                })
            }
        }

        Object.values(config.lockdrops).map((lockdropList: ConfigLockdrop[]) => {
            lockdropList.map((ll: ConfigLockdrop) => {
                abis.push([ll.contract, LOCKDROP_ABI])
            })
        })
    }
})

export const ABIs = abis