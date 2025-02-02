import React from 'react';
import WalletTrackerCard from '../components/WalletTrackerCard';
import WatchedCoinsCard from '../components/WatchedCoinsCard';
import VolumeTrackerCard from '../components/VolumeTrackerCard';
import CardWrapper from '../components/CardWrapper';
import NewCoinsTrackerCard from '../components/NewCoinsTrackerCard';

const Dashboard = () => {
return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CardWrapper title="Wallet Tracker" subtitle="Monitor your crypto portfolio">
            <WalletTrackerCard />
        </CardWrapper>
        <CardWrapper title="Watched Coins" subtitle="Your monitored cryptocurrencies">
            <WatchedCoinsCard />
        </CardWrapper>
        <CardWrapper title="Volume Tracker" subtitle="Track trading volume changes">
            <VolumeTrackerCard />
        </CardWrapper>
        <CardWrapper title="New Coins" subtitle="Track newly listed cryptocurrencies">
            <NewCoinsTrackerCard />
        </CardWrapper>
    </div>
    </div>
</div>
  );
};

export default Dashboard;