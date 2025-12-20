# DEPLOYMENT QUICK START - COMPLETE IN 2 HOURS

## REMAINING CRITICAL TASKS (6 items)

**⏱️ Deadline: 20 Dec 2025, 4:59 PM IST (~2.5 hours remaining)**

### TASK 1: DEPLOY CONTRACTS (30-40 min) ✅ DO THIS FIRST

**Step 1a: Get Sepolia ETH**
```bash
# Go to https://www.infura.io/faucet/sepolia
# Get your MetaMask address
# Request 0.5 ETH for gas fees
# Wait 2-5 minutes
```

**Step 1b: Get Infura RPC Key**
```bash
# Create account at https://infura.io/
# Create new project
# Select Sepolia network
# Copy RPC URL (should look like: https://sepolia.infura.io/v3/YOUR_KEY)
```

**Step 1c: Get Etherscan API Key**
```bash
# Go to https://etherscan.io/apis
# Create account
# Create new API key
# Copy the key
```

**Step 1d: Update .env file in repository**
```bash
# Clone locally if not already:
git clone https://github.com/nnssprasad97/erc20-token-faucet-dapp.git
cd erc20-token-faucet-dapp

# Edit .env with actual values:
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
VITE_TOKEN_ADDRESS=0x... (will update after deployment)
VITE_FAUCET_ADDRESS=0x... (will update after deployment)
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

**Step 1e: Install dependencies and deploy**
```bash
# Install all dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests to verify
npx hardhat test

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Output will show:
# Token deployed to: 0x...
# Faucet deployed to: 0x...
# Save these addresses!
```

---

### TASK 2: VERIFY CONTRACTS ON ETHERSCAN (10-15 min)

**Step 2a: Verify Token Contract**
```bash
npx hardhat verify --network sepolia <TOKEN_ADDRESS> "ERC20 Token" "ERC20"
```

**Step 2b: Verify Faucet Contract**
```bash
npx hardhat verify --network sepolia <FAUCET_ADDRESS> <TOKEN_ADDRESS>
```

**Step 2c: Get Verification Links**
- Token: `https://sepolia.etherscan.io/address/<TOKEN_ADDRESS>`
- Faucet: `https://sepolia.etherscan.io/address/<FAUCET_ADDRESS>`

**Step 2d: Update README.md with addresses** (Already has placeholders)

---

### TASK 3: DEPLOY FRONTEND TO VERCEL (10-15 min)

**Step 3a: Go to Vercel**
```bash
# Visit: https://vercel.com/import
# Sign in with GitHub
# Select your repo: erc20-token-faucet-dapp
```

**Step 3b: Configure Build Settings**
```
Framework: Vite
Build Command: cd frontend && npm run build
Output Directory: frontend/dist
```

**Step 3c: Add Environment Variables**
```
VITE_TOKEN_ADDRESS = (Your deployed token address)
VITE_FAUCET_ADDRESS = (Your deployed faucet address)
VITE_RPC_URL = https://sepolia.infura.io/v3/YOUR_KEY
```

**Step 3d: Deploy**
- Click Deploy
- Wait for build (2-3 min)
- Copy live URL (e.g., https://your-app.vercel.app)

---

### TASK 4: RECORD VIDEO DEMO (10-15 min)

**Step 4a: Use Windows Built-in Recorder OR OBS**
```bash
# Windows: Press Win + G to open Game Bar
# OR download OBS from https://obsproject.com/
```

**Step 4b: Record the Following**
1. Open deployed app at Vercel URL
2. Show: "Connect Wallet" button
3. Click and show MetaMask popup
4. Select account and confirm
5. Show connected wallet address
6. Show token balance
7. Click "Claim Tokens"
8. Show transaction popup
9. Approve transaction
10. Show success message
11. Show updated balance
12. Try to claim again (show cooldown error)
13. Stop recording

**Step 4c: Upload to YouTube**
```bash
# Go to https://youtube.com/upload
# Upload video
# Make it UNLISTED (important!)
# Copy video URL
```

---

### TASK 5: TAKE SCREENSHOTS (5-10 min)

**Create screenshots/ directory:**
```bash
mkdir screenshots
```

**Required screenshots:**
1. **1-wallet-connection.png**: MetaMask popup
2. **2-app-interface.png**: App with balance shown
3. **3-successful-claim.png**: Success message
4. **4-cooldown-error.png**: Error message for cooldown
5. **5-limit-reached.png**: Error for limit reached

**How to take:**
- Use Snipping Tool (Win + Shift + S)
- Or OBS
- Or browser DevTools screenshot
- Save each as PNG in screenshots/ folder

---

### TASK 6: CREATE ARCHITECTURE DIAGRAM (10-15 min)

**Use draw.io (FREE):**
```bash
# Go to https://draw.io/
# Create new diagram
# Add these elements:

[User MetaMask] ---> [React Frontend] ---> [Blockchain (Sepolia)]
                            |
                            v
                    [Ethers.js Library]
                            |
                    v
            [Smart Contracts]
            ├── Token.sol
            └── TokenFaucet.sol

# Save as PNG
# Put in screenshots/
```

---

## FINAL STEP: UPDATE PARTNR FORM (5 min)

**Go to:** https://app.partnr.network/global-placement-program/tasks/cb34030be5d14f7ca5de

**Click Submit tab and fill:**
1. ✅ GitHub URL: https://github.com/nnssprasad97/erc20-token-faucet-dapp
2. ❌ **Live Demo URL**: Your Vercel URL
3. ❌ **Video Demo URL**: Your YouTube URL
4. ✅ Skills: Smart Contract, Frontend Development, Blockchain
5. ✅ Tools: Solidity, React, Hardhat

**Click Submit**

---

## COMMAND CHECKLIST

```bash
# 1. Deploy
npx hardhat run scripts/deploy.js --network sepolia

# 2. Verify (repeat for both contracts)
npx hardhat verify --network sepolia <ADDRESS> <CONSTRUCTOR_ARGS>

# 3. Test locally
docker-compose up
# Visit http://localhost:3000

# 4. Push any changes
git add .
git commit -m "Add deployment addresses and screenshots"
git push
```

---

## ESTIMATED TIMELINE

- Task 1 (Deploy): 30-40 min
- Task 2 (Verify): 10-15 min
- Task 3 (Vercel): 10-15 min
- Task 4 (Video): 10-15 min
- Task 5 (Screenshots): 5-10 min
- Task 6 (Diagram): 10-15 min
- Task 7 (Update Form): 5 min

**Total: ~90-110 minutes**

---

## 🚨 CRITICAL SUCCESS CRITERIA

✅ All tests pass: `npx hardhat test`
✅ Contracts deployed to Sepolia
✅ Contracts verified on Etherscan
✅ Frontend accessible at live URL
✅ Wallet connection works
✅ Token claiming works
✅ Cooldown error shows correctly
✅ Video demo uploaded and accessible
✅ All URLs filled in Partnr form

---

You can do this! Focus, execute quickly, and don't get stuck on any one task. Good luck! 🎉
