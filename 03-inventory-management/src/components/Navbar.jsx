import React from 'react';
import { Warehouse, AlertTriangle, FileSpreadsheet, ClipboardList, ShoppingCart, UserCheck, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar({ activeTab, setActiveTab }) {
  const { userRole, setUserRole, inventory, selectedWarehouse, setSelectedWarehouse, skuSearchQuery, setSkuSearchQuery } = useStore();

  const lowStockCount = inventory.filter((i) => i.totalStock <= i.minThreshold).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] border-b border-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('stock')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#eab308] text-black font-black font-mono-code flex items-center justify-center text-xl shadow-md">
                TN
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white font-mono-code block leading-none group-hover:text-[#eab308] transition-colors">
                  TITAN<span className="text-[#eab308]">.</span>ERP
                </span>
                <span className="text-[10px] text-slate-400 font-mono-code uppercase tracking-widest">
                  Industrial Stock Control
                </span>
              </div>
            </button>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1 font-mono-code text-xs">
              <button
                onClick={() => setActiveTab('stock')}
                className={`px-3 py-2 rounded font-semibold uppercase tracking-wider transition ${
                  activeTab === 'stock'
                    ? 'bg-[#eab308] text-black font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Stock Grid
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-2 rounded font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
                  activeTab === 'audit'
                    ? 'bg-[#eab308] text-black font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Movement Audit</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-2 rounded font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
                  activeTab === 'orders'
                    ? 'bg-[#eab308] text-black font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Purchase Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`px-3 py-2 rounded font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
                  activeTab === 'reports'
                    ? 'bg-[#eab308] text-black font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Aging & Turnover CSV</span>
              </button>
            </nav>
          </div>

          {/* Right Controls & Role Select */}
          <div className="flex items-center gap-3 font-mono-code text-xs">
            {/* Low stock alert badge */}
            {lowStockCount > 0 && (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-[#eab308] rounded text-[11px] font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lowStockCount} Critical Alert</span>
              </div>
            )}

            {/* Warehouse Switcher */}
            <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              <Warehouse className="w-3.5 h-3.5 text-[#eab308] mr-1.5" />
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Hubs (Multi-Site)</option>
                <option value="WH-ALPHA">Alpha West Port</option>
                <option value="WH-BETA">Beta North Rail</option>
                <option value="WH-CENTRAL">Central Depot</option>
              </select>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              <UserCheck className="w-3.5 h-3.5 text-[#eab308] mr-1.5" />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#eab308] focus:outline-none cursor-pointer uppercase"
              >
                <option value="manager">Role: Manager</option>
                <option value="staff">Role: Staff</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
