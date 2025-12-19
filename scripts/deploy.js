const hre = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Deploying ERC-20 Token Faucet to Sepolia...');

  // Deploy Token
  console.log('Deploying Token contract...');
  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy();
  await token.deployed();
  console.log('Token deployed to:', token.address);

  // Deploy Faucet
  console.log('Deploying TokenFaucet contract...');
  const TokenFaucet = await hre.ethers.getContractFactory('TokenFaucet');
  const faucet = await TokenFaucet.deploy(token.address);
  await faucet.deployed();
  console.log('TokenFaucet deployed to:', faucet.address);

  // Transfer tokens to faucet
  console.log('Transferring tokens to faucet...');
  const transferAmount = hre.ethers.utils.parseEther('10000');
  await token.transfer(faucet.address, transferAmount);
  console.log('Transferred 10000 tokens to faucet');

  // Save deployment addresses
  const deploymentAddresses = {
    token: token.address,
    faucet: faucet.address,
    network: hre.network.name,
    deployedAt: new Date().toISOString(),
  };

  const deploymentPath = path.join(__dirname, '../deployments.json');
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentAddresses, null, 2));
  console.log('Deployment addresses saved to deployments.json');

  // Verify contracts if not on localhost
  if (hre.network.name !== 'hardhat' && hre.network.name !== 'localhost') {
    console.log('Verifying contracts on Etherscan...');
    await hre.run('verify:verify', {
      address: token.address,
      constructorArguments: [],
    });
    console.log('Token verified on Etherscan');

    await hre.run('verify:verify', {
      address: faucet.address,
      constructorArguments: [token.address],
    });
    console.log('TokenFaucet verified on Etherscan');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
