FROM node:18-bullseye

WORKDIR /app

# Network fix for Windows
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

COPY package*.json ./
RUN npm install

COPY . .

# Compile and start node at runtime (bypasses build-time network errors)
CMD ["sh", "-c", "npx hardhat compile && npx hardhat node --hostname 0.0.0.0 & sleep 15 && npx hardhat run scripts/deploy.js --network localhost && tail -f /dev/null"]