import { useState, useEffect, useCallback } from 'react';
import websocketService from '../utils/websocket';

const useNewCoinsData = () => {
  const [data, setData] = useState({
    coins: [],
    loading: true,
    error: null,
    connected: false
  });

  const handleWebSocketMessage = useCallback((message) => {
    console.log('WebSocket message received:', message);
    
    if (message.type === 'connection') {
      setData(prevData => ({
        ...prevData,
        connected: message.status === 'connected',
        loading: false,
        error: message.status === 'error' ? message.error : null
      }));
      return;
    }
    
    if (message.type === 'newToken') {
      console.log('New token data:', message.data);
      setData(prevData => {
        // Check if we already have this token address
        const isDuplicate = prevData.coins.some(
          coin => coin.address === message.data.address
        );

        if (isDuplicate) {
          return prevData;
        }

        // Add new token to the list
        const newCoins = [
          {
            name: message.data.name,
            address: message.data.address,
            createdAt: message.data.timestamp,
            initialPrice: message.data.initialPrice,
            initialLiquidity: message.data.initialLiquidity
          },
          ...prevData.coins
        ].slice(0, 5); // Keep only the 5 most recent coins

        return {
          ...prevData,
          coins: newCoins,
          loading: false,
          error: null
        };
      });
    }
  }, []);

  useEffect(() => {
    console.log('Setting up WebSocket connection...');
    // Generate a unique ID for this subscriber
    const subscriberId = Math.random().toString(36).substr(2, 9);

    // Subscribe to WebSocket updates
    websocketService.subscribe(subscriberId, handleWebSocketMessage);

    // Get initial connection status
    const status = websocketService.getConnectionStatus();
    setData(prevData => ({
      ...prevData,
      connected: status.isConnected,
      loading: !status.isConnected
    }));

    // Cleanup: unsubscribe when component unmounts
    return () => {
      console.log('Cleaning up WebSocket connection...');
      websocketService.unsubscribe(subscriberId);
    };
  }, [handleWebSocketMessage]);

  // Log whenever data changes
  useEffect(() => {
    console.log('Current state:', {
      connected: data.connected,
      coins: data.coins,
      loading: data.loading,
      error: data.error
    });
  }, [data]);

  return data;
};

export default useNewCoinsData;