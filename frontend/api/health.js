export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    message: 'ERC-20 Token Faucet API is running',
    timestamp: new Date().toISOString()
  });
}
