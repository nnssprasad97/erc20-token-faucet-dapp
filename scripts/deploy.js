const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy FaucetToken
    const MyToken = await hre.ethers.getContractFactory("FaucetToken");
    const myToken = await MyToken.deploy(deployer.address); // Constructor needs minter address
    await myToken.waitForDeployment(); // Hardhat v2.14+ syntax
    const tokenAddress = await myToken.getAddress();
    console.log("FaucetToken deployed to:", tokenAddress);

    // Deploy TokenFaucet
    const Faucet = await hre.ethers.getContractFactory("TokenFaucet");
    const faucet = await Faucet.deploy(tokenAddress);
    await faucet.waitForDeployment();
    const faucetAddress = await faucet.getAddress();
    console.log("Faucet deployed to:", faucetAddress);

    // Set Faucet as minter
    await myToken.setMinter(faucetAddress);
    console.log("Set Faucet as Minter");

    // No need to fund faucet if it mints!
    // const fundAmount = hre.ethers.parseEther("10000"); // 10,000 tokens
    // await myToken.transfer(faucetAddress, fundAmount);
    // console.log("Transferred 10,000 MTK to Faucet");

    // Save addresses and ABI to frontend
    const fs = require("fs");
    const path = require("path");
    const srcDir = path.join(__dirname, "../frontend/src");

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

    // We need the ABI. Let's read from artifacts using hre.artifacts
    // We need the ABI. Let's read from artifacts using hre.artifacts
    const TokenArtifact = await hre.artifacts.readArtifact("FaucetToken");
    const FaucetArtifact = await hre.artifacts.readArtifact("TokenFaucet");

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

    // Also write .env file for the actual frontend app
    // We write to ../frontend/.env relative to scripts/
    const frontendDir = path.join(__dirname, "../frontend");
    if (fs.existsSync(frontendDir)) {
        const envContent = `REACT_APP_TOKEN_ADDRESS=${tokenAddress}\nREACT_APP_FAUCET_ADDRESS=${faucetAddress}\n`;
        fs.writeFileSync(path.join(frontendDir, ".env"), envContent);
        console.log("Frontend .env saved at " + path.join(frontendDir, ".env"));
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
