import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');

// Components
import Navbar from './components/Navbar';
import Main from './components/Main';

function App() {
// You can also provide a custom RPC endpoint
const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

// @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
// Only the wallets you configure here will be compiled into your application, and only the dependencies
// of wallets that your users connect to will be loaded
const wallets = useMemo(
    () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    ],
    []
);

return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <LoadingProvider>
                    <Router>
                        <div className="relative min-h-screen bg-crypto-darker">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-radial from-crypto-dark/50 to-crypto-darker opacity-70"></div>
                            
                            {/* Content container */}
                            <div className="relative z-10">
                                {/* Blur effect for depth */}
                                <div className="fixed inset-0 pointer-events-none">
                                    <div className="absolute inset-0 bg-crypto-primary/5 backdrop-blur-3xl"></div>
                                </div>
                                
                                {/* Main content */}
                                <div className="relative">
                                    <Navbar />
                                    <Main />
                                </div>
                            </div>
                        </div>
                    </Router>
                </LoadingProvider>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);
}

export default App;

