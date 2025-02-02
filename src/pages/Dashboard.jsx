import React from 'react';
import WalletTrackerCard from '../components/WalletTrackerCard';
import WatchedCoinsCard from '../components/WatchedCoinsCard';
import VolumeTrackerCard from '../components/VolumeTrackerCard';
import NewCoinsTrackerCard from '../components/NewCoinsTrackerCard';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WalletTrackerCard />
        <WatchedCoinsCard />
        <VolumeTrackerCard />
        <NewCoinsTrackerCard />
      </div>
    </div>
  );
};

export default Dashboard;