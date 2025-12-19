const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenFaucet', function () {
  let token, faucet;
  let owner, user1, user2;
  const FAUCET_AMOUNT = ethers.parseEther('100');
  const COOLDOWN_PERIOD = 24 * 60 * 60; // 24 hours
  const MAX_CLAIM_AMOUNT = ethers.parseEther('1000');
  const INITIAL_SUPPLY = ethers.parseEther('100000');

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy Token
    const Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    await token.deployed();

    // Deploy Faucet
    const TokenFaucet = await ethers.getContractFactory('TokenFaucet');
    faucet = await TokenFaucet.deploy(token.address);
    await faucet.deployed();

    // Transfer tokens to faucet
    await token.transfer(faucet.address, INITIAL_SUPPLY);
  });

  describe('Deployment', function () {
    it('Should set correct token address', async function () {
      expect(await faucet.tokenAddress()).to.equal(token.address);
    });

    it('Should set owner as admin', async function () {
      expect(await faucet.admin()).to.equal(owner.address);
    });

    it('Should have correct initial pause state', async function () {
      expect(await faucet.isPaused()).to.equal(false);
    });
  });

  describe('Token Claiming', function () {
    it('Should allow first claim', async function () {
      const initialBalance = await token.balanceOf(user1.address);
      await expect(faucet.connect(user1).requestTokens())
        .to.emit(faucet, 'TokensClaimed')
        .withArgs(user1.address, FAUCET_AMOUNT, expect.any(BigInt));
      const finalBalance = await token.balanceOf(user1.address);
      expect(finalBalance - initialBalance).to.equal(FAUCET_AMOUNT);
    });

    it('Should revert if faucet is paused', async function () {
      await faucet.setPaused(true);
      await expect(faucet.connect(user1).requestTokens())
        .to.be.revertedWith('Faucet is paused');
    });

    it('Should revert on cooldown violation', async function () {
      await faucet.connect(user1).requestTokens();
      await expect(faucet.connect(user1).requestTokens())
        .to.be.revertedWith('Cooldown period not elapsed');
    });

    it('Should allow claim after cooldown', async function () {
      await faucet.connect(user1).requestTokens();
      await ethers.provider.send('evm_increaseTime', [COOLDOWN_PERIOD + 1]);
      await ethers.provider.send('evm_mine', []);
      await expect(faucet.connect(user1).requestTokens())
        .to.emit(faucet, 'TokensClaimed');
    });

    it('Should revert if lifetime limit exceeded', async function () {
      // Claim multiple times until limit is reached
      let claimCount = 0;
      while (claimCount < 10) {
        await faucet.connect(user1).requestTokens();
        if (claimCount < 9) {
          await ethers.provider.send('evm_increaseTime', [COOLDOWN_PERIOD + 1]);
          await ethers.provider.send('evm_mine', []);
        }
        claimCount++;
      }
      await ethers.provider.send('evm_increaseTime', [COOLDOWN_PERIOD + 1]);
      await ethers.provider.send('evm_mine', []);
      await expect(faucet.connect(user1).requestTokens())
        .to.be.revertedWith('Maximum claims reached');
    });
  });

  describe('canClaim Function', function () {
    it('Should return true for new user', async function () {
      expect(await faucet.canClaim(user1.address)).to.equal(true);
    });

    it('Should return false during cooldown', async function () {
      await faucet.connect(user1).requestTokens();
      expect(await faucet.canClaim(user1.address)).to.equal(false);
    });

    it('Should return true after cooldown expires', async function () {
      await faucet.connect(user1).requestTokens();
      await ethers.provider.send('evm_increaseTime', [COOLDOWN_PERIOD + 1]);
      await ethers.provider.send('evm_mine', []);
      expect(await faucet.canClaim(user1.address)).to.equal(true);
    });
  });

  describe('Pause Functionality', function () {
    it('Should allow admin to pause', async function () {
      await expect(faucet.setPaused(true))
        .to.emit(faucet, 'FaucetPaused')
        .withArgs(true);
      expect(await faucet.isPaused()).to.equal(true);
    });

    it('Should allow admin to unpause', async function () {
      await faucet.setPaused(true);
      await expect(faucet.setPaused(false))
        .to.emit(faucet, 'FaucetPaused')
        .withArgs(false);
      expect(await faucet.isPaused()).to.equal(false);
    });

    it('Should revert if non-admin tries to pause', async function () {
      await expect(faucet.connect(user1).setPaused(true))
        .to.be.revertedWith('Only admin');
    });
  });

  describe('State Tracking', function () {
    it('Should track lastClaimTime', async function () {
      const blockBefore = await ethers.provider.getBlock('latest');
      await faucet.connect(user1).requestTokens();
      const blockAfter = await ethers.provider.getBlock('latest');
      const lastClaimTime = await faucet.getLastClaimTime(user1.address);
      expect(lastClaimTime).to.be.gte(blockBefore.timestamp);
      expect(lastClaimTime).to.be.lte(blockAfter.timestamp);
    });

    it('Should track totalClaimed', async function () {
      await faucet.connect(user1).requestTokens();
      const totalClaimed = await faucet.getUserClaimCount(user1.address);
      expect(totalClaimed).to.equal(1);
    });
  });

  describe('Edge Cases', function () {
    it('Should handle multiple users independently', async function () {
      await faucet.connect(user1).requestTokens();
      await expect(faucet.connect(user2).requestTokens())
        .to.emit(faucet, 'TokensClaimed');
      expect(await faucet.canClaim(user1.address)).to.equal(false);
      expect(await faucet.canClaim(user2.address)).to.equal(false);
    });

    it('Should revert if insufficient balance', async function () {
      // Transfer most tokens out
      const balance = await token.balanceOf(faucet.address);
      await token.transfer(owner.address, balance - ethers.parseEther('50'));
      // Try to claim when not enough balance
      await expect(faucet.connect(user1).requestTokens())
        .to.be.revertedWith('Insufficient faucet balance');
    });
  });
});
