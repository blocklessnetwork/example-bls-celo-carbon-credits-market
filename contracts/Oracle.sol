// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/BlsOracleInterface.sol";

contract BlocklessTCO2eOracle is BlsOracleInterface {
    string private _id;
    string private _description;
    uint8 private _decimals;

    int256 private _latestAnswer;
    uint256 private _latestTimestamp;
    uint256 private _latestRound;
    
    address public _owner;

    event NewBlsOraclePrice(
        int256 indexed current,
        uint256 indexed roundId,
        uint256 updatedAt
    );

    event NewBlsOracleQuery(
        address indexed _from,
        string indexed _id,
        uint timestamp
    );

    event NewOwner(address oldOwner, address newOwner);

    modifier onlyOwner() {
        require(msg.sender == _owner, "only admin may call");
        _;
    }

    constructor(
        string memory id,
        string memory description,
        uint8 decimals_
    ) {
        _owner = msg.sender;
        _id = id;
        _description = description;
        _decimals = decimals_;
    }

    function setOwner(address newOwner) external onlyOwner {
        address oldOwner = _owner;
        _owner = newOwner;

        emit NewOwner(oldOwner, newOwner);
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function latestAnswer() external view override returns (int256) {
        return _latestAnswer;
    }

    function latestTimestamp() external view override returns (uint256) {
        return _latestTimestamp;
    }

    function latestRound() external view override returns (uint256) {
        return _latestRound;
    }

    /**
     * Emit a Blockless Oracle Query here
     *
     */
    function update() external {
        require(msg.sender == _owner);
        
        emit NewBlsOracleQuery(msg.sender, _id, block.timestamp);
    }

    function __callback(int256 _price) external {
        require(msg.sender == _owner);

        _latestAnswer = _price;
        _latestRound = block.number;
        _latestTimestamp = block.timestamp;

        emit NewBlsOraclePrice(_price, _latestRound, _latestTimestamp);
    }
}