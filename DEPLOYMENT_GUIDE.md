# ERC-20 Token Faucet - Complete Deployment Guide

⏰ **Est. Time: 45-60 minutes** | 🔴 **CRITICAL FOR EVALUATION**

---

## PART 1: Prerequisites Setup (10 minutes)

### 1.1 Get Sepolia Testnet ETH

**You NEED testnet ETH for gas fees!**

1. Go to: https://sepoliafaucet.com/
2. Connect your MetaMask wallet
3. Request 0.5 SEP (free, instant)
4. Check balance in MetaMask (should show 0.5 SEP)

### 1.2 Get Infura RPC URL

1. Go to: https://infura.io/
2. Sign up (free tier)
3. Create new project: "ERC20Faucet"
4. Select Network: "Sepolia"
5. Copy your RPC URL: `https://sepolia.infura.io/v3/YOUR_KEY`

### 1.3 Get Etherscan API Key

1. Go to: https://etherscan.io/apis
2. Sign up and verify email
3. Create API key
4. Copy it: `YOUR_ETHERSCAN_API_KEY`

### 1.4 Get Your Private Key

⚠️ **DANGER ZONE - KEEP SECRET!**

1. Open MetaMask
2. Account Details → Export Private Key
3. Copy it: `YOUR_PRIVATE_KEY`
4. **NEVER commit this to Git!**
5. **NEVER share this!**

---

## PART 2: Local Setup (5 minutes)

### 2.1 Clone Repository

```bash
git clone https://github.com/nnssprasad97/erc20-token-faucet-dapp.git
cd erc20-token-faucet-dapp
```

### 2.2 Install Dependencies

```bash
# Install Hardhat and dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2.3 Create .env File

```bash
# Create .env from template
cp .env.example .env
```

### 2.4 Edit .env with Your Values

```bash
# Open .env with your editor
# nano .env  # or use VS Code
```

**Add these lines:**

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

**EXAMPLE (with dummy values):**

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/abc123def456
PRIVATE_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
ETHERSCAN_API_KEY=ABCD1234EFGH5678IJKL9012
```

---

## PART 3: Smart Contract Deployment (15 minutes)

### 3.1 Compile Contracts

```bash
npx hardhat compile
```

**Expected Output:**
```
Compiled 2 Solidity files successfully
```

### 3.2 Run Tests (OPTIONAL but recommended)

```bash
npx hardhat test
```

**Expected Output:**
```
TokenFaucet
  Deployment
    ✔ Should set correct token address
    ✔ Should set owner as admin
    ✔ Should have correct initial pause state
  ...
  15 passing
```

### 3.3 Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**SAVE THE OUTPUT - YOU NEED THESE ADDRESSES!**

You'll see:
```
Deploying ERC-20 Token Faucet to Sepolia...
Deploying Token contract...
Token deployed to: 0x1234567890123456789012345678901234567890
Deploying TokenFaucet contract...
TokenFaucet deployed to: 0x0987654321098765432109876543210987654321
Transferred 10000 tokens to faucet
Deployment addresses saved to deployments.json
```

**COPY THESE TWO ADDRESSES:**
- **Token Address**: `0x1234567890123456789012345678901234567890`
- **Faucet Address**: `0x0987654321098765432109876543210987654321`

### 3.4 Verify Contracts Compiled

Check `deployments.json` was created:

```bash
cat deployments.json
```

You should see:
```json
{
  "token": "0x1234567890123456789012345678901234567890",
  "faucet": "0x0987654321098765432109876543210987654321",
  "network": "sepolia",
  "deployedAt": "2025-12-19T..."
}
```

---

## PART 4: Etherscan Verification (20 minutes)

### 4.1 Verify Token Contract

1. Go to: https://sepolia.etherscan.io/
2. Search for your Token address (paste `0x1234...`)
3. Click "Contract" tab
4. Click "Verify and Publish" (blue button)
5. Fill form:
   - **Compiler Version**: `0.8.0` or higher
   - **Optimization Enabled**: Yes
   - **License**: MIT
6. Paste entire `contracts/Token.sol` code in text area
7. Click "Verify and Publish"
8. Wait for confirmation ✅

**SAVE THIS LINK:**
```
https://sepolia.etherscan.io/address/0x1234567890123456789012345678901234567890#code
```

### 4.2 Verify Faucet Contract

1. Search for Faucet address on Etherscan
2. Repeat same verification process
3. Use `contracts/TokenFaucet.sol` code

**SAVE THIS LINK:**
```
https://sepolia.etherscan.io/address/0x0987654321098765432109876543210987654321#code
```

### 4.3 Check Verification Status

After ~5-10 minutes, Etherscan should show:
```
✅ Contract source code verified
```

---

## PART 5: Docker Testing (15 minutes)

### 5.1 Update .env with Contract Addresses

