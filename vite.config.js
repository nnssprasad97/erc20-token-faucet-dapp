import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  define: {
    'process.env.REACT_APP_FAUCET_ADDRESS': JSON.stringify(process.env.REACT_APP_FAUCET_ADDRESS || ''),
    'process.env.REACT_APP_TOKEN_ADDRESS': JSON.stringify(process.env.REACT_APP_TOKEN_ADDRESS || ''),
  },
})
