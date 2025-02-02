import axios from 'axios';

const PUMP_FUN_API_BASE = 'https://api.pump.fun';

export const fetchTokenData = async (tokenAddress) => {
  try {
    const response = await axios.get(`${PUMP_FUN_API_BASE}/v1/tokens/${tokenAddress}`);
    return {
      price: response.data.price,
      volume24h: response.data.volume24h,
      supply: response.data.supply,
      priceChange24h: response.data.priceChange24h
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw new Error('Failed to fetch token data. Please try again later.');
  }
};

export const getWalletBalance = async (walletAddress) => {
  try {
    const response = await axios.get(`${PUMP_FUN_API_BASE}/v1/wallets/${walletAddress}/balance`);
    return response.data.balance;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw new Error('Failed to fetch wallet balance. Please try again later.');
  }
};

export const getTokenAccounts = async (walletAddress) => {
  try {
    const response = await axios.get(`${PUMP_FUN_API_BASE}/v1/wallets/${walletAddress}/tokens`);
    return response.data.tokens;
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    throw new Error('Failed to fetch token accounts. Please try again later.');
  }
};