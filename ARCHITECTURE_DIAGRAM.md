# System Architecture Diagram

Comprehensive architecture of the ERC-20 Token Faucet DApp with all component interactions.

## Overall System Architecture

```mermaid
graph TB
    User["👤 User<br/>(Browser)"] -->|MetaMask| WalletExt["🔐 MetaMask<br/>Extension"]
    WalletExt -->|Web3 RPC| Sepolia["Ethereum Sepolia<br/>Testnet"]
    
    subgraph Frontend["Frontend Layer - React + Vite"]
        App["App.jsx<br/>Main Component"] -->|State| Balance["Balance State"]
        App -->|Hooks| MetaMask["useMetaMask<br/>Hook"]
        App -->|Web3| Ethers["Ethers.js<br/>Library"]
        MetaMask -->|Manage| Account["Account<br/>Management"]
        Ethers -->|Contract| ABIs["Smart Contract<br/>ABIs"]
    end
    
    subgraph Contracts["Smart Contracts - Solidity"]
        Token["🪙 Token.sol<br/>ERC-20 Implementation<br/>- totalSupply: 1M<br/>- mint(): Faucet only<br/>- transfer(): Standard"]
        Faucet["💧 TokenFaucet.sol<br/>Rate Limiting<br/>- requestTokens()<br/>- pause/unpause()<br/>- Rate limit check<br/>- Lifetime limit check"]
        Token -.->|Mints Tokens| Faucet
        Faucet -->|Transfers| User
    end
    
    subgraph Infrastructure["Deployment Infrastructure"]
        Vercel["🚀 Vercel CDN<br/>Frontend Hosting<br/>- erc20-token-faucet-dapp.vercel.app<br/>- Auto-deploys main branch<br/>- Custom domain"]
        Docker["🐳 Docker Container<br/>- Node.js base<br/>- Vite build<br/>- Nginx server<br/>- /health endpoint"]
        Etherscan["🔍 Etherscan<br/>Contract Verification<br/>& Explorer"]
    end
    
    Frontend -->|API Calls| Contracts
    Contracts -->|Deployed on| Sepolia
    Frontend -->|Deploys to| Vercel
    Frontend -->|Docker image| Docker
    Contracts -->|Verify on| Etherscan
    User -->|Access| Vercel
    User -->|Docker localhost| Docker
    
    style User fill:#e1f5ff
    style WalletExt fill:#fff3e0
    style Sepolia fill:#f3e5f5
    style Frontend fill:#e8f5e9
    style Contracts fill:#fce4ec
    style Infrastructure fill:#fff9c4
```

## Frontend Component Architecture

```mermaid
graph LR
    subgraph Components["React Components"]
        App["App.jsx"]
        WalletBtn["Wallet Connect<br/>Button"]
        BalanceDisplay["Balance<br/>Display"]
        ClaimBtn["Claim Tokens<br/>Button"]
        ErrorMsg["Error Message<br/>Display"]
        TxStatus["Transaction<br/>Status"]
    end
    
    subgraph State["State Management"]
        Account["Connected Account"]
        Balance["User Balance"]
        CanClaim["Claim Eligibility"]
        PendingTx["Pending Transaction"]
        Error["Error State"]
    end
    
    subgraph Web3["Web3 Integration"]
        Provider["Provider<br/>(Ethers.js)"]
        Token["Token Contract<br/>Instance"]
        Faucet["Faucet Contract<br/>Instance"]
        Signer["User Signer<br/>(MetaMask)"]
    end
    
    App -->|Manages| State
    App -->|Uses| Components
    Components -->|Update| State
    Web3 -->|Read/Write| Contracts["Smart Contracts"]
    App -->|Initializes| Web3
    Signer -->|Sign Transactions| Faucet
    
    style Components fill:#c8e6c9
    style State fill:#bbdefb
    style Web3 fill:#ffe0b2
```

## Smart Contract Interaction Flow

