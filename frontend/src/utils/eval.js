import { ethers } from 'ethers';
import addressData from '../addresses.json';

const FAUCET_ABI = [
    "function requestTokens() external",
    "function canClaim(address user) public view returns (bool)",
    "function remainingAllowance(address user) external view returns (uint256)"
];
const TOKEN_ABI = ["function balanceOf(address owner) view returns (uint256)"];

window.__EVAL__ = {
    connectWallet: async () => {
        if (!window.ethereum) throw new Error("No Wallet");
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    },

    requestTokens: async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const faucet = new ethers.Contract(addressData.faucet, FAUCET_ABI, signer);
        const tx = await faucet.requestTokens();
        await tx.wait(); // Wait for mining
        return tx.hash;
    },

    getBalance: async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const token = new ethers.Contract(addressData.token, TOKEN_ABI, provider);
        const bal = await token.balanceOf(address);
        return bal.toString();
    },

    canClaim: async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const faucet = new ethers.Contract(addressData.faucet, FAUCET_ABI, provider);
        return await faucet.canClaim(address);
    },

    getRemainingAllowance: async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const faucet = new ethers.Contract(addressData.faucet, FAUCET_ABI, provider);
        const allow = await faucet.remainingAllowance(address);
        return allow.toString();
    },

    getContractAddresses: async () => {
        return addressData;
    }
};
