const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken and Faucet Integration", function () {
    let MyToken, myToken, Faucet, faucet;
    let owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy(); // Deploys with 1M supply to owner

        Faucet = await ethers.getContractFactory("Faucet");
        faucet = await Faucet.deploy(await myToken.getAddress());

        // Fund the faucet with 1000 tokens
        await myToken.transfer(await faucet.getAddress(), ethers.parseEther("1000"));
    });

    describe("Token Deployment", function () {
        it("Should assign the total supply to the owner", async function () {
            const ownerBalance = await myToken.balanceOf(owner.address);
            const initialSupply = ethers.parseEther("1000000");
            // Owner transferred 1000 to faucet, so balance should be 1M - 1000
            expect(ownerBalance).to.equal(initialSupply - ethers.parseEther("1000"));
        });

        it("Should have correct metadata", async function () {
            expect(await myToken.name()).to.equal("MyToken");
            expect(await myToken.symbol()).to.equal("MTK");
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

        it("Should emit Deposit event (if implemented) or just check transfer", async function () {
            // Our Faucet doesn't have a specific deposit function, just receives tokens. 
            // But if we had a specific function we would test it.
            // We'll test owner withdraw function instead.
            const faucetBalance = await myToken.balanceOf(await faucet.getAddress());
            await faucet.withdraw();
            expect(await myToken.balanceOf(await faucet.getAddress())).to.equal(0);
            expect(await myToken.balanceOf(owner.address)).to.be.closeTo(ethers.parseEther("1000000"), ethers.parseEther("1"));
        });
    });
});
