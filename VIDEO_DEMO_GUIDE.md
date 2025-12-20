# Video Demo Guide

## Complete Script for 3-5 Minute Demo Video

This guide provides a step-by-step script to record a professional demo of the ERC-20 Token Faucet DApp.

### Recording Tools (Recommended)
- **Loom** (loom.com) - Easiest, free, auto-uploads
- **OBS Studio** (obs-project.com) - Free, high quality
- **ScreenFlow** (Mac only)
- **Camtasia** (Paid but professional)

---

## Demo Script (3-4 minutes)

### Opening (0:00 - 0:30)

**Narrator/Text Overlay:**
"Welcome to the ERC-20 Token Faucet DApp - a decentralized application for claiming tokens with rate limiting and security. Let me show you how it works."

**Visual:**
- Show the Vercel deployment URL: `https://erc20-token-faucet-dapp.vercel.app`
- Open the live application in browser

---

### Section 1: Application Interface (0:30 - 1:00)

**Narrator:**
"Here's the main interface. You can see the ERC-20 Token Faucet header, a wallet connection button, and information about the faucet."

**Visual Actions:**
1. Show the app interface
2. Highlight the "Connect Wallet" button
3. Point out the application title and description
4. Show that no wallet is currently connected

---

### Section 2: Connect MetaMask (1:00 - 1:30)

**Narrator:**
"First, let's connect our MetaMask wallet to the application. Click the Connect Wallet button."

**Visual Actions:**
1. Click "Connect Wallet" button
2. MetaMask popup appears
3. **NARRATOR:** "MetaMask requests permission to connect. I'll select an account and click Connect."
4. Click "Connect" in MetaMask popup
5. Show MetaMask approval
6. Application now shows connected account address and balance

**Result Display:**
- Wallet address displays (e.g., "0x1234...5678")
- Current token balance shows (e.g., "Balance: 0 tokens" or some amount if you have tokens)

---

### Section 3: Check Balance and Claim Eligibility (1:30 - 2:00)

**Narrator:**
"The application now shows our connected wallet. You can see:
- Your wallet address
- Your current token balance
- Whether you're eligible to claim tokens
- How many tokens you can claim"

**Visual Actions:**
1. Point to wallet address display
2. Point to balance display
3. Point to claim button status
   - If eligible: Button is green and enabled ("Claim Tokens")
   - If not eligible: Button is disabled (red) with cooldown message

**Visual Highlighting:**
```
Connected Wallet: 0x1234...5678
Your Balance: 0 FAUCET tokens
Status: ✓ Eligible to claim (or ✗ Cooldown active)
Next claim available: [timestamp]
```

---

### Section 4: Successful Token Claim (2:00 - 3:00)

**Narrator:**
"Now let's claim some tokens. I'll click the 'Claim Tokens' button."

**Visual Actions:**
1. Click "Claim Tokens" button
2. Show MetaMask popup asking to confirm transaction
   - **Narrator:** "MetaMask shows the transaction details. I need to review the gas fee and approve the transaction."
3. Show transaction details in MetaMask (to address, amount, gas fee)
4. Click "Confirm" in MetaMask popup

**Transaction Pending State:**
- App shows "Transaction pending..." or loading spinner
- **Narrator:** "The transaction is being processed on the blockchain."

**Success State (wait for confirmation):**
1. Transaction confirms
2. App updates showing:
   - New token balance (increased)
   - Success message: "✓ Claim successful!"
   - Transaction hash link
   - New cooldown timer showing next claim time

**Narrator:**
"Success! The transaction has been confirmed. Our balance has increased by 100 tokens, and we can see a cooldown timer showing when we can claim next - in 24 hours."

---

### Section 5: Error Handling - Cooldown (3:00 - 3:30)

**Narrator:**
"Now let's see what happens if we try to claim again while the cooldown period is active."

**Visual Actions:**
1. Try to click "Claim Tokens" button again
2. Show that button is disabled (greyed out)
3. Show error message: "❌ Cooldown Error: You must wait 24 hours between claims"
4. Show remaining cooldown timer

**Narrator:**
"As expected, the claim button is disabled because we've reached the 24-hour cooldown limit. The app clearly shows the error and when we can claim again."

---

### Section 6: Contract Details & Security (3:30 - 4:00)

**Narrator:**
"Let's look at some key features of this DApp:
1. **Rate Limiting**: Users can only claim once every 24 hours
2. **Lifetime Limits**: Maximum 1000 tokens per user
3. **Blockchain Verified**: All transactions are on Sepolia testnet
4. **Smart Contract Secured**: Using OpenZeppelin libraries"

**Visual Actions:**
1. Show the app's information section
2. Point out the rate limiting indicators
3. Show the lifetime claim limit display
4. Mention the Etherscan links available

---

### Section 7: Closing (4:00 - 4:30)

