# 🚀 FINAL STEPS - QUICK ACTION GUIDE

**Current Status**: 60/100 marks
**Missing**: Smart Contract Deployment + Live Demo URL + Video Demo
**Time Needed**: 60-90 minutes total
**Deadline**: 20 Dec 2025, 04:59 PM IST

---

## QUICKEST PATH TO 85-100/100

### STEP 1: Deploy Contracts (30-40 min)
Follow DEPLOYMENT_GUIDE.md Parts 1-4:
- Get Sepolia ETH from faucet
- Get Infura RPC key
- Get Etherscan API key
- Clone repo locally
- npm install
- npm run compile
- npx hardhat run scripts/deploy.js --network sepolia
- Verify both contracts on Etherscan

### STEP 2: Test Docker (15-20 min)
Update .env with addresses and run:
- docker-compose build
- docker-compose up
- Test at localhost:3000
- Verify wallet connection and token claiming

### STEP 3: Deploy to Vercel (10 min - FASTEST)
1. Go: https://vercel.com/import
2. Select this GitHub repo
3. Build: frontend/npm run build
4. Output: frontend/dist
5. Add env vars:
   - VITE_TOKEN_ADDRESS=0x...
   - VITE_FAUCET_ADDRESS=0x...
   - VITE_RPC_URL=https://...
6. Deploy and copy URL

Result: Live Demo URL = https://your-app.vercel.app

### STEP 4: Record Video (10-15 min)
Use OBS or Windows built-in recorder:
1. Record yourself using the app
2. Show: Connect wallet -> Balance -> Claim tokens
3. Show: window.__EVAL__ in console
4. Upload to YouTube (unlisted) or Google Drive

Result: Video Demo URL

### STEP 5: Update Submission (5 min)
Go to Partnr Network task page:
- Fill Live Demo URL
- Fill Video Demo URL
- Ensure all URLs are accessible
- Submit

---

## CRITICAL CHECKLIST

- [ ] Sepolia RPC key obtained
- [ ] Etherscan API key obtained
- [ ] Contracts deployed to Sepolia
- [ ] Both contracts verified on Etherscan
- [ ] Docker setup tested locally
- [ ] App deployed to Vercel/Netlify
- [ ] Live demo URL public and working
- [ ] Video demo recorded and uploaded
- [ ] window.__EVAL__ interface works
- [ ] submission form updated
- [ ] All changes pushed to GitHub

---

## EXPECTED SCORE AFTER COMPLETION

Current: 60/100
After deployment: 85-90/100

Why not 100?
- Some evaluators may want additional features
- Code quality and documentation polish
- Complete integration test coverage

---

**START NOW - You have ~24 hours before deadline!**
