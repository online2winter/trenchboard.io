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
    <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        </div>
        {[...Array(5)].map((_, index) => (
        <div key={index} className="animate-pulse border-b dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
            <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-48 mt-1"></div>
            <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="space-y-1">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div className="space-y-1">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
            </div>
            </div>
        </div>
        ))}
    </div>
    );
}

return (
    <div className="space-y-4">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-gray-100">New Coins</h2>
        <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} transition-colors duration-300`}></div>
        <span className="text-sm text-gray-600 dark:text-gray-400">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
    </div>

    {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-4">
        <div className="flex items-center">
            <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            </div>
            <div className="ml-3">
            <p className="text-sm text-red-700 dark:text-red-400">{error.toString()}</p>
            </div>
        </div>
        </div>
    )}

      <div className="space-y-4">
        {coins.map((coin, index) => (
        <div key={coin.address || index} className="border-b dark:border-gray-700 last:border-b-0 pb-4 last:pb-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 -mx-2 px-2">
            <div className="flex justify-between items-center">
            <span className="font-medium dark:text-gray-100">{coin.name || 'Unknown'}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{formatTime(coin.createdAt)}</span>
            </div>
            <div 
            className="text-sm text-gray-500 dark:text-gray-400 mt-1 cursor-help hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
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