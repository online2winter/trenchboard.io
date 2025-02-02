import React from 'react';
import usePumpFunData from '../hooks/usePumpFunData';

const WATCHED_TOKENS = {
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK token
  SAMO: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', // SAMO token
  COPE: '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh', // COPE token
};

const TokenRow = ({ name, address }) => {
  const { price, volume24h, priceChange24h, loading, error } = usePumpFunData(address);

  if (loading) {
    return (
      <div className="animate-pulse flex justify-between items-center p-2">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-between items-center p-2">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-red-500">Error loading data</p>
        </div>
      </div>
    );
  }

  const formatVolume = (vol) => {
    if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}M`;
    if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`;
    return `$${vol.toFixed(2)}`;
  };

  const priceChangeColor = priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-50">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">
          24h Vol: {formatVolume(volume24h)}
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">${price?.toFixed(4)}</p>
        <p className={`text-sm ${priceChangeColor}`}>
          {priceChange24h >= 0 ? '+' : ''}{priceChange24h?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const WatchedCoinsCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Watched Coins</h2>
      <div className="divide-y">
        {Object.entries(WATCHED_TOKENS).map(([name, address]) => (
          <TokenRow key={address} name={name} address={address} />
        ))}
      </div>
    </div>
  );
};

export default WatchedCoinsCard;