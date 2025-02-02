import React, { useEffect, useState } from 'react';
import usePumpFunData from '../hooks/usePumpFunData';

const TRACKED_TOKENS = {
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  SAMO: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  COPE: '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh',
};

const VolumeTrackerCard = () => {
  const [totalVolume, setTotalVolume] = useState(0);
  const [averageVolume, setAverageVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data for each token
  const bonkData = usePumpFunData(TRACKED_TOKENS.BONK);
  const samoData = usePumpFunData(TRACKED_TOKENS.SAMO);
  const copeData = usePumpFunData(TRACKED_TOKENS.COPE);

  useEffect(() => {
    const calculateVolumes = () => {
      if (bonkData.loading || samoData.loading || copeData.loading) {
        setIsLoading(true);
        return;
      }

      const volumes = [
        bonkData.volume24h || 0,
        samoData.volume24h || 0,
        copeData.volume24h || 0,
      ];

      const total = volumes.reduce((acc, curr) => acc + curr, 0);
      const average = total / volumes.length;

      setTotalVolume(total);
      setAverageVolume(average);
      setIsLoading(false);
    };

    calculateVolumes();
  }, [bonkData, samoData, copeData]);

  const formatVolume = (vol) => {
    if (vol >= 1000000) return `$${(vol / 1000000).toFixed(2)}M`;
    if (vol >= 1000) return `$${(vol / 1000).toFixed(2)}K`;
    return `$${vol.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Volume Tracker</h2>
        <div className="space-y-4">
          <div className="animate-pulse flex justify-between">
            <span>24h Volume</span>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="animate-pulse flex justify-between">
            <span>Average Volume</span>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Volume Tracker</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>24h Volume</span>
          <span className="font-bold">{formatVolume(totalVolume)}</span>
        </div>
        <div className="flex justify-between">
          <span>Average Volume</span>
          <span className="font-bold">{formatVolume(averageVolume)}</span>
        </div>
      </div>
    </div>
  );
};

export default VolumeTrackerCard;