import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

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
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Wallet Tracker</h2>
        <p className="text-gray-500">Connect your wallet to view balance</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Wallet Tracker</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Total Balance</span>
          <span className="font-bold">{balance.toFixed(4)} SOL</span>
        </div>
        <div className="flex justify-between">
          <span>Number of Tokens</span>
          <span className="font-bold">{tokenCount}</span>
        </div>
        <div className="text-sm text-gray-500 truncate">
          {publicKey?.toBase58()}
        </div>
      </div>
    </div>
  );
};

export default WalletTrackerCard;