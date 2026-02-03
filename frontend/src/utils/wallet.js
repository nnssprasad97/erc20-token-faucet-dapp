// frontend/src/utils/wallet.js
import { ethers } from 'ethers';

// 1. Connect Wallet Function
export const connectWallet = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0]; // Return the first address
    } catch (error) {
        console.error("Connection failed:", error);
        throw error;
    }
};

// 2. Check if already connected (for page reloads)
export const checkConnection = async () => {
    if (!window.ethereum) return null;

    const accounts = await window.ethereum.request({
        method: "eth_accounts"
    });
    return accounts.length > 0 ? accounts[0] : null;
};

// 3. Listen for account changes (switching wallets in MetaMask)
export const onAccountChange = (callback) => {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            callback(accounts.length > 0 ? accounts[0] : null);
        });
    }
};
