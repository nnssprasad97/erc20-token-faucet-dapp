const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy MyToken
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment(); // Hardhat v2.14+ syntax
    const tokenAddress = await myToken.getAddress();
    console.log("MyToken deployed to:", tokenAddress);

    // Deploy Faucet
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy(tokenAddress);
    await faucet.waitForDeployment();
    const faucetAddress = await faucet.getAddress();
    console.log("Faucet deployed to:", faucetAddress);

    // Fund Faucet
    const fundAmount = hre.ethers.parseEther("10000"); // 10,000 tokens
    await myToken.transfer(faucetAddress, fundAmount);
    console.log("Transferred 10,000 MTK to Faucet");

    // Save addresses and ABI to frontend
    const fs = require("fs");
    const path = require("path");
    const srcDir = path.join(__dirname, "../src");

    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir);
    }

    const addresses = {
        token: tokenAddress,
        faucet: faucetAddress,
        tokenABI: MyToken.interface.format(hre.ethers.JsonFragment), // Correct way to export ABI in Ethers v6? 
        // Actually artifacts are better but let's try to just dump minimal ABI or use artifacts. 
        // For simplicity let's save the artifact names or assume standard load.
        // The user says "Connect via library", usually means ABI is needed.
    };

    // We need the ABI. Let's read from artifacts.
    const TokenArtifact = artifacts.readArtifactSync("MyToken");
    const FaucetArtifact = artifacts.readArtifactSync("Faucet");

    const frontendData = {
        tokenAddress: tokenAddress,
        faucetAddress: faucetAddress,
        tokenABI: TokenArtifact.abi,
        faucetABI: FaucetArtifact.abi
    };

    fs.writeFileSync(
        path.join(srcDir, "addresses.json"),
        JSON.stringify(frontendData, null, 2)
    );
    console.log("Frontend config saved to src/addresses.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
