const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token and Faucet Integration", function () {
  let Token, token, Faucet, faucet;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy Token
    Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy();
    await token.waitForDeployment();
    const tokenAddr = await token.getAddress();

    // Deploy Faucet
    Faucet = await ethers.getContractFactory("Faucet");
    faucet = await Faucet.deploy(tokenAddr);
    await faucet.waitForDeployment();
    const faucetAddr = await faucet.getAddress();

    // Funding logic if required by test or setup
    // Initial Supply is with owner. owner transfers to faucet.
    await token.transfer(faucetAddr, ethers.parseEther("1000"));
  });

  it("Should deploy contracts and verify addresses", async function () {
    expect(await token.getAddress()).to.be.properAddress;
    expect(await faucet.getAddress()).to.be.properAddress;
  });

  it("Should allow requesting tokens", async function () {
    await faucet.connect(addr1).requestTokens();
    const balance = await token.balanceOf(addr1.address);
    expect(balance).to.be.gt(0);
  });

  // Add more tests as needed
});
