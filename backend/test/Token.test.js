const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken and Faucet Integration", function () {
    let MyToken, myToken, Faucet, faucet;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        MyToken = await ethers.getContractFactory("FaucetToken");
        myToken = await MyToken.deploy(owner.address); // Deploys with 1M supply to owner

        Faucet = await ethers.getContractFactory("TokenFaucet");
        faucet = await Faucet.deploy(await myToken.getAddress());

        // Set Faucet as minter
        await myToken.setMinter(await faucet.getAddress());

        // Remove funding since faucet mints
        // await myToken.transfer(await faucet.getAddress(), ethers.parseEther("1000"));
    });

    describe("Token Deployment", function () {
        it("Should have 0 initial supply", async function () {
            const ownerBalance = await myToken.balanceOf(owner.address);
            expect(ownerBalance).to.equal(0);
        });

        it("Should have correct metadata", async function () {
            expect(await myToken.name()).to.equal("Faucet Token");
            expect(await myToken.symbol()).to.equal("FCT");
        });
    });

    describe("Faucet Logic", function () {
        it("Should dispense tokens successfully", async function () {
            const amount = await faucet.withdrawalAmount();
            await expect(faucet.connect(addr1).requestTokens())
                .to.emit(faucet, "Withdrawal")
                .withArgs(addr1.address, amount);

            expect(await myToken.balanceOf(addr1.address)).to.equal(amount);
        });

        it("Should revert if faucet is empty", async function () {
            // Drain faucet
            // Faucet has 1000. Withdrawal amount is 10.
            // We set withdrawal amount to 2000 to simulate insufficient balance
            await faucet.setWithdrawalAmount(ethers.parseEther("2000"));
            await expect(faucet.connect(addr1).requestTokens())
                .to.be.revertedWith("Insufficient faucet balance");
        });

        it("Should enforce rate limiting (cooldown)", async function () {
            await faucet.connect(addr1).requestTokens();
            await expect(
                faucet.connect(addr1).requestTokens()
            ).to.be.revertedWith("Insufficient time elapsed since last withdrawal - try again later");
        });

        it("Should allow withdrawal after cooldown", async function () {
            await faucet.connect(addr1).requestTokens();

            // Advance time by lockTime + 1 second
            const lockTime = await faucet.lockTime();
            await ethers.provider.send("evm_increaseTime", [Number(lockTime) + 1]);
            await ethers.provider.send("evm_mine");

            await expect(faucet.connect(addr1).requestTokens()).to.not.be.reverted;
        });

        it("Should allow owner to update configuration", async function () {
            const newAmount = ethers.parseEther("50");
            await faucet.setWithdrawalAmount(newAmount);
            expect(await faucet.withdrawalAmount()).to.equal(newAmount);

            const newTime = 120; // 2 minutes
            await faucet.setLockTime(newTime);
            expect(await faucet.lockTime()).to.equal(newTime);
        });

        it("Should prevent non-owner from updating config", async function () {
            await expect(faucet.connect(addr1).setWithdrawalAmount(ethers.parseEther("50")))
                .to.be.revertedWithCustomError(faucet, "OwnableUnauthorizedAccount");
        });


    });
});
