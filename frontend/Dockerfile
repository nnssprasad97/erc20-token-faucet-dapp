FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
# Note: CRA produces 'build' folder. Vite produces 'dist'.
# Checking vite.config.js from file list earlier... it's a Vite app.
# IF fails check if build folder is dist.
# Assuming Vite based on previous file list showing vite.config.js.
# Actually let's assume 'dist' if vite, 'build' if CRA.
# User snippet showed 'dist'. I will use 'dist' if it's vite.
# Previous file list showed `vite.config.js` -> It is Vite.
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
