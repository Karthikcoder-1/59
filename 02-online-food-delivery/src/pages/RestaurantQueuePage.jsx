import React, { useState } from 'react';
import { ChefHat, Plus, Sparkles, Image as ImageIcon, Flame, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function RestaurantQueuePage() {
  const { restaurants, activeOrders, advanceOrderStatus, addDishToRestaurant, generateAiDishPhoto } = useStore();
  const [selectedRestId, setSelectedRestId] = useState('rest-1');

  // New Dish Form State
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState(16);
  const [dishCategory, setDishCategory] = useState('Specials');
  const [dishDesc, setDishDesc] = useState('');
  const [dishImg, setDishImg] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState('');

  const restaurant = restaurants.find((r) => r.id === selectedRestId) || restaurants[0];
  const queueOrders = activeOrders.filter((o) => o.restaurantId === selectedRestId);

  const handleGenerateAiPhoto = async () => {
    setIsGenerating(true);
    const photo = await generateAiDishPhoto(dishName, restaurant.cuisine);
    setDishImg(photo);
    setIsGenerating(false);
  };

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const finalImage =
      dishImg.trim() ||
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80';

    addDishToRestaurant(selectedRestId, {
      name: dishName,
      price: Number(dishPrice),
      category: dishCategory,
      description: dishDesc || 'Carefully prepared fresh with artisanal ingredients.',
      image: finalImage,
      popular: false
    });

    setDishName('');
    setDishDesc('');
    setDishImg('');
    setToast('Dish added to live restaurant menu!');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">
            Kitchen Management Console
          </span>
          <h1 className="text-3xl font-bold font-serif-display text-[#431407]">
            Live Kitchen Order Queue & Menu Builder
          </h1>
        </div>

        {/* Restaurant Switcher */}
        <div className="flex items-center gap-2 bg-[#ffedd5] p-1.5 rounded-2xl border border-[#fed7aa]">
          <span className="text-xs font-bold text-[#7c2d12] px-2">Kitchen:</span>
          <select
            value={selectedRestId}
            onChange={(e) => setSelectedRestId(e.target.value)}
            className="bg-white text-xs font-bold text-[#ea580c] px-3 py-1.5 rounded-xl border border-[#fed7aa] focus:outline-none cursor-pointer"
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Kitchen Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#fed7aa]/70 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#ea580c]" />
                <h2 className="text-lg font-bold font-serif-display text-[#431407]">
                  Active Kitchen Prep Queue ({queueOrders.length})
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#9a3412]">
                Auto-updating via Firebase Cloud Functions
              </span>
            </div>

            {queueOrders.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <ChefHat className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold">Kitchen queue is clear. Awaiting incoming tickets.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {queueOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 bg-[#FFFBF0] rounded-2xl border border-[#fed7aa] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[#431407] font-serif-display">{ord.id}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ea580c] text-white uppercase">
                          {ord.status}
                        </span>
                        <span className="text-xs text-stone-400">• {ord.placedAt}</span>
                      </div>
                      <div className="mt-2 text-xs text-[#7c2d12] space-y-0.5">
                        {ord.items.map((it, i) => (
                          <div key={i} className="font-semibold">
                            • {it.name} <span className="text-[#ea580c]">x{it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {ord.status === 'placed' && (
                        <button
                          onClick={() => advanceOrderStatus(ord.id, 'preparing')}
                          className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold rounded-xl shadow-sm transition"
                        >
                          Start Cooking
                        </button>
                      )}
                      {ord.status === 'preparing' && (
                        <button
                          onClick={() => advanceOrderStatus(ord.id, 'out-for-delivery')}
                          className="px-4 py-2 bg-[#15803d] hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition"
                        >
                          Hand to Courier
                        </button>
                      )}
                      {ord.status === 'out-for-delivery' && (
                        <span className="text-xs font-bold text-[#ea580c] bg-[#ffedd5] px-3 py-1.5 rounded-xl border border-[#fed7aa]">
                          Courier Dispatched
                        </span>
                      )}
                      {ord.status === 'delivered' && (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
                          Delivered
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Menu Builder + AI Dish Photos */}
        <div className="bg-white rounded-3xl p-6 border border-[#fed7aa]/70 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold font-serif-display text-[#431407] mb-1">
              Live Menu Builder
            </h2>
            <p className="text-xs text-[#7c2d12]">
              Create new dishes with automated AI image generation.
            </p>
          </div>

          {toast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl">
              {toast}
            </div>
          )}

          <form onSubmit={handleAddDish} className="space-y-4 text-xs font-semibold text-[#431407]">
            <div>
              <label className="block mb-1">Dish Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Saffron Risotto with Ossobuco"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="w-full bg-[#FFFBF0] border border-[#fed7aa] p-2.5 rounded-xl focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.5"
                  value={dishPrice}
                  onChange={(e) => setDishPrice(e.target.value)}
                  className="w-full bg-[#FFFBF0] border border-[#fed7aa] p-2.5 rounded-xl focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div>
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  value={dishCategory}
                  onChange={(e) => setDishCategory(e.target.value)}
                  className="w-full bg-[#FFFBF0] border border-[#fed7aa] p-2.5 rounded-xl focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>

            {/* AI Dish Photo Generation */}
            <div className="p-3.5 bg-[#ffedd5]/60 border border-[#fed7aa] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#c2410c] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Dish Photography Engine
                </span>
              </div>
              <p className="text-[10px] text-[#7c2d12]">
                Generate an appetizing photo automatically for this dish.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Image URL or generate"
                  value={dishImg}
                  onChange={(e) => setDishImg(e.target.value)}
                  className="flex-1 bg-white border border-[#fed7aa] p-2 text-[11px] rounded-xl focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleGenerateAiPhoto}
                  disabled={isGenerating}
                  className="px-3 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-[11px] rounded-xl shadow-sm transition"
                >
                  {isGenerating ? 'Generating...' : 'AI Photo'}
                </button>
              </div>

              {dishImg && (
                <img
                  src={dishImg}
                  alt="Preview"
                  className="w-full h-28 object-cover rounded-xl border border-[#fed7aa]"
                />
              )}
            </div>

            <div>
              <label className="block mb-1">Culinary Description</label>
              <textarea
                rows={2}
                placeholder="Ingredients, preparation notes, allergens..."
                value={dishDesc}
                onChange={(e) => setDishDesc(e.target.value)}
                className="w-full bg-[#FFFBF0] border border-[#fed7aa] p-2.5 rounded-xl focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
            >
              Add Dish to Restaurant Menu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
