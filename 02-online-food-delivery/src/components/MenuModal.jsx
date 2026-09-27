import React, { useState } from 'react';
import { X, Plus, Check, Star, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function MenuModal({ restaurant, onClose, onOpenCart }) {
  const { addToCart } = useStore();
  const [addedItem, setAddedItem] = useState(null);

  if (!restaurant) return null;

  const handleAdd = (dish) => {
    const success = addToCart(restaurant.id, dish);
    if (success) {
      setAddedItem(dish.id);
      setTimeout(() => setAddedItem(null), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#431407]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-[#FFFBF0] rounded-3xl border border-[#fed7aa] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Hero Banner */}
        <div className="relative h-48 bg-[#ffedd5] flex-shrink-0">
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#431407]/90 via-[#431407]/40 to-transparent flex items-end p-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#fed7aa] bg-[#ea580c] px-2.5 py-0.5 rounded-md mb-2 inline-block">
                {restaurant.cuisine}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
                {restaurant.name}
              </h2>
              <p className="text-xs text-[#fed7aa] mt-1">
                {restaurant.address} • {restaurant.deliveryTime} Delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-[#431407] rounded-full transition shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dishes List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <h3 className="text-base font-bold font-serif-display text-[#7c2d12] border-b border-[#fed7aa] pb-2">
            Chef's Curated Offerings
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {restaurant.menu.map((dish) => (
              <div
                key={dish.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#ffedd5] hover:border-[#ea580c] transition shadow-sm"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#fed7aa]/50 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#431407]">{dish.name}</h4>
                      {dish.popular && (
                        <span className="text-[10px] font-bold bg-[#ffedd5] text-[#c2410c] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Sparkles className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#78350f] mt-1 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                    <span className="text-base font-bold text-[#ea580c] font-serif-display mt-2 block">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(dish)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                    addedItem === dish.id
                      ? 'bg-[#15803d] text-white'
                      : 'bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-sm'
                  }`}
                >
                  {addedItem === dish.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Dish</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#ffedd5] border-t border-[#fed7aa] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#7c2d12]">
            Craving more artisanal flavours?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="px-5 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
          >
            Review Basket
          </button>
        </div>
      </div>
    </div>
  );
}
