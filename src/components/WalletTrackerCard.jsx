import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import StatsCard from './StatsCard';

const WalletIcon = ({ className }) => (
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
>
    <path d="M20 6h-4M4 6h12M4 6a2 2 0 0 1 0-4h12a2 2 0 0 1 0 4M4 6v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6" />
    <circle cx="16" cy="12" r="1" />
</svg>
);

const WalletTrackerCard = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (connected && publicKey) {
        try {
          // Fetch SOL balance
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);

          // Fetch token accounts
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          });
          setTokenCount(tokenAccounts.value.length);
        } catch (error) {
          console.error('Error fetching wallet data:', error);
        }
      }
    };

    fetchWalletData();
    // Set up polling interval
    const interval = setInterval(fetchWalletData, 30000);
    return () => clearInterval(interval);
  }, [connected, publicKey, connection]);

if (!connected) {
return (
    <div className="relative backdrop-blur-xl bg-black/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,178,0.15)] border border-white/10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffaa]/5 to-[#00c8ff]/5 rounded-2xl"></div>
    <h2 className="relative text-xl font-bold mb-4 bg-gradient-to-r from-[#00ffaa] to-[#00c8ff] bg-clip-text text-transparent">
        Wallet Tracker
    </h2>
    <div className="relative animate-pulse">
        <p className="text-white/60">Connect your wallet to view balance</p>
    </div>
    </div>
);
}

return (
<div className="relative backdrop-blur-xl bg-black/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,178,0.15)] border border-white/10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffaa]/5 to-[#00c8ff]/5 rounded-2xl"></div>
    <div className="relative">
    <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#00ffaa] to-[#00c8ff] bg-clip-text text-transparent flex items-center gap-2">
        Wallet Tracker
        <div className="w-2 h-2 rounded-full bg-[#00ffaa] animate-ping"></div>
    </h2>
    
    <div className="space-y-6">
    {/* Balance Card */}
    <div className="p-4 rounded-xl bg-gradient-to-r from-[#00ffaa]/10 to-[#00c8ff]/10 border border-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,178,0.2)]">
        <div className="space-y-2">
        <p className="text-sm text-white/60">Total Balance</p>
        <p className="text-2xl font-semibold text-white">
            {balance.toFixed(4)} <span className="text-[#00ffaa]">SOL</span>
        </p>
        </div>
    </div>
    
    {/* Token Count Card */}
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10">
        <div className="space-y-2">
        <p className="text-sm text-white/60">Number of Tokens</p>
        <p className="text-2xl font-semibold text-white">
            {tokenCount.toString()}
        </p>
        </div>
    </div>
        
        {/* Chart Section */}
        <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="h-40 w-full bg-gradient-to-b from-[#00ffaa]/5 to-transparent flex items-center justify-center">
            <p className="text-white/40 text-sm">Chart Coming Soon</p>
        </div>
        </div>

        {/* Wallet Address */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
        <div className="p-2 rounded-lg bg-[#00ffaa]/10">
            <WalletIcon className="w-5 h-5 text-[#00ffaa]" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm text-white/60">Wallet Address</p>
            <p className="text-white truncate group-hover:text-[#00ffaa] transition-colors duration-200">
            {publicKey?.toBase58()}
            </p>
        </div>
        </div>
    </div>
    </div>
</div>
);
};

export default WalletTrackerCard;