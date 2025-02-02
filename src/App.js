import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/animations.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import WalletTracker from './pages/WalletTracker';
import StatsCard from './components/StatsCard';

function App() {
const [isLoading, setIsLoading] = React.useState(false);

return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="w-64 py-8 px-4">
        <Navbar />
    </div>
    <main className="flex-grow p-8 transition-all duration-300 ease-in-out">
        {isLoading ? (
        <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
        </div>
        ) : (
        <div className="page-transition">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
        )}
    </main>
    </div>
);
}

export default App;


