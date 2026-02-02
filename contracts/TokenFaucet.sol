// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TokenFaucet
 * @dev A faucet contract for dispensing ERC20 tokens with rate limiting (cooldown).
 */
contract TokenFaucet is Ownable, ReentrancyGuard {
    FaucetToken public token;
    
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18;
    uint256 public constant COOLDOWN_TIME = 24 hours;
    uint256 public constant MAX_CLAIM_AMOUNT = 10_000 * 10**18;

    bool public paused;
    
    mapping(address => uint256) public lastClaimAt;
    mapping(address => uint256) public totalClaimed;

    /// @dev Emitted when tokens are claimed by a user.
    event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp);
    
    /// @dev Emitted when the faucet's paused state changes.
    event FaucetPaused(bool paused);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = FaucetToken(_tokenAddress);
        paused = false;
    }

    function requestTokens() public nonReentrant {
        require(!paused, "Faucet is paused");
        require(canClaim(msg.sender), "Not eligible to claim");
        
        uint256 remaining = remainingAllowance(msg.sender);
        require(remaining >= FAUCET_AMOUNT, "Insufficient allowance remaining");
        
        lastClaimAt[msg.sender] = block.timestamp;
        totalClaimed[msg.sender] += FAUCET_AMOUNT;
        
        emit TokensClaimed(msg.sender, FAUCET_AMOUNT, block.timestamp);
        
        token.mint(msg.sender, FAUCET_AMOUNT);
    }

    function canClaim(address user) public view returns (bool) {
        if (paused) return false;
        
        if (lastClaimAt[user] > 0 && block.timestamp < lastClaimAt[user] + COOLDOWN_TIME) {
            return false;
        }
        
        if (totalClaimed[user] >= MAX_CLAIM_AMOUNT) {
            return false;
        }
        
        return true;
    }

    function remainingAllowance(address user) public view returns (uint256) {
        uint256 claimed = totalClaimed[user];
        if (claimed >= MAX_CLAIM_AMOUNT) {
            return 0;
        }
        return MAX_CLAIM_AMOUNT - claimed;
    }

    function isPaused() public view returns (bool) {
        return paused;
    }

    function getTimeUntilNextClaim(address user) public view returns (uint256) {
        if (lastClaimAt[user] == 0) {
            return 0;
        }
        
        uint256 nextClaimTime = lastClaimAt[user] + COOLDOWN_TIME;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        
        return nextClaimTime - block.timestamp;
    }

    function setPaused(bool _paused) public onlyOwner {
        paused = _paused;
        emit FaucetPaused(_paused);
    }
}
