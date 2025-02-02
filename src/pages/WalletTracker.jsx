import React from 'react';
import WalletTrackerCard from '../components/WalletTrackerCard';

const WalletTracker = () => {
return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Wallet Tracker
        </h1>
        <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <WalletTrackerCard />
        </div>
        </div>
    </div>
    </div>
);
};

export default WalletTracker;

