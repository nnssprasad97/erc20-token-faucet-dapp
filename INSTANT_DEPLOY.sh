#!/bin/bash

# ERC-20 Token Faucet - ONE-CLICK DEPLOYMENT
# Instructions:
# 1. Edit .env with your credentials (SEPOLIA_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY)
# 2. Run: bash INSTANT_DEPLOY.sh

echo "Starting deployment..."

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia
echo "Deploying to Sepolia..."
npx hardhat run scripts/deploy.js --network sepolia

# Create verification script
echo "Creating verification script..."
cat > verify.sh << 'VERIFY_SCRIPT'
#!/bin/bash
# Get addresses from deployment.json (created by deploy.js)
TOKEN_ADDRESS=$(grep '"token"' deployment.json | grep -oP '0x[a-fA-F0-9]+')
FAUCET_ADDRESS=$(grep '"faucet"' deployment.json | grep -oP '0x[a-fA-F0-9]+')

echo "Verifying Token..."
npx hardhat verify --network sepolia "$TOKEN_ADDRESS" "ERC20 Token" "ERC20"

echo "Verifying Faucet..."
npx hardhat verify --network sepolia "$FAUCET_ADDRESS" "$TOKEN_ADDRESS"

echo "Done! Check Etherscan:"
echo "Token: https://sepolia.etherscan.io/address/$TOKEN_ADDRESS"
echo "Faucet: https://sepolia.etherscan.io/address/$FAUCET_ADDRESS"
VERIFY_SCRIPT

chmod +x verify.sh

echo ""
echo "========================================"
echo "Deployment complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Run: bash verify.sh (to verify on Etherscan)"
echo "2. Update README with contract addresses"
echo "3. Deploy frontend to Vercel"
echo "4. Record and upload video demo"
echo "5. Submit to Partnr Network"
