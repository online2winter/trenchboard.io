import React from 'react';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import WalletContext from './contexts/WalletContext';

function App() {
  return (
    <WalletContext>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </WalletContext>
  );
}

export default App;