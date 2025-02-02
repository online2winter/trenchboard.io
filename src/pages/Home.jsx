import React from 'react';
import WalletTrackerCard from '../components/WalletTrackerCard';
import VolumeTrackerCard from '../components/VolumeTrackerCard';
import WatchedCoinsCard from '../components/WatchedCoinsCard';
import CardWrapper from '../components/CardWrapper';

function Home() {
console.log('Home component mounted');
return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">Crypto Dashboard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Track your crypto assets, monitor market changes, and stay updated with the latest trends</p>
        </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <CardWrapper title="Wallet Tracker" subtitle="Monitor your crypto portfolio">
            <WalletTrackerCard />
        </CardWrapper>
        <CardWrapper title="Watched Coins" subtitle="Your monitored cryptocurrencies">
            <WatchedCoinsCard />
        </CardWrapper>
        <CardWrapper title="Volume Tracker" subtitle="Track trading volume changes">
            <VolumeTrackerCard />
        </CardWrapper>
    </div>
</div>
);
}

export default Home;

