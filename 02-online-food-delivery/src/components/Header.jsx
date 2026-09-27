import React from 'react';
import { UtensilsCrossed, ShoppingBag, Clock, UserCheck, Flame } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Header({ activeTab, setActiveTab, setIsCartOpen }) {
  const { userRole, setUserRole, cartItems, activeOrders } = useStore();
  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-md border-b border-[#fed7aa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#ea580c] flex items-center justify-center text-white shadow-md shadow-orange-900/10 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#431407] font-serif-display block leading-none">
                  CRAVE<span className="text-[#ea580c]">.</span>
                </span>
                <span className="text-[11px] font-semibold text-[#9a3412] tracking-wider uppercase">
                  Artisanal Kitchens
                </span>
              </div>
            </button>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-2 ml-4">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
                  activeTab === 'explore'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-[#7c2d12] hover:bg-[#ffedd5]'
                }`}
              >
                Discover Kitchens
              </button>

              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'track'
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-[#7c2d12] hover:bg-[#ffedd5]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Live Orders</span>
                {activeOrders.length > 0 && (
                  <span className="w-5 h-5 bg-[#7c2d12] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {activeOrders.length}
                  </span>
                )}
              </button>

              {userRole === 'restaurant' && (
                <button
                  onClick={() => setActiveTab('kitchen')}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition flex items-center gap-1.5 ${
                    activeTab === 'kitchen'
                      ? 'bg-[#ea580c] text-white shadow-sm'
                      : 'text-[#7c2d12] hover:bg-[#ffedd5]'
                  }`}
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Kitchen Queue & Menu</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="flex items-center bg-[#ffedd5] px-2.5 py-1.5 rounded-xl border border-[#fed7aa]">
              <UserCheck className="w-4 h-4 text-[#ea580c] mr-1.5" />
              <select
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                  if (e.target.value === 'restaurant') setActiveTab('kitchen');
                  if (e.target.value === 'customer') setActiveTab('explore');
                }}
                className="bg-transparent text-xs font-bold text-[#7c2d12] focus:outline-none cursor-pointer"
              >
                <option value="customer">Customer View</option>
                <option value="restaurant">Kitchen Manager</option>
              </select>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm rounded-xl shadow-md shadow-orange-800/10 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Basket ({totalCartCount})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