**Narrator:**
"That's the ERC-20 Token Faucet DApp in action! Here's what we demonstrated:
✓ Connecting MetaMask wallet
✓ Viewing token balance
✓ Claiming tokens successfully
✓ Rate limiting enforcement
✓ Real-time balance updates

The application is live at: https://erc20-token-faucet-dapp.vercel.app

For more details, check the GitHub repository."

**Visual:**
- Show the live demo URL
- Show GitHub repo link
- End with application screenshot

---

## Key Points to Highlight in Video

✓ **MetaMask Integration**: Smooth wallet connection
✓ **Real-time Updates**: Balance updates immediately
✓ **Error Handling**: Clear error messages for edge cases
✓ **Blockchain Interaction**: Transaction visibility
✓ **Rate Limiting**: Prevents spam/abuse
✓ **Responsive UI**: Works on different screen sizes

---

## Recording Tips

### Before Recording
1. Clear your browser tabs - show only the app
2. Make sure Sepolia network is selected in MetaMask
3. Ensure you have Sepolia ETH for gas fees
4. Test MetaMask connections
5. Have an account with 0 balance or recent claim cooldown
6. Adjust zoom to 125-150% for better visibility

### During Recording
1. **Speak clearly** - Audio quality matters
2. **Move slowly** - Give viewers time to see what you're doing
3. **Pause between actions** - 2-3 seconds of pause helps comprehension
4. **Point to elements** - Use cursor highlight or arrow annotations
5. **Add text overlays** - Highlight important information
6. **Show full URLs** - Make repo and demo links visible

### Audio Narration Script Template
```
"[PAUSE] Welcome to the ERC-20 Token Faucet DApp.

This is a blockchain-based application that distributes tokens 
with built-in rate limiting to prevent abuse.

Let me walk you through the key features [PAUSE]

First, wallet connection... [ACTION]

Second, token claiming... [ACTION]

Third, rate limiting... [ACTION]

Thanks for watching! Check the GitHub repo for more details."
```

---

## Where to Upload

### Option 1: YouTube
- Title: "ERC-20 Token Faucet DApp - Live Demo"
- Description:
  ```
  Live demonstration of the ERC-20 Token Faucet DApp
  
  Repository: https://github.com/nnssprasad97/erc20-token-faucet-dapp
  Live Demo: https://erc20-token-faucet-dapp.vercel.app
  
  Features:
  - MetaMask wallet integration
  - 24-hour rate limiting
  - Lifetime claim limits (1000 tokens)
  - Real-time balance updates
  - Sepolia testnet deployment
  ```
- Tags: blockchain, dapp, ethereum, erc20, web3, demo
- Make it unlisted or public (public for better visibility)

### Option 2: Loom
- Automatically gets a shareable link
- Click "Share" and copy the link
- Add link to GitHub README

### Option 3: GitHub Repository
- Create a `videos/` directory
- Upload the video file (if under 100MB)
- Or link to external video URL

---

## Adding Video Link to README

Add to your README.md:
```markdown
## Video Demonstration

Watch the complete demo: [ERC-20 Token Faucet Demo](https://youtube.com/watch?v=...)

The video shows:
- Wallet connection flow
- Token claiming with MetaMask
- Rate limiting in action
- Real-time balance updates
- Error handling
```

---

## Timing Guide

| Segment | Start | Duration | Content |
|---------|-------|----------|----------|
| Opening | 0:00 | 0:30 | Introduction & context |
| Interface | 0:30 | 0:30 | Show the app UI |
| Wallet Connection | 1:00 | 0:30 | Connect MetaMask |
| Balance Check | 1:30 | 0:30 | Review balance & eligibility |
| Token Claim | 2:00 | 1:00 | Successful claim transaction |
| Cooldown Error | 3:00 | 0:30 | Show rate limiting |
| Security | 3:30 | 0:30 | Highlight features |
| Closing | 4:00 | 0:30 | Summary & links |
| **Total** | | **~4:00** | |

---

## Quality Checklist

- [ ] Audio is clear and at good volume
- [ ] Screen is at readable zoom level (125%+)
- [ ] No background distractions
- [ ] Smooth transitions between actions
- [ ] All URLs are clearly visible
- [ ] Narration matches on-screen actions
- [ ] Video is 3-5 minutes long
- [ ] Final video is exported in good quality (720p minimum)
- [ ] Link is shared in README

---

## What NOT to Show

❌ Your actual private keys or seed phrases
❌ Real mainnet transactions (use Sepolia only)
❌ Personal information
❌ Account sensitive details beyond first transaction

---

## Final Checklist Before Submitting

1. Video is uploaded and link is publicly accessible
2. Link is added to README.md
3. Video clearly shows all required functionality
4. Audio is clear and professional
5. Total duration is 3-5 minutes
6. All code/addresses are visible in video
