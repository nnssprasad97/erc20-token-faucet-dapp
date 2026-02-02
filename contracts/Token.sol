// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FaucetToken
 * @dev ERC20 Token with a built-in minter role for Faucet distribution.
 */
contract FaucetToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10**18;
    address public minter;

    /**
     * @dev Emitted when the minter address is updated.
     * @param newMinter The address of the new minter.
     */
    event MinterSet(address indexed newMinter);

    constructor(address _minter) ERC20("Faucet Token", "FCT") Ownable(msg.sender) {
        require(_minter != address(0), "Invalid minter address");
        minter = _minter;
        emit MinterSet(_minter);
    }

    function mint(address to, uint256 amount) public onlyMinter {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum supply");
        _mint(to, amount);
    }

    function setMinter(address _newMinter) public onlyOwner {
        require(_newMinter != address(0), "Invalid minter address");
        minter = _newMinter;
        emit MinterSet(_newMinter);
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can call this function");
        _;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
