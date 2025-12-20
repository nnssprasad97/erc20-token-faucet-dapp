# Vercel Deployment

## Live Application

**Live Demo URL**: https://erc20-token-faucet-dapp.vercel.app

**Production Domain**: erc20-token-faucet-dapp.vercel.app

## Deployment Details

- **Platform**: Vercel
- **Repository**: https://github.com/nnssprasad97/erc20-token-faucet-dapp
- **Branch**: main
- **Root Directory**: frontend
- **Framework**: Vite + React
- **Build Command**: `npm run build`
- **Output Directory**: dist

## Deployment Status

✅ **Deployed and Live**
- Deployment URL: erc20-token-faucet-dapp-320sv3j7q.vercel.app
- Custom Domain: erc20-token-faucet-dapp.vercel.app
- Status: Ready
- Last Deployment: December 19, 2025

## How to Access the Live Application

1. Open your browser and navigate to: https://erc20-token-faucet-dapp.vercel.app
2. You'll see the ERC-20 Token Faucet DApp
3. Connect your MetaMask wallet
4. Check your token balance
5. Claim tokens (subject to rate limiting)

## Frontend Features Available in Live Demo

- ✅ MetaMask wallet connection
- ✅ Real-time token balance display
- ✅ Token claiming functionality
- ✅ Rate limiting enforcement (24-hour cooldown)
- ✅ Lifetime claim limit display
- ✅ Error state handling
- ✅ Transaction confirmation flows
- ✅ Responsive UI design
- ✅ window.__EVAL__ programmatic interface

## Smart Contracts

Note: Smart contracts are deployed on Sepolia testnet. The frontend connects to deployed contract addresses configured in environment variables:

- **VITE_TOKEN_ADDRESS**: ERC-20 Token contract address
- **VITE_FAUCET_ADDRESS**: TokenFaucet contract address
- **VITE_RPC_URL**: Sepolia RPC endpoint

## Verification Steps

### 1. Test the Live Application
```
1. Visit https://erc20-token-faucet-dapp.vercel.app
2. MetaMask should recognize Sepolia network
3. Click "Connect Wallet"
4. View your token balance
5. Attempt to claim tokens
```

### 2. Verify Deployment Health
```
curl https://erc20-token-faucet-dapp.vercel.app/health
```
Expected response: HTTP 200 (or application loads successfully)

### 3. Test Evaluation Interface
```javascript
// Open browser console and test programmatic functions
await window.__EVAL__.connectWallet();
await window.__EVAL__.getBalance("0x...");
await window.__EVAL__.canClaim("0x...");
await window.__EVAL__.getContractAddresses();
```

## Deployment Configuration

### Environment Variables Required

These should be configured in Vercel project settings:

```
VITE_TOKEN_ADDRESS=0x...
VITE_FAUCET_ADDRESS=0x...
VITE_RPC_URL=https://sepolia.infura.io/v3/...
```

### Build and Deployment Process

1. **Source**: GitHub repository main branch
2. **Trigger**: Automatic on push to main
3. **Build**: Vite builds React application
4. **Output**: Static files served via CDN
5. **Routing**: SPA routing configured via nginx-style rules

## Docker Alternative

The application can also be deployed locally via Docker:

```bash
docker-compose build
docker-compose up
# Application available at http://localhost:3000
```

## Testing the Live Application

### Prerequisites
- MetaMask browser extension installed
- Sepolia testnet added to MetaMask
- Some Sepolia ETH for gas fees (can be obtained from faucets)

### Test Scenarios

1. **Successful Token Claim**
   - Connect wallet
   - Click "Claim Tokens"
   - Approve transaction in MetaMask
   - Observe balance update

2. **Rate Limiting**
   - Claim tokens successfully
   - Wait (or try immediately)
   - Observe cooldown error message

3. **Lifetime Limit**
   - Claim tokens multiple times
   - After 1000 tokens claimed
   - Observe limit exceeded error

## Troubleshooting

### Application not loading
- Check network connection
- Clear browser cache
- Try incognito/private mode

### MetaMask connection fails
- Ensure MetaMask is installed
- Check Sepolia network is added
- Verify wallet has sufficient balance

### Transactions fail
- Check Sepolia ETH balance
- Verify contract addresses in environment
- Check network gas prices

## Support and Documentation

See the main README.md for:
- Complete architecture documentation
- Smart contract details
- Testing instructions
- Security considerations
- Evaluation interface documentation
