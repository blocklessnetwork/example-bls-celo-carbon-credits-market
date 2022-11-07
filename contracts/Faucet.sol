// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

interface BLSOracle {
    function decimals() external view returns (uint8);
    function latestAnswer() external view returns (int256);
}

contract CCOFaucet {
    uint8 constant DECIMALS = 36;
    uint256 constant public tokenAmount = 1000000000000000000000;
    uint256 constant public waitTime = 24 hours;

    ERC20 public tokenInstance;
    BLSOracle public oracleInstance;
    
    mapping(address => uint256) lastAccessTime;

    constructor(address _tokenInstance, address _oracleInstance) {
        require(_tokenInstance != address(0));
        require(_oracleInstance != address(0));
        tokenInstance = ERC20(_tokenInstance);
        oracleInstance = BLSOracle(_oracleInstance);
    }

    function requestTokens() public {
        require(allowedToWithdraw(msg.sender));
        int256 rawPrice = oracleInstance.latestAnswer();

        require(rawPrice > 0, "Price cannot be lower than 0");
        require(oracleInstance.decimals() <= DECIMALS, "DECIMAL UNDERFLOW");

        // Calculate tokens to send from price oracle
        

        tokenInstance.transfer(msg.sender, tokenAmount);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if(lastAccessTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}
