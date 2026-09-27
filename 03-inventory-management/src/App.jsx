import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StockGridPage from './pages/StockGridPage';
import AuditLogPage from './pages/AuditLogPage';
import PurchaseOrderPage from './pages/PurchaseOrderPage';
import ReportsPage from './pages/ReportsPage';
import { useStore } from './store/useStore';

export default function App() {
  const [activeTab, setActiveTab] = useState('stock');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {activeTab === 'stock' && <StockGridPage />}
          {activeTab === 'audit' && <AuditLogPage />}
          {activeTab === 'orders' && <PurchaseOrderPage />}
          {activeTab === 'reports' && <ReportsPage />}
        </main>
      </div>

      <footer className="border-t border-slate-800 bg-[#0f172a] py-6 font-mono-code text-xs mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase">TITAN.ERP v4.9</span>
            <span className="text-slate-500">| RELATIONAL POSTGRES / SUPABASE INTEGRITY ENGINE</span>
          </div>
          <span className="text-slate-400">© 2026 TITAN LOGISTICS AUTOMATION INC.</span>
        </div>
      </footer>
    </div>
  );
}
