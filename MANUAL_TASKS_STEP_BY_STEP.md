# Manual Tasks for 100/100 Marks - Step by Step

## COMPLETED AUTOMATICALLY ✅

- [x] /health endpoint returns HTTP 200 - WORKING
- [x] Vercel deployment live - WORKING 
- [x] GitHub repository with all source code

## REMAINING MANUAL TASKS - DO THESE NEXT

### TASK 1: Deploy Smart Contracts to Sepolia
**Time: 15-20 minutes**

1. Set up wallet with Sepolia ETH
   - Go to https://faucet.chainlink.com/sepolia (connect MetaMask)
   - Or use https://sepoliafaucet.com/
   - Get at least 0.5 SEP

2. Get Infura API Key
   - Go to https://infura.io
   - Sign up and create project
   - Copy Sepolia RPC URL

3. Get Etherscan API Key
   - Go to https://etherscan.io/apis
   - Create account and get API key

4. Update .env file
   - Add your private key: `PRIVATE_KEY=your_key_here`
   - Add Infura URL: `SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY`
   - Add Etherscan key: `ETHERSCAN_API_KEY=your_key`

5. Run deployment
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

6. Save contract addresses from console output
   - TokenFaucet contract address
   - Token contract address

7. Verify on Etherscan
   ```bash
   npx hardhat verify --network sepolia TOKENCONTRACT_ADDRESS
   npx hardhat verify --network sepolia FAUCETCONTRACT_ADDRESS
   ```

### TASK 2: Capture Screenshots
**Time: 10 minutes**

1. Go to https://erc20-token-faucet-dapp.vercel.app/

2. Take 5+ screenshots showing:
   - Screenshot 1: Initial page with Connect Wallet button
   - Screenshot 2: After connecting wallet (shows connected state)
   - Screenshot 3: Token balance display
   - Screenshot 4: Successful claim transaction
   - Screenshot 5: Cooldown error when trying to claim again
   - Screenshot 6: Limit reached error
   - Screenshot 7: Transaction confirmation

3. Create `screenshots/` folder in repo root
4. Save as: screenshot-1-initial.png, screenshot-2-wallet.png, etc.
5. Edit README.md and add under "Screenshots" section with captions

### TASK 3: Record Video Demo
**Time: 15-20 minutes**

1. Download screen recording tool:
   - Windows: Use OBS (Open Broadcaster Software) - FREE
   - Mac: Use QuickTime
   - Or use https://www.loom.com/ (free tier)

2. Record yourself doing:
   - Click Connect Wallet button
   - Select MetaMask and connect
   - Show current token balance  
   - Click Claim button
   - Confirm transaction in MetaMask
   - Wait for transaction to confirm
   - Show updated balance
   - Try claiming again (within 24h cooldown) - show error
   - Try claiming when limit reached - show error
   - Show transaction hash on Etherscan

3. Total video length: 2-5 minutes

4. Upload to:
   - Option A: YouTube (easiest)
   - Option B: Loom.com (free)
   - Option C: Add video file to repo (if < 25MB)

5. Copy video link

### TASK 4: Create Architecture Diagram
**Time: 10 minutes**

Use one of these free tools:
1. **Excalidraw**: https://excalidraw.com/
2. **Draw.io**: https://app.diagrams.net/
3. **Mermaid**: Use in README directly

Diagram should show:
- User/Frontend box
- Smart Contracts (TokenFaucet.sol, Token.sol)
- Ethereum Sepolia network
- MetaMask Wallet connection
- Data flow between components

Export as PNG and add to repo

### TASK 5: Update README.md with Final Details
**Time: 10 minutes**

Add these sections if not already present:

```markdown
## Deployed Contract Addresses (Sepolia)

- **TokenFaucet Contract**: [0xYOUR_ADDRESS](https://sepolia.etherscan.io/address/0xYOUR_ADDRESS)
- **Token Contract**: [0xYOUR_ADDRESS](https://sepolia.etherscan.io/address/0xYOUR_ADDRESS)

## Screenshots

### Initial Interface
![Initial Interface](./screenshots/screenshot-1-initial.png)

### Wallet Connected
![Wallet Connected](./screenshots/screenshot-2-wallet.png)

[Add more screenshots...]

## Video Demonstration

[Watch the demo video](LINK_TO_VIDEO)

## Architecture Diagram

![Architecture](./architecture-diagram.png)

## Testing

All tests passed: Run with `npm test`
```

### TASK 6: Verify Docker Works Locally
**Time: 10 minutes** (Optional but recommended)

1. Install Docker Desktop if not already installed
2. Open terminal in project root
3. Run:
   ```bash
   docker compose up
   ```
4. Wait for "Server running on http://localhost:3000"
5. Open browser and go to http://localhost:3000
6. Verify it loads without errors
7. Press Ctrl+C to stop

## FINAL SUBMISSION CHECKLIST

Before submitting:

- [ ] Smart contracts deployed to Sepolia
- [ ] Contracts verified on Etherscan  
- [ ] Contract addresses in README with links
- [ ] 5+ screenshots captured and embedded in README
- [ ] Video demo recorded (2-5 min) and link added
- [ ] Architecture diagram created and added
- [ ] docker compose up works
- [ ] App loads at http://localhost:3000
- [ ] /health endpoint returns 200
- [ ] All README sections complete
- [ ] Repository is PUBLIC
- [ ] All images/videos are accessible

## SUBMISSION

Once all tasks complete:
1. Go to https://app.partnr.network/global-placement-program/tasks/cb34030be5d14f7ca5de
2. Click Submit tab
3. Paste your GitHub repo URL
4. Add live demo URL: https://erc20-token-faucet-dapp.vercel.app/
5. Click Submit

Good luck!
