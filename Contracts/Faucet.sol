// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {
    IERC20 public token;
    uint256 public withdrawalAmount = 10 * 10**18;
    uint256 public lockTime = 1 minutes;

    mapping(address => uint256) public nextAccessTime;

    event Withdrawal(address indexed to, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Token address cannot be zero");
        token = IERC20(_tokenAddress);
    }

    function requestTokens() public {
        require(msg.sender != address(0), "Requesting address cannot be zero");
        require(token.balanceOf(address(this)) >= withdrawalAmount, "Insufficient faucet balance");
        require(block.timestamp >= nextAccessTime[msg.sender], "Insufficient time elapsed since last withdrawal - try again later");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;

        bool success = token.transfer(msg.sender, withdrawalAmount);
        require(success, "Token transfer failed");

        emit Withdrawal(msg.sender, withdrawalAmount);
    }

    function setWithdrawalAmount(uint256 _amount) public onlyOwner {
        withdrawalAmount = _amount;
    }

    function setLockTime(uint256 _time) public onlyOwner {
        lockTime = _time;
    }

    function withdraw() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(msg.sender, balance), "Transfer failed");
    }
}
