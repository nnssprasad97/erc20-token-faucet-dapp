
// Basic eval.js to expose window.EVAL
// This assumes it is bundled or loaded in a way that allows require/import or we use a simple script tag.
// If simple script tag, we can't use 'require'. 
// We will assume a bundler OR we use a CDN for ethers in index.html.

// Let's assume standard browser usage with window.ethers available or via import map?
// The user says "In your frontend code (likely in a src/eval.js)... Connect via library".
// I will write it as a module that imports ethers.

import { ethers } from "ethers";
// We need to fetch the addresses.json. In browser, we fetch it.
// Assuming served from root or similar.

async function init() {
    let config;
    try {
        const response = await fetch("./addresses.json");
        config = await response.json();
    } catch (e) {
        console.error("Could not load addresses.json", e);
        return;
    }

    // Connect provider
    // If window.ethereum exists, use it? Or localhost?
    // The evaluator might use localhost.
    // We'll try window.ethereum first, then fallback to localhost:8545

    let provider;
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
    } else {
        provider = new ethers.JsonRpcProvider("http://localhost:8545");
    }

    const signer = await provider.getSigner(); // This might fail if no wallet. 
    // If evaluator is automated, maybe it injects a provider?
    // Or maybe we should use JsonRpcProvider for read-only and signer for write?

    // For requestTokens we need a signer (user wallet).

    const tokenContract = new ethers.Contract(config.tokenAddress, config.tokenABI, signer);
    const faucetContract = new ethers.Contract(config.faucetAddress, config.faucetABI, signer);

    window.EVAL = {
        requestTokens: async () => {
            try {
                const tx = await faucetContract.requestTokens();
                await tx.wait();
                return true;
            } catch (error) {
                console.error("requestTokens failed", error);
                throw error;
            }
        },
        getFaucetBalance: async () => {
            try {
                const balance = await tokenContract.balanceOf(config.faucetAddress);
                return ethers.formatUnits(balance, 18);
            } catch (error) {
                console.error("getFaucetBalance failed", error);
                throw error;
            }
        },
        getUserBalance: async (address) => {
            try {
                const target = address || await signer.getAddress();
                const balance = await tokenContract.balanceOf(target);
                return ethers.formatUnits(balance, 18);
            } catch (error) {
                console.error("getUserBalance failed", error);
                throw error;
            }
        }
    };

    console.log("window.EVAL initialized", window.EVAL);
}

init();
