import React, { useState } from 'react';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import MenuModal from './components/MenuModal';
import CartDrawer from './components/CartDrawer';
import LiveTrackingView from './components/LiveTrackingView';
import RestaurantQueuePage from './pages/RestaurantQueuePage';
import { useStore } from './store/useStore';
import { Search, Filter, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    restaurants,
    selectedCuisine,
    setCuisine,
    minRating,
    setMinRating,
    searchQuery,
    setSearchQuery,
    userRole
  } = useStore();

  const cuisines = ['All', 'Italian', 'Japanese', 'Mediterranean'];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;
    const matchesRating = r.rating >= minRating;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCuisine && matchesRating && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#431407] flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsCartOpen={setIsCartOpen}
        />

        <main>
          {activeTab === 'explore' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Warm Terracotta Hero Banner */}
              <div className="relative mb-12 bg-gradient-to-br from-[#fed7aa] via-[#ffedd5] to-[#fef7e0] rounded-3xl p-8 sm:p-12 border border-[#fed7aa] shadow-sm overflow-hidden">
                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ea580c] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Artisan Kitchens Delivering Warmth
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold font-serif-display text-[#431407] leading-tight">
                    Slow-cooked perfection,<br />
                    delivered swiftly.
                  </h1>
                  <p className="mt-3 text-sm sm:text-base text-[#7c2d12] leading-relaxed">
                    Order from chef-owned neighbourhood trattorias, ramen bars, and mezze counters. Track every turn on your live courier map.
                  </p>
                </div>
              </div>

              {/* Filter Controls Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#fed7aa] mb-8">
                {/* Cuisine Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {cuisines.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCuisine(c)}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold transition shadow-sm ${
                        selectedCuisine === c
                          ? 'bg-[#ea580c] text-white'
                          : 'bg-white text-[#7c2d12] border border-[#fed7aa] hover:bg-[#ffedd5]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Search & Rating Filter */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="w-4 h-4 text-[#ea580c] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search kitchen or dish..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#fed7aa] rounded-2xl text-xs text-[#431407] font-semibold focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-white border border-[#fed7aa] px-3 py-2 rounded-2xl text-xs font-bold text-[#7c2d12]">
                    <span>★ Min:</span>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="bg-transparent text-[#ea580c] font-bold focus:outline-none cursor-pointer"
                    >
                      <option value={0}>All</option>
                      <option value={4.5}>4.5+</option>
                      <option value={4.8}>4.8+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Restaurants Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onOpenMenu={(r) => setSelectedRestaurant(r)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'track' && <LiveTrackingView />}

          {activeTab === 'kitchen' && userRole === 'restaurant' && <RestaurantQueuePage />}
        </main>
      </div>

      {/* Menu Modal */}
      {selectedRestaurant && (
        <MenuModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderPlaced={(order) => {
          setActiveTab('track');
        }}
      />

      {/* Warm Terracotta Footer */}
      <footer className="border-t border-[#fed7aa] bg-[#ffedd5] py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-serif-display text-[#431407]">
              CRAVE<span className="text-[#ea580c]">.</span>
            </span>
            <span className="text-xs text-[#9a3412]">
              — Artisanal Food Delivery Ecosystem
            </span>
          </div>

          <p className="text-xs text-[#7c2d12] flex items-center gap-1 font-medium">
            Handcrafted with <Heart className="w-3.5 h-3.5 fill-[#ea580c] text-[#ea580c]" /> for culinary excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}
