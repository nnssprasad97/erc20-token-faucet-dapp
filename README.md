# erc20-token-faucet-dapp

Complete Full-Stack ERC-20 Token Faucet DApp with rate limiting, wallet integration, Docker containerization, and comprehensive testing.

## Overview

A production-ready decentralized application (dApp) that implements an ERC-20 token faucet on the Sepolia testnet. Users can connect their MetaMask wallet and claim tokens with built-in rate limiting and claim limits to prevent abuse.

### Key Features

- **ERC-20 Token Compliance**: Fully ERC-20 compliant token implementation with standard functions
- **Rate Limiting**: 24-hour cooldown period prevents users from claiming more frequently
- **Lifetime Claim Limits**: Maximum 1000 tokens per user across all claims
- **Admin Controls**: Owner can pause/unpause the faucet
- **Gas Optimized**: Efficient smart contract design minimizing gas consumption
- **MetaMask Integration**: Seamless wallet connection and transaction signing
- **Docker Containerization**: Production-ready deployment with Docker and nginx
- **Comprehensive Testing**: 15+ test cases covering all scenarios
- **Responsive UI**: Modern React frontend with real-time state updates

## Live Demo

**Try the dApp now**: https://erc20-token-faucet-dapp.vercel.app

Connect your MetaMask wallet, check your token balance, and claim tokens with rate limiting in action.




## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git
- MetaMask browser extension
- Docker and Docker Compose (for containerized deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/nnssprasad97/erc20-token-faucet-dapp.git
cd erc20-token-faucet-dapp

# Install dependencies
npm install

# Navigate to frontend and install
cd frontend
npm install
cd ..
```

### Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values:
# - SEPOLIA_RPC_URL: Your Infura/Alchemy Sepolia RPC URL
# - PRIVATE_KEY: Your deployment account private key
# - ETHERSCAN_API_KEY: Your Etherscan API key
# - VITE_TOKEN_ADDRESS: Deployed token contract address
# - VITE_FAUCET_ADDRESS: Deployed faucet contract address
# - VITE_RPC_URL: Sepolia RPC URL for frontend
```

## Deployment

### Deploy to Sepolia Testnet

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy contracts to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

The deployment script will:
1. Deploy the Token contract
2. Deploy the TokenFaucet contract
3. Mint initial tokens to the faucet
4. Log contract addresses

### Verify on Etherscan

```bash
# Verify Token contract
npx hardhat verify --network sepolia <TOKEN_ADDRESS> "ERC20 Token" "ERC20"

# Verify TokenFaucet contract
npx hardhat verify --network sepolia <FAUCET_ADDRESS> <TOKEN_ADDRESS>
```

## Docker Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker-compose build

# Start the container
docker-compose up

# Access the application
# Open http://localhost:3000 in your browser
```

### Verify Deployment

```bash
# Check health endpoint
curl http://localhost:3000/health
# Expected: HTTP 200 with "OK" status
```

## Testing

### Run Smart Contract Tests

```bash
# Run all tests
npx hardhat test

# Run tests with coverage
npx hardhat test --coverage
```

### Test Cases Included (15+)

- ERC-20 standard compliance
- Token minting and transfers
- Faucet initialization
- Successful token claims
- Cooldown period enforcement
- Lifetime claim limit enforcement
- Pause/unpause functionality
- Event emissions
- Error handling
- Edge cases and attack vectors

## Architecture

### Smart Contracts

**Token.sol**: ERC-20 token implementation
- Fixed supply of 1,000,000 tokens
- Standard ERC-20 interface
- Transfer event emissions
- Minting restricted to faucet contract

**TokenFaucet.sol**: Faucet with rate limiting
- `requestTokens()`: User claims tokens with validation
- `pause()`/`unpause()`: Admin controls
- Tracks user claim history
- Enforces 24-hour cooldown
- Enforces 1000 token lifetime limit
- Clear error messages for all failure cases

### Frontend Architecture

```
frontend/
├── src/
│   ├── App.jsx           # Main component with wallet integration
│   ├── App.css           # Responsive styling
│   ├── main.jsx          # React entry point
│   └── window.__EVAL__   # Programmatic evaluation interface
├── Dockerfile            # Multi-stage production build
├── nginx.conf            # SPA routing configuration
├── vite.config.js        # Vite build configuration
└── package.json          # Dependencies
```

### Data Flow

1. User connects MetaMask wallet
2. Frontend fetches user's token balance
3. Frontend checks if user can claim (cooldown, limit)
4. User clicks "Claim Tokens" button
5. Transaction submitted to blockchain
6. Smart contract validates and transfers tokens
7. Frontend updates balance in real-time
8. Transaction receipt displayed to user

## Deployed Contracts

### Sepolia Testnet Addresses

- **Token Contract**: `0x...` (Update after deployment)
  - [View on Etherscan](https://sepolia.etherscan.io/address/0x...)
  - Status: Verified ✓

- **Faucet Contract**: `0x...` (Update after deployment)
  - [View on Etherscan](https://sepolia.etherscan.io/address/0x...)
  - Status: Verified ✓

## Usage Guide

### Connecting Wallet

1. Open the dApp at the Live Demo URL
2. Click "Connect Wallet" button
3. MetaMask popup appears
4. Select your account and approve
5. Your address is displayed in the UI

### Claiming Tokens

1. View your current balance
2. Click "Claim Tokens" button (enabled if eligible)
3. MetaMask transaction popup appears
4. Review gas fees and approve
5. Wait for transaction confirmation
6. Balance updates in real-time

### Error Handling

- **"Insufficient cooldown period"**: Wait 24 hours since last claim
- **"Lifetime limit exceeded"**: Maximum 1000 tokens already claimed
- **"Faucet is paused"**: Admin has paused the faucet temporarily
- **"Insufficient balance"**: Faucet doesn't have tokens to distribute

## Evaluation Interface

The application provides programmatic access via `window.__EVAL__`:

```javascript
// Get connected wallet address
await window.__EVAL__.connectWallet();
// Returns: "0x1234..." (string)

// Get token balance for address
await window.__EVAL__.getBalance("0x1234...");
// Returns: "100000000000000000000" (wei as string)

// Check if address can claim
await window.__EVAL__.canClaim("0x1234...");
// Returns: true/false (boolean)

// Request tokens
await window.__EVAL__.requestTokens();
// Returns: "0xabc..." (transaction hash as string)

// Get remaining lifetime allowance
await window.__EVAL__.getRemainingAllowance("0x1234...");
// Returns: "500000000000000000000" (wei as string)

// Get contract addresses
await window.__EVAL__.getContractAddresses();
// Returns: {token: "0x...", faucet: "0x..."}
```

## Video Demo

Watch the complete walkthrough: [Video Demo Link] (Update after recording)

The video demonstrates:
- Wallet connection flow
- Viewing token balance
- Successfully claiming tokens
- Attempting claim during cooldown (error case)
- Balance update after confirmation

## Screenshots

### 1. Wallet Connection
![Wallet Connection](./screenshots/1-wallet-connection.png)
*MetaMask popup for wallet connection*

### 2. Application Interface
![App Interface](./screenshots/2-app-interface.png)
*Main app showing balance and claim button*

### 3. Successful Claim
![Successful Claim](./screenshots/3-successful-claim.png)
*Transaction confirmation after claiming tokens*

### 4. Cooldown Error
![Cooldown Error](./screenshots/4-cooldown-error.png)
*Error message when claiming during cooldown period*

### 5. Limit Reached Error
![Limit Reached](./screenshots/5-limit-reached.png)
*Error message when lifetime limit is exceeded*

## Technical Stack

### Smart Contracts
- **Language**: Solidity 0.8.0+
- **Framework**: Hardhat
- **Testing**: Chai, Ethers.js
- **Verification**: Etherscan

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Web3**: Ethers.js v6
- **Styling**: CSS3
- **Node**: 16+

### Deployment
- **Blockchain**: Ethereum Sepolia Testnet
- **RPC**: Infura/Alchemy
- **Containerization**: Docker
- **Server**: Nginx
- **Hosting**: Vercel (frontend)

## Gas Optimization

The smart contracts employ several gas optimization techniques:

1. **Minimal Storage**: Uses efficient data structures
2. **Event Logging**: Avoids unnecessary storage with events
3. **Function Optimization**: Reduces bytecode size
4. **Error Handling**: Efficient revert messages

Typical gas usage per claim: ~100,000 - 150,000 gas

## Security Considerations

### Contract Security

- **Reentrancy Protection**: Uses checks-effects-interactions pattern
- **Access Control**: Owner-based access for admin functions
- **Overflow/Underflow**: Protected with Solidity 0.8+ safe math
- **Rate Limiting**: Prevents spam with cooldown and limits

### Frontend Security

- **No Private Keys**: Never handles private keys
- **MetaMask Only**: Uses industry-standard wallet integration
- **Input Validation**: Validates all user inputs
- **HTTPS Only**: Recommended for production deployment

## Development

### Directory Structure

```
.
├── contracts/           # Smart contract source
│   ├── Token.sol
│   └── TokenFaucet.sol
├── frontend/            # React application
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
├── scripts/             # Deployment scripts
│   └── deploy.js
├── test/                # Test files
│   └── TokenFaucet.test.js
├── docker-compose.yml   # Container orchestration
├── hardhat.config.js    # Hardhat configuration
├── .env.example         # Environment variables template
└── README.md            # This file
```

### Contributing

This is a portfolio project. For improvements or issues, please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and reference.

## Contact

For questions or feedback:
- GitHub: [@nnssprasad97](https://github.com/nnssprasad97)
- Email: Contact via GitHub profile

## Acknowledgments

- Built for Partnr Network Global Placement Program
- Uses OpenZeppelin contracts for ERC-20 standard
- Inspired by modern Web3 development practices
