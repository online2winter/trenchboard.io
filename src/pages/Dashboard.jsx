import React, { useState } from 'react';
import WalletTrackerCard from '../components/WalletTrackerCard';
import WatchedCoinsCard from '../components/WatchedCoinsCard';
import VolumeTrackerCard from '../components/VolumeTrackerCard';
import CardWrapper from '../components/CardWrapper';
import NewCoinsTrackerCard from '../components/NewCoinsTrackerCard';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
const [isLoading, setIsLoading] = useState(true);

React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
}, []);

return (
<div className="relative">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    <CardWrapper
        title="Wallet Tracker"
        subtitle="Monitor your crypto portfolio"
        className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
    >
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <WalletTrackerCard />
        </div>
    </CardWrapper>

    <CardWrapper
        title="Watched Coins"
        subtitle="Your monitored cryptocurrencies"
        className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
    >
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <WatchedCoinsCard />
        </div>
    </CardWrapper>
    
    <CardWrapper
        title="Volume Tracker"
        subtitle="Track trading volume changes"
        className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
    >
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <VolumeTrackerCard />
        </div>
    </CardWrapper>
    
    <CardWrapper
        title="New Coins"
        subtitle="Track newly listed cryptocurrencies"
        className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
    >
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <NewCoinsTrackerCard />
        </div>
    </CardWrapper>
    </div>
    {isLoading && (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
    )}
</div>
);
};

export default Dashboard;