```bash
# Edit .env and add:
VITE_TOKEN_ADDRESS=0x1234567890123456789012345678901234567890
VITE_FAUCET_ADDRESS=0x0987654321098765432109876543210987654321
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### 5.2 Build Docker Image

```bash
docker-compose build
```

**Expected Output:**
```
Building frontend
Sending build context to Docker daemon
...
Successfully tagged erc20-token-faucet-dapp_frontend:latest
```

### 5.3 Start Docker Container

```bash
docker-compose up
```

**Wait until you see:**
```
frontend_1  | [nginx] listening on port 3000
frontend_1  | [health] check endpoint ready
```

### 5.4 Test Application

**In Browser:**
1. Go to: http://localhost:3000
2. Click "Connect Wallet"
3. Approve MetaMask popup
4. Should show your wallet address ✅
5. Should show token balance ✅
6. "Claim Tokens" button should be enabled ✅

**Test Health Endpoint:**

```bash
# In new terminal
curl http://localhost:3000/health

# Expected output:
healthy
```

### 5.5 Test Wallet Functions

**In Browser Console (F12):**

```javascript
// Test 1: Connect wallet
await window.__EVAL__.connectWallet()
// Should return: "0x..."

// Test 2: Get balance
await window.__EVAL__.getBalance("0x...")
// Should return: "0" or some number as string

// Test 3: Check if can claim
await window.__EVAL__.canClaim("0x...")
// Should return: true or false

// Test 4: Get contract addresses
await window.__EVAL__.getContractAddresses()
// Should return: {token: "0x...", faucet: "0x..."}
```

**If all tests pass: ✅ YOUR APP WORKS!**

---

## PART 6: Update README (5 minutes)

### 6.1 Add Deployed Contracts Section

Open `README.md` and add:

```markdown
## Deployed Contracts

### Sepolia Testnet
- **Token Contract**: [0x1234567890123456789012345678901234567890](https://sepolia.etherscan.io/address/0x1234567890123456789012345678901234567890#code)
  - Status: ✅ Verified on Etherscan
  - Total Supply: 100,000 tokens
  
- **Faucet Contract**: [0x0987654321098765432109876543210987654321](https://sepolia.etherscan.io/address/0x0987654321098765432109876543210987654321#code)
  - Status: ✅ Verified on Etherscan
  - Claim Amount: 100 tokens per transaction
  - Cooldown Period: 24 hours
  - Max Claims per Address: 10
  - Total Faucet Supply: 10,000 tokens
```

### 6.2 Update .env values in README

```markdown
## Environment Variables

Create a `.env` file with:

```bash
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_TOKEN_ADDRESS=0x1234567890123456789012345678901234567890
VITE_FAUCET_ADDRESS=0x0987654321098765432109876543210987654321
```
```

---

## PART 7: Commit & Push (5 minutes)

```bash
# Stage all changes
git add .

# Commit with message
git commit -m "Add deployed contract addresses and Etherscan verification links"

# Push to GitHub
git push origin main
```

---

## ✅ VERIFICATION CHECKLIST

Before resubmitting, verify ALL of these:

- [ ] Token contract deployed to Sepolia
- [ ] Faucet contract deployed to Sepolia
- [ ] Both contracts verified on Etherscan ✅
- [ ] docker-compose up works without errors
- [ ] App accessible at http://localhost:3000
- [ ] Health endpoint returns 200: `curl http://localhost:3000/health`
- [ ] Wallet connection works
- [ ] Token balance displays correctly
- [ ] "Claim Tokens" button works
- [ ] window.__EVAL__ functions all work
- [ ] Etherscan links added to README
- [ ] All changes committed to GitHub
- [ ] Repository is PUBLIC (can be accessed without login)

---

## 🚨 TROUBLESHOOTING

### Error: "Insufficient balance for gas"
**Solution**: Get more Sepolia ETH from faucet (https://sepoliafaucet.com/)

### Error: "Invalid RPC URL"
**Solution**: Check Infura key is correct in .env

### Docker won't start
**Solution**: 
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### window.__EVAL__ undefined
**Solution**: Reload page (F5) in browser, wait 3 seconds

### Health endpoint returns 404
**Solution**: Make sure nginx.conf is properly copied to container

---

## 📊 WHAT'S HAPPENING

When you run deployment:

1. **Compile**: Solidity code → JavaScript artifacts
2. **Deploy**: Artifacts → Blockchain transactions
3. **Verify**: Source code → Etherscan database
4. **Build Docker**: Node container → nginx container
5. **Test**: Browser → Smart contract → Blockchain

Each step MUST succeed for final submission to work!

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. Take 5+ screenshots of working app
2. Record 2-5 min video demo
3. Create architecture diagram
4. Update final README
5. **RESUBMIT TO PARTNR NETWORK**

---

**YOU'VE GOT THIS! 🚀**

Deployment is the final 30% that separates 60/100 from 85/100. **DO IT NOW!**
