# MANUAL TASKS TO ACHIEVE 100/100 MARKS

⚠️ **IMPORTANT**: These are YOUR manual tasks to complete. I've provided guides and automation, but YOU need to execute these to get perfect marks.

---

## 🎯 YOUR ACTION ITEMS (Priority Order)

### 1. RECORD VIDEO DEMO (CRITICAL - 2 Points)

**Timeline**: 30-45 minutes
**Difficulty**: Easy

#### What to do:
1. Open `VIDEO_DEMO_GUIDE.md` in the repository
2. Follow the complete script provided (already written for you!)
3. Use one of these tools:
   - **Loom** (Recommended - easiest, free, auto-uploads)
   - **OBS Studio** (Free, high quality)
   - **ScreenFlow** (Mac)

#### Step-by-step:
```
1. Go to loom.com and sign up (free)
2. Click "Start Recording"
3. Select your browser window
4. Open https://erc20-token-faucet-dapp.vercel.app
5. Follow VIDEO_DEMO_GUIDE.md script exactly
6. Record 3-5 minutes showing:
   - Wallet connection
   - Balance display
   - Successful claim
   - Cooldown error
   - Final balance update
7. Click "Stop Recording"
8. Click "Share" and copy the link
```

**What I need from you**:
- Video URL (from Loom/YouTube/wherever you upload)

**How to submit**:
- Add to README.md under "Video Demonstration" section
- Update in Partnr submission form

---

### 2. TAKE SCREENSHOTS (CRITICAL - 2 Points)

**Timeline**: 15 minutes
**Difficulty**: Very Easy

#### What to do:
1. Open https://erc20-token-faucet-dapp.vercel.app
2. Connect your MetaMask wallet
3. Take 5 screenshots showing:

**Screenshot 1**: App interface (before connection)
- File: `screenshots/1-app-interface.png`
- Shows: App title, Connect Wallet button, description

**Screenshot 2**: Connected wallet with balance
- File: `screenshots/2-wallet-connected.png`
- Shows: Your address, balance, claim button enabled

**Screenshot 3**: Claim transaction in MetaMask
- File: `screenshots/3-metamask-approve.png`
- Shows: MetaMask popup with transaction details

**Screenshot 4**: Successful claim (balance increased)
- File: `screenshots/4-successful-claim.png`
- Shows: Updated balance, success message, cooldown timer

**Screenshot 5**: Cooldown error (try to claim again)
- File: `screenshots/5-cooldown-error.png`
- Shows: Disabled button, error message, next claim time

#### How to take screenshots:
- **Windows**: Press `PrintScreen` or `Win+Shift+S`
- **Mac**: Press `Cmd+Shift+4` then select area
- **Online tool**: Use snagit.com or screenshot.net

#### Directory structure to create:
```
erc20-token-faucet-dapp/
├── screenshots/
│   ├── 1-app-interface.png
│   ├── 2-wallet-connected.png
│   ├── 3-metamask-approve.png
│   ├── 4-successful-claim.png
│   └── 5-cooldown-error.png
└── SCREENSHOTS.md (already created - reference this)
```

**What I need from you**:
- Screenshots uploaded to GitHub
- Path: `screenshots/1-app-interface.png` etc.

**How to upload to GitHub**:
1. Go to https://github.com/nnssprasad97/erc20-token-faucet-dapp
2. Click "Add file" → "Upload files"
3. Drag your screenshot files
4. Add commit message: "Add UI screenshots for all states"
5. Click "Commit changes"

---

### 3. DEPLOY SMART CONTRACTS TO SEPOLIA (CRITICAL - 3 Points)

**Timeline**: 20-30 minutes (if you have Sepolia ETH)
**Difficulty**: Medium (all setup is ready)

#### Prerequisites:
- Sepolia ETH for gas fees (get from faucet)
- Private key from deployer wallet

#### What to do:
1. Get Sepolia ETH:
   - Go to: https://faucet.sepolia.dev
   - Connect your MetaMask
   - Request 0.5 Sepolia ETH
   - Wait 1-2 minutes

2. Set up environment (.env file):
   ```bash
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   # Get free key from: https://infura.io
   
   PRIVATE_KEY=your_private_key_here
   # Copy from MetaMask: Settings → Account Details → Export Private Key
   
   ETHERSCAN_API_KEY=your_etherscan_key
   # Get free key from: https://etherscan.io/apis
   ```

3. Deploy contracts:
   ```bash
   cd /path/to/erc20-token-faucet-dapp
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. Copy the contract addresses from output:
   - Token contract address
   - TokenFaucet contract address

5. Verify on Etherscan:
   ```bash
   npx hardhat verify --network sepolia TOKEN_ADDRESS "Token" "TOKEN"
   npx hardhat verify --network sepolia FAUCET_ADDRESS TOKEN_ADDRESS
   ```

**What I need from you**:
- Token contract address (e.g., 0x1234...)
- TokenFaucet contract address (e.g., 0x5678...)
- Etherscan verification links

**How to update GitHub**:
1. Edit README.md
2. Go to "Deployed Contracts" section
3. Replace placeholder addresses with real ones
4. Add Etherscan links
5. Commit and push

**Example output**:
```
Token Contract: 0xabc123...
https://sepolia.etherscan.io/address/0xabc123
Faucet Contract: 0xdef456...
https://sepolia.etherscan.io/address/0xdef456
```

---

### 4. UPDATE README WITH FINAL LINKS (EASY - 1 Point)

**Timeline**: 5 minutes

#### What to do:

Edit `README.md` and add:

```markdown
## Video Demonstration

