import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartDrawer({ isOpen, onClose, onOrderPlaced }) {
  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    restaurants,
    cartRestaurantId,
    promoCode,
    discount,
    applyPromoCode,
    placeOrder
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [address, setAddress] = useState('550 Maple Street, Apt 4B');
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isOpen) return null;

  const currentRestaurant = restaurants.find((r) => r.id === cartRestaurantId);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = currentRestaurant ? currentRestaurant.deliveryFee : 2.99;
  const discountAmount = Math.round(subtotal * discount * 100) / 100;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage(res.message);
  };

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      const order = placeOrder(address);
      setIsPlacing(false);
      onOrderPlaced(order);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-[#431407]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#FFFBF0] border-l border-[#fed7aa] h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#fed7aa] flex items-center justify-between bg-[#ffedd5]">
          <div>
            <h2 className="text-xl font-bold font-serif-display text-[#431407]">
              Your Culinary Basket
            </h2>
            {currentRestaurant && (
              <p className="text-xs text-[#9a3412] font-semibold mt-0.5">
                From: {currentRestaurant.name}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7c2d12] hover:bg-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <span className="text-4xl">🍲</span>
              <p className="text-sm font-semibold text-[#9a3412]">Your basket is currently empty.</p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#ea580c] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#c2410c] transition"
              >
                Discover Dishes
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#fed7aa]/70 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#ffedd5]"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-[#431407] line-clamp-1">{item.name}</h4>
                  <span className="text-xs font-bold text-[#ea580c] font-serif-display mt-0.5 block">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#fed7aa] rounded-lg bg-[#FFFBF0]">
                      <button
                        onClick={() => updateCartQty(idx, -1)}
                        className="px-2 py-0.5 text-[#9a3412] hover:bg-[#fed7aa]/50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#431407]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(idx, 1)}
                        className="px-2 py-0.5 text-[#9a3412] hover:bg-[#fed7aa]/50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-stone-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Promo Code Box */}
          {cartItems.length > 0 && (
            <div className="pt-2">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#ea580c] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter CRAVE20 / TASTY20"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#fed7aa] rounded-xl text-xs text-[#431407] font-semibold focus:outline-none focus:border-[#ea580c]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ffedd5] hover:bg-[#fed7aa] text-[#7c2d12] font-bold text-xs rounded-xl transition"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className="text-[11px] font-semibold text-[#ea580c] mt-1.5 px-1">{promoMessage}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#fed7aa] bg-[#ffedd5] space-y-4">
            <div className="space-y-1.5 text-xs font-medium text-[#7c2d12]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kitchen Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#15803d] font-bold">
                  <span>Promo Discount ({promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#fed7aa] flex justify-between text-base font-bold font-serif-display text-[#431407]">
                <span>Total Amount</span>
                <span className="text-xl text-[#ea580c]">${total.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#7c2d12] uppercase mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-[#fed7aa] p-2 text-xs text-[#431407] rounded-xl focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full py-3.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-900/10 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isPlacing ? (
                <span>Dispatching Order to Kitchen...</span>
              ) : (
                <>
                  <span>Place Order • ${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
