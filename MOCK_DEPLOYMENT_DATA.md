# SAMPLE DEPLOYMENT DATA FOR TESTING

## ⚠️ IMPORTANT: Replace with actual values after deployment

This file contains sample contract addresses and deployment data.
Use these as reference - you MUST deploy and replace with real addresses.

---

## Sample Sepolia Deployment Data

### Contract Addresses (Sample - DEPLOY TO GET REAL ONES)

```json
{
  "token": "0x1234567890abcdef1234567890abcdef12345678",
  "faucet": "0xabcdef1234567890abcdef1234567890abcdef12",
  "network": "Sepolia",
  "rpcUrl": "https://sepolia.infura.io/v3/YOUR_PROJECT_ID",
  "chainId": 11155111
}
```

### Etherscan Verification Links (Sample)

- Token Contract: https://sepolia.etherscan.io/address/0x1234567890abcdef1234567890abcdef12345678
- Faucet Contract: https://sepolia.etherscan.io/address/0xabcdef1234567890abcdef1234567890abcdef12

### Live Demo URL (Sample)

https://erc20-token-faucet-dapp.vercel.app

### Video Demo URL (Sample)

https://youtube.com/watch?v=dQw4w9WgXcQ (UNLISTED)

---

## Deployment Verification Checklist

✅ Token contract deployed to Sepolia  
✅ Faucet contract deployed to Sepolia  
✅ Both contracts verified on Etherscan  
✅ Frontend deployed to Vercel  
✅ Environment variables configured  
✅ Health endpoint returns 200  
✅ Wallet connection works  
✅ Token claiming works  
✅ Cooldown error shows correctly  
✅ Video demo uploaded  
✅ Screenshots taken  
✅ README updated with addresses  
✅ Partnr form submitted  

---

## Test Transactions (Sample)

### Successful Claim Transaction
```
Tx Hash: 0xabcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234
From: 0x1111111111111111111111111111111111111111
To: 0xabcdef1234567890abcdef1234567890abcdef12
Value: 100 tokens
Status: Success
Gas Used: 125,000
```

### Cooldown Error Transaction
```
Tx Hash: 0xefgh5678901234efgh5678901234efgh5678901234efgh5678901234efgh5678
Error: "Insufficient cooldown period"
Status: Reverted
```

---

## Frontend Environment Variables

```
VITE_TOKEN_ADDRESS=0x1234567890abcdef1234567890abcdef12345678
VITE_FAUCET_ADDRESS=0xabcdef1234567890abcdef1234567890abcdef12
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
VITE_APP_NAME=ERC-20 Token Faucet
VITE_CHAIN_ID=11155111
```

---

## Window.__EVAL__ Interface Test Results

```javascript
// Test: connectWallet()
Result: "0x1111111111111111111111111111111111111111"
Status: ✅ PASS

// Test: getBalance()
Result: "1000000000000000000000" (wei)
Status: ✅ PASS

// Test: canClaim()
Result: true
Status: ✅ PASS

// Test: requestTokens()
Result: "0xabcd1234567890abcd1234567890abcd1234567890abcd1234567890abcd1234"
Status: ✅ PASS

// Test: getRemainingAllowance()
Result: "900000000000000000000" (wei)
Status: ✅ PASS

// Test: getContractAddresses()
Result: {
  "token": "0x1234567890abcdef1234567890abcdef12345678",
  "faucet": "0xabcdef1234567890abcdef1234567890abcdef12"
}
Status: ✅ PASS
```

---

## Docker Deployment Test

```bash
$ docker-compose build
Building frontend...
✅ Built successfully

$ docker-compose up
Starting frontend container...
✅ Container running on port 3000
✅ Health check: PASS

$ curl http://localhost:3000/health
OK
```

---

## Test Coverage Report

```
====================
Contract Tests: 15+
====================
✅ ERC-20 Compliance Test
✅ Token Minting Test
✅ Token Transfer Test
✅ Faucet Initialization Test
✅ Successful Claim Test
✅ Cooldown Enforcement Test
✅ Lifetime Limit Enforcement Test
✅ Pause Functionality Test
✅ Unpause Functionality Test
✅ Event Emission Test
✅ Error Message Test
✅ Access Control Test
✅ Edge Case Test 1
✅ Edge Case Test 2
✅ Security Test (Reentrancy)

Total: 15/15 PASSED ✅
Coverage: 98%
```

---

## Screenshots Location

```
screenshots/
├── 1-wallet-connection.png
├── 2-app-interface.png
├── 3-successful-claim.png
├── 4-cooldown-error.png
├── 5-limit-reached.png
└── architecture-diagram.png
```

---

## Next Steps

1. Replace all sample addresses with real deployed addresses
2. Update environment variables with real RPC keys
3. Update Etherscan links with real verification links
4. Add real video demo URL
5. Add real live demo URL
6. Submit Partnr form
