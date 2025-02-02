import { useState, useEffect } from 'react';
import { fetchTokenData } from '../utils/api';
import { useConnection } from '@solana/wallet-adapter-react';

const usePumpFunData = (tokenAddress) => {
  const { connection } = useConnection();
  const [data, setData] = useState({
    price: null,
    volume24h: null,
    supply: null,
    priceChange24h: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!tokenAddress) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Token address is required'
        }));
        return;
      }

      try {
        const tokenData = await fetchTokenData(tokenAddress);
        setData({
          price: tokenData.price,
          volume24h: tokenData.volume24h,
          supply: tokenData.supply,
          priceChange24h: tokenData.priceChange24h,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error in usePumpFunData:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch token data'
        }));
      }
    };

    fetchData();
    // Set up polling interval - increased to 2 minutes to avoid rate limits
    const interval = setInterval(fetchData, 120000);

    return () => clearInterval(interval);
  }, [tokenAddress, connection]);

  return data;
};

export default usePumpFunData;