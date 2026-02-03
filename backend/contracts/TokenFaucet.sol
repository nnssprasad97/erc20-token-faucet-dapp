// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";

contract TokenFaucet {
    FaucetToken public token;
    address public admin;
    bool public isPaused;

    uint256 public constant FAUCET_AMOUNT = 10 * 10**18;
    uint256 public constant COOLDOWN_TIME = 24 hours;
    uint256 public constant MAX_CLAIM_AMOUNT = 100 * 10**18;

    mapping(address => uint256) public lastClaimAt;
    mapping(address => uint256) public totalClaimed;

    event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event FaucetPaused(bool paused);

    constructor(address _tokenAddress) {
        token = FaucetToken(_tokenAddress);
        admin = msg.sender;
        isPaused = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    function setPaused(bool _state) external onlyAdmin {
        isPaused = _state;
        emit FaucetPaused(_state);
    }

    function requestTokens() external {
        require(!isPaused, "Faucet is paused");
        require(canClaim(msg.sender), "Cannot claim yet or limit reached");
        require(token.totalSupply() + FAUCET_AMOUNT <= token.MAX_SUPPLY(), "Faucet empty");

        lastClaimAt[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] += FAUCET_AMOUNT;

        token.mint(msg.sender, FAUCET_AMOUNT);
        emit TokensClaimed(msg.sender, FAUCET_AMOUNT, block.timestamp);
    }

    function canClaim(address user) public view returns (bool) {
        if (isPaused) return false;
        if (totalClaimed[user] >= MAX_CLAIM_AMOUNT) return false;
        if (block.timestamp < lastClaimAt[user] + COOLDOWN_TIME) return false;
        return true;
    }

    function remainingAllowance(address user) external view returns (uint256) {
        if (totalClaimed[user] >= MAX_CLAIM_AMOUNT) return 0;
        return MAX_CLAIM_AMOUNT - totalClaimed[user];
    }
}
