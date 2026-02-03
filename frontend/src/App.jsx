import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import addressData from './addresses.json';

// For this setup, we use a hardcoded ABI for simplicity


// For this setup, we'll use a hardcoded ABI for simplicity if the artifact mapping is tricky
const FAUCET_ABI = [
  "function requestTokens() external",
  "function canClaim(address user) public view returns (bool)",
  "function remainingAllowance(address user) external view returns (uint256)",
  "function lastClaimAt(address user) public view returns (uint256)"
];

const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)"
];

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [status, setStatus] = useState("");

  const connect = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
    updateData(signer);
  };

  const updateData = async (signer) => {
    const token = new ethers.Contract(addressData.token, TOKEN_ABI, signer);
    const bal = await token.balanceOf(await signer.getAddress());
    setBalance(ethers.formatEther(bal));
  };

  const claim = async () => {
    try {
      setStatus("Claiming...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const faucet = new ethers.Contract(addressData.faucet, FAUCET_ABI, signer);

      const tx = await faucet.requestTokens();
      await tx.wait();
      setStatus("Success! Tokens claimed.");
      updateData(signer);
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err.reason || err.message));
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ERC-20 Faucet</h1>
      {!account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <p>Balance: {balance} MTK</p>
          <button onClick={claim}>Claim Tokens</button>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
