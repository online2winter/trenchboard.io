import { NavLink } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { 
    HomeIcon,
    ChartBarIcon, 
    WalletIcon,
} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

// Constants for styling
const NAV_BUTTON_BASE = "group flex items-center px-3 h-10 rounded-lg transition-all duration-200 ease-in-out relative hover:scale-[1.02]";
const NAV_BUTTON_ACTIVE = "bg-gradient-to-r from-[#00ffaa]/10 to-[#00c8ff]/10 text-[#00ffaa] font-medium before:absolute before:left-0 before:w-0.5 before:h-5 before:bg-gradient-to-b before:from-[#00ffaa] before:to-[#00c8ff] before:rounded-r before:top-1/2 before:-translate-y-1/2 before:shadow-[0_0_10px_rgba(0,255,178,0.5)]";
const NAV_BUTTON_INACTIVE = "text-gray-400 hover:bg-[#00ffaa]/5 hover:text-[#00ffaa] hover:shadow-[0_0_15px_rgba(0,255,178,0.2)]";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const Navbar = ({ className = "" }) => {
    const { select, connected, publicKey, disconnect } = useWallet();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Memoize navigation items
    const navItems = useMemo(() => [
        {
            title: 'Home',
            path: '/',
            icon: HomeIcon,
            ariaLabel: 'Navigate to home page',
        },
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: ChartBarIcon,
            ariaLabel: 'Navigate to dashboard',
        },
        {
            title: 'Wallet',
            path: '/wallet-tracker',
            icon: WalletIcon,
            ariaLabel: 'Navigate to wallet tracker',
        },
    ], []);

    // Handle wallet connection with retry mechanism
    const handleWalletConnection = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (connected) {
                await disconnect();
            } else {
                await select();
            }
            setRetryCount(0); // Reset retry count on success
        } catch (error) {
            console.error('Wallet connection error:', error);
            setError('Failed to connect wallet. Please try again.');
            
            // Implement retry mechanism
            if (retryCount < MAX_RETRIES) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    handleWalletConnection();
                }, RETRY_DELAY);
            }
        } finally {
            setIsLoading(false);
        }
    }, [connected, disconnect, select, retryCount]);

    return (
        <nav className={`min-h-[400px] h-[95vh] w-[60px] sm:w-[70px] bg-black/20 backdrop-blur-lg flex flex-col py-2 sm:py-4 transition-all duration-300 ease-in-out rounded-2xl my-2 sm:my-4 mx-2 sm:mx-3 shadow-[0_0_15px_rgba(0,255,178,0.1)] relative hover:bg-black/30 border border-white/5 ${className}`}>
            {/* Logo Section */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-3">
                <div 
                    className="h-12 w-12 bg-gradient-to-br from-[#00ffaa] to-[#00c8ff] hover:from-[#00ffaa]/90 hover:to-[#00c8ff]/90 transition-all duration-300 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,178,0.3)] hover:shadow-[0_0_30px_rgba(0,255,178,0.5)] hover:scale-105 cursor-pointer border border-white/10"
                    role="banner"
                >
                    <span className="text-black font-bold text-lg sm:text-xl">C</span>
                </div>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col items-center space-y-2" role="navigation">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        aria-label={item.ariaLabel}
                        className={({ isActive }) =>
                            `${NAV_BUTTON_BASE} ${isActive ? NAV_BUTTON_ACTIVE : NAV_BUTTON_INACTIVE}`
                        }
                    >
                        <item.icon 
                            className="h-5 w-5 transition-all duration-300 group-hover:scale-110" 
                            title={item.title}
                            aria-hidden="true"
                        />
                    </NavLink>
                ))}
            </div>

            {/* Wallet Connection Button */}
            <button
                onClick={handleWalletConnection}
                disabled={isLoading}
                aria-label={connected ? 'Disconnect wallet' : 'Connect wallet'}
                className="mt-auto mb-4 mx-auto p-2 rounded-lg transition-all duration-300 hover:scale-105
                    bg-gradient-to-r from-[#00ffaa]/10 to-[#00c8ff]/10 hover:from-[#00ffaa]/20 hover:to-[#00c8ff]/20
                    group relative overflow-hidden border border-white/5 hover:shadow-[0_0_20px_rgba(0,255,178,0.3)]"
            >
                <WalletIcon 
                    className={`h-6 w-6 text-[#00ffaa] transition-all duration-300 
                        ${isLoading ? 'animate-pulse' : 'group-hover:scale-110'}`}
                    aria-hidden="true"
                />
                {connected && (
                    <div 
                        className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500"
                        role="status"
                        aria-label="Wallet connected"
                    />
                )}
            </button>

            {/* Error Message */}
            {error && (
                <div 
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm"
                    role="alert"
                >
                    {error}
                </div>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    className: PropTypes.string,
};

export default Navbar;
