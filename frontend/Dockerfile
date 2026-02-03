FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the React app
RUN npm run build

# Install serve to run the static files
RUN npm install -g serve

# Start the server using 'npx' to find the binary correctly
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]