```mermaid
sequenceDiagram
    participant User as User<br/>(MetaMask)
    participant Frontend as Frontend<br/>(React)
    participant Faucet as TokenFaucet<br/>Contract
    participant Token as Token<br/>Contract
    participant Blockchain as Sepolia<br/>Blockchain
    
    User->>Frontend: Click "Connect Wallet"
    Frontend->>User: Request wallet connection
    User->>Frontend: Approve connection
    Frontend->>Frontend: Store account address
    
    User->>Frontend: View balance
    Frontend->>Token: balanceOf(userAddress)
    Token->>Blockchain: Read user balance
    Blockchain->>Token: Return balance
    Token->>Frontend: Return balance in wei
    Frontend->>Frontend: Display balance to user
    
    User->>Frontend: Click "Claim Tokens"
    Frontend->>Faucet: canClaim(userAddress)
    Faucet->>Blockchain: Check lastClaimTime
    Faucet->>Blockchain: Check totalClaimed
    Blockchain->>Faucet: Return claim status
    Faucet->>Frontend: Return true/false
    
    alt Can Claim
        Frontend->>Frontend: Enable claim button
        User->>Frontend: Confirm claim
        Frontend->>User: MetaMask popup
        User->>User: Review & sign transaction
        User->>Faucet: Send signed transaction
        Faucet->>Faucet: Validate request
        Faucet->>Token: transfer(user, 100 tokens)
        Token->>Token: Update balances
        Token->>Blockchain: Emit Transfer event
        Blockchain->>Frontend: Transaction confirmed
        Frontend->>Frontend: Update UI
        Frontend->>User: Show success message
    else Cannot Claim
        Faucet->>Frontend: Return error reason
        Frontend->>Frontend: Display error
        Frontend->>User: Show cooldown/limit message
    end
```

## Data Flow Diagram

```mermaid
graph TD
    MetaMask["MetaMask<br/>Wallet"] -->|Account| App["React App"]
    MetaMask -->|RPC Requests| Sepolia["Sepolia RPC<br/>Node"]
    
    App -->|Read Balance| Token["Token Contract<br/>balanceOf()"]
    App -->|Check Eligibility| Faucet["Faucet Contract<br/>canClaim()"]
    App -->|Send TX| Faucet
    
    Token -->|State| Blockchain["Blockchain<br/>State"]
    Faucet -->|State| Blockchain
    
    Blockchain -->|Events| Sepolia
    Sepolia -->|Updates| App
    
    App -->|Display| UI["User Interface<br/>- Balance<br/>- Status<br/>- Errors"]
    UI -->|User Interacts| MetaMask
    
    style MetaMask fill:#fff3cd
    style App fill:#d1ecf1
    style Token fill:#f8d7da
    style Faucet fill:#d4edda
    style Blockchain fill:#e2e3e5
    style UI fill:#cfe2ff
```

## Deployment Architecture

```mermaid
graph LR
    GitHub["GitHub<br/>Repository<br/>main branch"] -->|Auto Deploy| Vercel["Vercel<br/>Platform<br/>erc20-token-faucet-dapp.vercel.app"]
    
    GitHub -->|Docker Build| DockerImg["Docker Image<br/>node:20-alpine<br/>+ Vite build<br/>+ Nginx server"]
    DockerImg -->|Run Container| LocalHost["Local Deployment<br/>http://localhost:3000<br/>docker-compose up"]
    
    GitHub -->|Deploy Scripts| Hardhat["Hardhat<br/>Contract Deployment<br/>Sepolia Testnet"]
    Hardhat -->|Deploy| Contracts["Smart Contracts<br/>on Sepolia"]
    Contracts -->|Verify| Etherscan["Etherscan<br/>Contract Explorer"]
    
    Vercel -->|Serves| Browser["User Browser<br/>Live Demo"]
    LocalHost -->|Serves| Browser
    Browser -->|Connects| MetaMask["MetaMask<br/>Wallet Extension"]
    MetaMask -->|RPC Call| Contracts
    
    style GitHub fill:#f0f0f0
    style Vercel fill:#4f46e5
    style DockerImg fill:#2496ed
    style LocalHost fill:#4fc3f7
    style Hardhat fill:#ffa726
    style Contracts fill:#ef5350
    style Etherscan fill:#00897b
    style Browser fill:#7e57c2
```