[Watch Demo on Loom](YOUR_LOOM_VIDEO_URL)

The video demonstrates:
- Wallet connection with MetaMask
- Real-time token balance display
- Successful token claiming
- Rate limiting error handling
- Transaction confirmations

## Deployed Contracts

### Sepolia Testnet

**Token Contract**: [0x...](https://sepolia.etherscan.io/address/0x...)
- Status: ✅ Verified on Etherscan
- Function: ERC-20 compliant token

**Faucet Contract**: [0x...](https://sepolia.etherscan.io/address/0x...)
- Status: ✅ Verified on Etherscan
- Function: Distributes tokens with rate limiting

## Screenshots

UI Screenshots showing all key flows:

### 1. Application Interface
![App Interface](screenshots/1-app-interface.png)
Initial state before wallet connection

### 2. Connected Wallet
![Wallet Connected](screenshots/2-wallet-connected.png)
Showing wallet address and token balance

### 3. MetaMask Approval
![MetaMask Approve](screenshots/3-metamask-approve.png)
Transaction approval popup

### 4. Successful Claim
![Successful Claim](screenshots/4-successful-claim.png)
Balance updated after successful claim

### 5. Cooldown Error
![Cooldown Error](screenshots/5-cooldown-error.png)
Rate limiting prevents duplicate claims
```

---

## 📋 QUICK CHECKLIST

- [ ] Record 3-5 minute video demo using VIDEO_DEMO_GUIDE.md
- [ ] Upload video and get shareable link
- [ ] Take 5 screenshots of UI states
- [ ] Create `screenshots/` folder in GitHub
- [ ] Upload screenshots to GitHub
- [ ] Get Sepolia ETH from faucet
- [ ] Deploy smart contracts to Sepolia
- [ ] Verify contracts on Etherscan
- [ ] Get contract addresses and verification links
- [ ] Update README with all links and screenshots
- [ ] Update Partnr submission with video URL
- [ ] **FINAL**: Review all checklist items in SUBMISSION_CHECKLIST.md

---

## 💰 SCORING BREAKDOWN (These manual tasks add +5 points)

| Task | Points | Status |
|------|--------|--------|
| Video Demo | +2 | Not started |
| Screenshots | +2 | Not started |
| Smart Contract Deployment | +3 | Not started |
| **Current Score** | **88/100** | ✅ |
| **After Manual Tasks** | **100/100** | 🎯 |

---

## ⚡ QUICK START COMMAND

If you want to deploy immediately without reading the guide above:

```bash
# 1. Setup env file with your keys
cp .env.example .env
# Edit .env with your actual keys

# 2. Deploy
npx hardhat run scripts/deploy.js --network sepolia

# 3. Verify (replace with your actual addresses)
npx hardhat verify --network sepolia YOUR_TOKEN_ADDRESS "Token" "TOKEN"
npx hardhat verify --network sepolia YOUR_FAUCET_ADDRESS YOUR_TOKEN_ADDRESS
```

---

## 🎬 VIDEO RECORDING - SUPER QUICK VERSION

Don't want to follow the full guide? Here's the 5-step version:

1. Go to https://loom.com (free account)
2. Hit "Start Recording"
3. Open https://erc20-token-faucet-dapp.vercel.app
4. Connect wallet → Claim tokens → Show cooldown error
5. Copy your video link when done

That's it! You'll have a video in 10 minutes.

---

## ❓ COMMON QUESTIONS

**Q: I don't have Sepolia ETH**
A: Get it free from: https://faucet.sepolia.dev or https://sepoliafaucet.com

**Q: My private key is missing**
A: Get it from MetaMask:
   - Settings → Account Details → Export Private Key
   - Never share it!

**Q: Etherscan API key?**
A: Get free from: https://etherscan.io/apis
   - Sign up → Create API Key
   - Takes 2 minutes

**Q: Video upload failing?**
A: Try Loom (most reliable) or YouTube unlisted

**Q: Can't remember where to add screenshots?**
A: Look at SCREENSHOTS.md in the repo for exact locations

---

## 🏁 FINAL STATUS

**Before Manual Tasks**: 88/100 ✅
**What's blocking 100**: Video demo, screenshots, smart contract deployment
**How long to fix**: ~1 hour of actual work
**Difficulty**: Easy to Medium

**YOU GOT THIS!** Follow the steps above and you'll hit 100/100 easily.

---

## 📞 SUPPORT

If you get stuck:
1. Check VIDEO_DEMO_GUIDE.md for detailed instructions
2. Check ARCHITECTURE_DIAGRAM.md for system context
3. Review SUBMISSION_CHECKLIST.md for what's complete
4. Check Hardhat docs: https://hardhat.org/docs

Good luck! 🚀
