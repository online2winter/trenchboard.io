import React from 'react';
import useNewCoinsData from '../hooks/useNewCoinsData';

const TestWebSocket = () => {
  const { coins, loading, error, connected } = useNewCoinsData();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">WebSocket Test</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold">Connection Status:</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {loading && (
        <div className="mb-4">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-500">
          <h3 className="font-semibold">Error:</h3>
          <p>{error.toString()}</p>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Received Tokens:</h3>
        {coins.length === 0 ? (
          <p>No tokens received yet...</p>
        ) : (
          <div className="space-y-2">
            {coins.map((coin, index) => (
              <div key={coin.address} className="p-3 bg-gray-100 rounded">
                <p><strong>Name:</strong> {coin.name}</p>
                <p><strong>Address:</strong> {coin.address}</p>
                <p><strong>Initial Price:</strong> ${coin.initialPrice}</p>
                <p><strong>Initial Liquidity:</strong> ${coin.initialLiquidity.toLocaleString()}</p>
                <p><strong>Created:</strong> {new Date(coin.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestWebSocket;