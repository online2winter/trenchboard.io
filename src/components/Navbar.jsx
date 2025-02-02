import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
  const { connected } = useWallet();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Solana Meme Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            {connected && (
              <span className="text-green-500">
                Connected
              </span>
            )}
            <WalletMultiButton className="phantom-button" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;