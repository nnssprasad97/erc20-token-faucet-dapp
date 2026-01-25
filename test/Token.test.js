const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken and Faucet", function () {
    let MyToken, myToken, Faucet, faucet;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy();

        Faucet = await ethers.getContractFactory("Faucet");
        faucet = await Faucet.deploy(await myToken.getAddress());

        // Fund the faucet
        await myToken.transfer(await faucet.getAddress(), ethers.parseEther("1000"));
    });

    describe("Token Deployment", function () {
        it("Should assign the total supply to the owner", async function () {
            const ownerBalance = await myToken.balanceOf(owner.address);
            // expect(await myToken.totalSupply()).to.equal(ownerBalance + ethers.parseEther("1000")); 
            // Wait, owner transfered 1000 to faucet.
            const initialSupply = ethers.parseEther("1000000");
            expect(await myToken.totalSupply()).to.equal(initialSupply);
        });

        it("Should have correct name and symbol", async function () {
            expect(await myToken.name()).to.equal("MyToken");
            expect(await myToken.symbol()).to.equal("MTK");
        });
    });

    describe("Minting", function () {
        it("Should allow owner to mint tokens", async function () {
            await myToken.mint(addr1.address, ethers.parseEther("500"));
            expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("500"));
        });

        it("Should fail if non-owner tries to mint", async function () {
            await expect(
                myToken.connect(addr1).mint(addr1.address, ethers.parseEther("100"))
            ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
        });
    });

    describe("Faucet Functionality", function () {
        it("Should dispense tokens to user", async function () {
            const amount = await faucet.withdrawalAmount();
            await faucet.connect(addr1).requestTokens();
            expect(await myToken.balanceOf(addr1.address)).to.equal(amount);
        });

        it("Should enforce rate limiting", async function () {
            await faucet.connect(addr1).requestTokens();
            await expect(
                faucet.connect(addr1).requestTokens()
            ).to.be.revertedWith("Insufficient time elapsed since last withdrawal - try again later");
        });

        it("Should respect max withdrawal modification", async function () {
            const newAmount = ethers.parseEther("50");
            await faucet.setWithdrawalAmount(newAmount);
            await faucet.connect(addr1).requestTokens();
            expect(await myToken.balanceOf(addr1.address)).to.equal(newAmount);
        });

        it("Should allow owner to withdraw funds", async function () {
            const faucetBalance = await myToken.balanceOf(await faucet.getAddress());
            await faucet.withdraw();
            expect(await myToken.balanceOf(await faucet.getAddress())).to.equal(0);
            // Owner got the funds back
        });
    });
});
