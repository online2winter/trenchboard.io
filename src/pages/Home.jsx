import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WalletTrackerCard from '../components/WalletTrackerCard';
import VolumeTrackerCard from '../components/VolumeTrackerCard';
import WatchedCoinsCard from '../components/WatchedCoinsCard';
import CardWrapper from '../components/CardWrapper';
import LoadingSpinner from '../components/LoadingSpinner';

// Constants
const ANIMATION_DELAY = 1000;
const STATS_INITIAL_STATE = { portfolio: 0, growth: 0, coins: 0 };
const TRANSITION_CLASSES = {
  visible: 'opacity-100 translate-y-0',
  hidden: 'opacity-0 translate-y-10'
};

// Reusable components
const BackgroundGradients = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffaa]/5 via-transparent to-[#00c8ff]/5 opacity-30" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00ffaa]/10 via-transparent to-transparent" />
  </>
);

const StatCard = ({ label, value, formatter }) => (
<div className="p-6 rounded-xl backdrop-blur-sm border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.025] hover:shadow-[0_0_20px_rgba(0,255,178,0.15)] transition-all duration-300 hover:scale-[1.02]">
    <span className="text-sm text-[#00ffaa]">{label}</span>
    <div className="text-3xl font-bold text-white">
      {formatter ? formatter(value) : value}
    </div>
  </div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  formatter: PropTypes.func
};

const DashboardCard = ({ title, subtitle, children }) => (
  <div className="transform hover:scale-105 transition-transform duration-300">
    <CardWrapper 
      title={title}
      subtitle={subtitle}
    className="backdrop-blur-xl border border-white/5 bg-gradient-to-br from-white/[0.15] to-white/[0.05] hover:shadow-[0_0_20px_rgba(0,255,178,0.15)] transition-all duration-300"
    >
      {children}
    </CardWrapper>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState(STATS_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(false);
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      try {
        // Simulate API call - In production, replace with actual API call
        setStats({
          portfolio: 124500,
          growth: 23.5,
          coins: 12
        });
        setIsVisible(true);
      } catch (err) {
        setError('Failed to load dashboard stats');
      } finally {
        setIsLoading(false);
      }
    }, ANIMATION_DELAY);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
          <div className="text-red-400 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGradients />
      
      <div className={`relative z-10 transition-all duration-1000 transform ${
        isVisible ? TRANSITION_CLASSES.visible : TRANSITION_CLASSES.hidden
      }`}>
        {/* Hero Section */}
        <div className="px-6 py-16">
          <div className="relative max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/5 bg-gradient-to-br from-white/[0.15] to-white/[0.05] p-8">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00ffaa]/5 to-[#00c8ff]/5 pointer-events-none" />
              <div className="relative">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#00ffaa] to-[#00c8ff] bg-clip-text text-transparent animate-gradient">
                  Welcome to TrenchBoard
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mb-12 leading-relaxed">
                  Your personal dashboard for tracking crypto assets, market changes, and the latest trends in real-time.
                </p>
          
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard 
                    label="Portfolio Value"
                    value={stats.portfolio}
                    formatter={(val) => `$${val.toLocaleString()}`}
                  />
                  <StatCard 
                    label="Growth"
                    value={stats.growth}
                    formatter={(val) => `+${val}%`}
                  />
                  <StatCard 
                    label="Tracked Coins"
                    value={stats.coins}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <DashboardCard 
                title="Wallet Tracker"
                subtitle="Monitor your crypto portfolio"
              >
                <WalletTrackerCard />
              </DashboardCard>
              
              <DashboardCard 
                title="Watched Coins"
                subtitle="Your monitored cryptocurrencies"
              >
                <WatchedCoinsCard />
              </DashboardCard>
              
              <DashboardCard 
                title="Volume Tracker"
                subtitle="Track trading volume changes"
              >
                <VolumeTrackerCard />
              </DashboardCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
