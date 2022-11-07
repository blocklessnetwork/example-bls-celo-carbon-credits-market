// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function decimals() external view returns (uint8);

    function transfer(address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
}

interface BlsOracleInterface {
    function decimals() external view returns (uint8);

    function latestAnswer() external view returns (int256);
}

contract BlocklessTCO2eFaucet {
    uint8 constant DECIMALS = 36;
    uint256 public constant tokenAmount = 1e18;
    uint256 public constant pricedTokenAmount = 100 * 1e18;
    uint256 public constant waitTime = 24 hours;

    ERC20 public tokenInstance;
    BlsOracleInterface public oracleInstance;

    mapping(address => uint256) lastAccessTime;

    constructor(address _tokenInstance, address _oracleInstance) {
        require(_tokenInstance != address(0));
        require(_oracleInstance != address(0));
        tokenInstance = ERC20(_tokenInstance);
        oracleInstance = BlsOracleInterface(_oracleInstance);
    }

    function requestTokens() public {
        require(allowedToWithdraw(msg.sender));

        // Calculate tokens to send from price oracle
        int256 rawPrice = oracleInstance.latestAnswer();

        require(rawPrice > 0, "Price cannot be lower than 0");
        require(oracleInstance.decimals() <= DECIMALS, "DECIMAL UNDERFLOW");

        uint256 priceMantissa = uint256(rawPrice) *
            (10 **
                (DECIMALS -
                    tokenInstance.decimals() -
                    oracleInstance.decimals()));
        uint256 tokenToSend = ((tokenAmount * 1e18) *
            ((pricedTokenAmount * 1e18) / priceMantissa)) / 1e36;

        tokenInstance.transfer(msg.sender, tokenToSend);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if (lastAccessTime[_address] == 0) {
            return true;
        } else if (block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}