## Technology Stack

```mermaid
graph TB
    subgraph Smart_Contracts["Smart Contracts"]
        Lang["Solidity 0.8.20"]
        Framework["Hardhat Framework"]
        Testing["Chai + Ethers.js"]
    end
    
    subgraph Frontend_Stack["Frontend Stack"]
        React["React 18+"]
        Vite["Vite Build Tool"]
        Ethers["Ethers.js v6"]
        CSS["CSS3 Responsive"]
    end
    
    subgraph Deployment["Deployment Stack"]
        Docker["Docker Containerization"]
        Nginx["Nginx Web Server"]
        Vercel["Vercel Hosting"]
    end
    
    subgraph Infrastructure["Infrastructure"]
        Sepolia["Sepolia Testnet"]
        RPC["Infura/Alchemy RPC"]
        Etherscan["Etherscan API"]
    end
    
    style Smart_Contracts fill:#ffe0b2
    style Frontend_Stack fill:#bbdefb
    style Deployment fill:#c8e6c9
    style Infrastructure fill:#f8bbd0
```

## Key Design Patterns

### 1. Smart Contract Security Pattern
```
Checks → Effects → Interactions (CEI)

1. Check user eligibility
   - Cooldown period enforced
   - Lifetime limit not exceeded
   - Faucet not paused

2. Update contract state
   - Record last claim time
   - Update total claimed amount
   - Update user balance

3. Interact with external contracts
   - Token.transfer() called last
   - Ensures state consistency
```

### 2. Frontend State Management
```
MetaMask Provider → Web3 Instance → Contract Instances
                           ↓
                    React State
                    ↓
              UI Components Update
                    ↓
              User sees real-time updates
```

### 3. Rate Limiting Pattern
```
User claims tokens
    ↓
Faucet checks: lastClaimTime[user] + 24 hours > now?
    ↓
  YES: Reject with cooldown error
  NO: Check lifetime limit
    ↓
Check: totalClaimed[user] + 100 <= 1000?
    ↓
  YES: Execute transfer
  NO: Reject with limit exceeded error
```

## Error Handling Flow

```mermaid
graph TD
    A["User Action"] -->|Validate| B{"Check Conditions"}
    B -->|MetaMask Issues| C["Wallet Error"]
    B -->|Network Issues| D["Network Error"]
    B -->|Contract Logic| E{"Contract Check"}
    E -->|Cooldown| F["Cooldown Error<br/>Wait 24 hours"]
    E -->|Limit| G["Limit Error<br/>Max 1000 tokens"]
    E -->|Paused| H["Paused Error<br/>Try later"]
    E -->|Success| I["Execute Transaction"]
    I -->|Failed| J["TX Failed"]
    I -->|Success| K["Update Balance"]
    
    C --> L["Display Error<br/>to User"]
    D --> L
    F --> L
    G --> L
    H --> L
    J --> L
    K --> M["Show Success<br/>Message"]
    
    style M fill:#c8e6c9
    style L fill:#ffcdd2
```

## Summary

The ERC-20 Token Faucet DApp uses a **3-tier architecture**:

1. **Blockchain Layer**: Smart contracts on Sepolia testnet handling token logic
2. **Frontend Layer**: React application with MetaMask integration for user interaction
3. **Deployment Layer**: Vercel for cloud hosting and Docker for local deployment

All components communicate through Web3 interfaces, ensuring secure and decentralized token distribution with rate limiting and claim management.
