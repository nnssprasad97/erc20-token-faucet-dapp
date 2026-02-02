import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import deploymentConfig from './addresses.json';

const FAUCET_ABI = [
  'function requestTokens() public',
  'function getBalance(address) public view returns (uint256)',
  'function getLastClaimTime(address) public view returns (uint256)',
  'function getClaimAmount() public view returns (uint256)',
  'function getCooldownPeriod() public view returns (uint256)',
  'function getMaxClaims() public view returns (uint256)',
  'function getUserClaimCount(address) public view returns (uint256)',
  'function isPaused() public view returns (bool)',
  'event TokensClaimed(address indexed user, uint256 amount, uint256 timestamp)'
];

const TOKEN_ABI = [
  'function balanceOf(address) public view returns (uint256)',
  'function decimals() public view returns (uint8)',
  'function approve(address spender, uint256 amount) public returns (bool)'
];

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [faucetAddress, setFaucetAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [claimAmount, setClaimAmount] = useState('0');
  const [cooldownPeriod, setCooldownPeriod] = useState('0');
  const [lastClaimTime, setLastClaimTime] = useState('0');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    initializeWeb3();
  }, []);

  const initializeWeb3 = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Get connected accounts
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const signer = await provider.getSigner();
          setSigner(signer);
          await updateFaucetData(provider, accounts[0]);
        }
      } catch (error) {
        console.error('Failed to initialize Web3:', error);
      }
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setAccount(accounts[0]);
      setProvider(provider);
      setSigner(signer);
      setMessage('Wallet connected successfully!');

      await updateFaucetData(provider, accounts[0]);
    } catch (error) {
      setMessage('Failed to connect wallet');
    }
  };

  const updateFaucetData = async (provider, userAccount) => {
    try {
      let faucetAddr = process.env.REACT_APP_FAUCET_ADDRESS || '';
      let tokenAddr = process.env.REACT_APP_TOKEN_ADDRESS || '';

      // Fallback to addresses.json if env vars are missing
      if (!faucetAddr || !tokenAddr) {
        // Check if deployment configuration exists (e.g. from local deployment)
        if (deploymentConfig && deploymentConfig.faucetAddress && deploymentConfig.tokenAddress) {
          faucetAddr = deploymentConfig.faucetAddress;
          tokenAddr = deploymentConfig.tokenAddress;
        }
      }

      if (faucetAddr && tokenAddr) {
        setFaucetAddress(faucetAddr);
        setTokenAddress(tokenAddr);

        // Fetch token balance
        const tokenContract = new ethers.Contract(tokenAddr, TOKEN_ABI, provider);
        const balance = await tokenContract.balanceOf(userAccount);
        const decimals = await tokenContract.decimals();
        setBalance(ethers.formatUnits(balance, decimals));

        // Fetch faucet data
        const faucetContract = new ethers.Contract(faucetAddr, FAUCET_ABI, provider);
        const claimAmount = await faucetContract.getClaimAmount();
        const cooldown = await faucetContract.getCooldownPeriod();
        const lastClaim = await faucetContract.getLastClaimTime(userAccount);
        const paused = await faucetContract.isPaused();

        setClaimAmount(ethers.formatUnits(claimAmount, decimals));
        setCooldownPeriod(cooldown.toString());
        setLastClaimTime(lastClaim.toString());
        setIsPaused(paused);
      }
    } catch (error) {
      console.error('Error updating faucet data:', error);
    }
  };

  const claimTokens = async () => {
    if (!signer || !account) {
      setMessage('Please connect your wallet first');
      return;
    }

    setLoading(true);
    try {
      const faucetAddr = process.env.REACT_APP_FAUCET_ADDRESS;
      const faucetContract = new ethers.Contract(faucetAddr, FAUCET_ABI, signer);

      const tx = await faucetContract.requestTokens();
      setMessage('Transaction submitted. Waiting for confirmation...');

      const receipt = await tx.wait();
      setMessage('Tokens claimed successfully!');

      // Update balance
      await updateFaucetData(provider, account);
    } catch (error) {
      let errorMsg = 'Failed to claim tokens';
      if (error.reason === 'Faucet is paused') {
        errorMsg = 'Faucet is paused';
      } else if (error.reason?.includes('cooldown')) {
        errorMsg = 'Cooldown period not elapsed';
      } else if (error.reason?.includes('limit')) {
        errorMsg = 'Maximum claims reached';
      }
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Expose functions for automated evaluation
  useEffect(() => {
    window.EVAL = {
      getProvider: () => provider,
      getSigner: () => signer,
      getAccount: () => account,
      getBalance: () => balance,
      getClaimAmount: () => claimAmount,
      getCooldownPeriod: () => cooldownPeriod,
      getLastClaimTime: () => lastClaimTime,
      isPaused: () => isPaused,
      claimTokens: claimTokens,
      connectWallet: connectWallet
    };
  }, [provider, signer, account, balance, claimAmount, cooldownPeriod, lastClaimTime, isPaused]);

  const canClaim = () => {
    if (!lastClaimTime || lastClaimTime === '0') return true;
    const elapsed = Math.floor(Date.now() / 1000) - parseInt(lastClaimTime);
    return elapsed >= parseInt(cooldownPeriod);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERC-20 Token Faucet</h1>
        <div className="wallet-section">
          {!account ? (
            <button onClick={connectWallet} className="btn-primary">
              Connect Wallet
            </button>
          ) : (
            <div className="account-info">
              <p>Connected: {account.substring(0, 6)}...{account.substring(38)}</p>
              <p>Balance: {parseFloat(balance).toFixed(2)} Tokens</p>
            </div>
          )}
        </div>
      </header>

      <main className="App-main">
        {account && (
          <div className="faucet-container">
            <div className="claim-info">
              <h2>Claim Information</h2>
              <p>Claim Amount: {claimAmount} Tokens</p>
              <p>Cooldown Period: {cooldownPeriod} seconds</p>
              <p>Faucet Status: {isPaused ? 'Paused' : 'Active'}</p>
            </div>

            <button
              onClick={claimTokens}
              disabled={loading || !canClaim() || isPaused}
              className="btn-primary btn-claim"
            >
              {loading ? 'Claiming...' : 'Claim Tokens'}
            </button>

            {message && (
              <div className={`message ${message.includes('Failed') || message.includes('Cooldown') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
