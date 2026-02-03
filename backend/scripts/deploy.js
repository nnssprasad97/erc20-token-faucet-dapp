const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    // 1. Deploy Token
    const token = await hre.ethers.deployContract("FaucetToken");
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log(`Token deployed to: ${tokenAddress}`);

    // 2. Deploy Faucet
    const faucet = await hre.ethers.deployContract("TokenFaucet", [tokenAddress]);
    await faucet.waitForDeployment();
    const faucetAddress = await faucet.getAddress();
    console.log(`Faucet deployed to: ${faucetAddress}`);

    // 3. Authorize Faucet to Mint
    const tx = await token.setMinter(faucetAddress);
    await tx.wait();
    console.log("Set Faucet as Minter");

    // 4. Save Addresses for Frontend
    // We save this to a shared volume path so frontend can read it
    const frontendDir = path.join(__dirname, "../../frontend/src");
    if (!fs.existsSync(frontendDir)) {
        fs.mkdirSync(frontendDir, { recursive: true });
    }

    const addresses = {
        token: tokenAddress,
        faucet: faucetAddress
    };

    fs.writeFileSync(
        path.join(frontendDir, "addresses.json"),
        JSON.stringify(addresses, null, 2)
    );
    console.log("Addresses saved to frontend/src/addresses.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
