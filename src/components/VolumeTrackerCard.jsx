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
    <div className="rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 p-6">
    <h2 className="text-xl font-bold mb-4 text-white">Volume Tracker</h2>
    <div className="space-y-4">
        <div className="animate-pulse flex justify-between items-center p-3 bg-white/5 rounded-lg">
        <span className="text-white/70">24h Volume</span>
        <div className="h-4 bg-white/10 rounded w-24"></div>
        </div>
        <div className="animate-pulse flex justify-between items-center p-3 bg-white/5 rounded-lg">
        <span className="text-white/70">Average Volume</span>
        <div className="h-4 bg-white/10 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-black/20 backdrop-blur-lg border border-white/5 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,178,0.1)]">
    <h2 className="text-xl font-bold mb-4 text-white">Volume Tracker</h2>
    <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#00ffaa]/10 to-[#00c8ff]/10 rounded-lg border border-white/10 hover:shadow-[0_0_20px_rgba(0,255,178,0.1)] transition-all duration-300">
        <span className="text-white/70">24h Volume</span>
        <span className="font-bold text-[#00ffaa]">{formatVolume(totalVolume)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#00c8ff]/10 to-[#00ffaa]/10 rounded-lg border border-white/10 hover:shadow-[0_0_20px_rgba(0,255,178,0.1)] transition-all duration-300">
        <span className="text-white/70">Average Volume</span>
        <span className="font-bold text-[#00c8ff]">{formatVolume(averageVolume)}</span>
        </div>
      </div>
    </div>
  );
};

export default VolumeTrackerCard;