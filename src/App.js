import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import WalletTracker from './pages/WalletTracker';
import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

function App() {
return (
    <div className="flex min-h-screen">
        <div className="w-64">
            <Navbar />
        </div>
        <main className="flex-grow p-6">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>
    </div>
);
}

export default App;


