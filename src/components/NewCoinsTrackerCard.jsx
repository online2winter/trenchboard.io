import React from 'react';
import useNewCoinsData from '../hooks/useNewCoinsData';

const NewCoinsTrackerCard = () => {
  const { coins, loading, error, connected } = useNewCoinsData();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'N/A';
    if (price < 0.00001) {
      return price.toExponential(4);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatLiquidity = (liquidity) => {
    if (typeof liquidity !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(liquidity);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">New Coins</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-3 bg-gray-100 rounded w-20 mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">New Coins</h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {error && (
        <div className="text-red-500 mb-4">Error: {error.toString()}</div>
      )}

      <div className="space-y-4">
        {coins.map((coin, index) => (
          <div key={coin.address || index} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex justify-between items-center">
              <span className="font-medium">{coin.name || 'Unknown'}</span>
              <span className="text-sm text-gray-600">{formatTime(coin.createdAt)}</span>
            </div>
            <div 
              className="text-sm text-gray-500 mt-1 cursor-help"
              title={coin.address}
            >
              {coin.address ? 
                `${coin.address.slice(0, 8)}...${coin.address.slice(-8)}` :
                'Address unavailable'
              }
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Initial Price:</span>
                <div className="font-medium">{formatPrice(coin.initialPrice)}</div>
              </div>
              <div>
                <span className="text-gray-600">Initial Liquidity:</span>
                <div className="font-medium">{formatLiquidity(coin.initialLiquidity)}</div>
              </div>
            </div>
          </div>
        ))}
        {coins.length === 0 && (
          <div className="text-gray-500">No new coins found</div>
        )}
      </div>
    </div>
  );
};

export default NewCoinsTrackerCard;