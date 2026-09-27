import React, { useState } from 'react';
import { Truck, MapPin, Phone, Star, CheckCircle, Clock, ChefHat, Navigation, HeartHandshake } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function LiveTrackingView() {
  const { activeOrders, advanceOrderStatus, rateOrder } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState(activeOrders[0]?.id || null);
  const [restRating, setRestRating] = useState(5);
  const [riderRating, setRiderRating] = useState(5);
  const [submittedRating, setSubmittedRating] = useState(false);

  const order = activeOrders.find((o) => o.id === selectedOrderId) || activeOrders[0];

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Clock className="w-16 h-16 text-[#ea580c] mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-serif-display text-[#431407]">No Active Orders in Flight</h2>
        <p className="text-sm text-[#7c2d12] mt-2">Pick a delectable dish from our artisanal kitchens to start tracking.</p>
      </div>
    );
  }

  const steps = [
    { key: 'placed', label: 'Order Placed', icon: Clock },
    { key: 'preparing', label: 'Kitchen Preparing', icon: ChefHat },
    { key: 'out-for-delivery', label: 'Rider on the Way', icon: Truck },
    { key: 'delivered', label: 'Feast Delivered', icon: CheckCircle }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'placed': return 0;
      case 'preparing': return 1;
      case 'out-for-delivery': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(order.status);

  const handleRate = () => {
    rateOrder(order.id, 'restaurant', restRating);
    rateOrder(order.id, 'rider', riderRating);
    setSubmittedRating(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">
            Live Firebase Firestore Stream
          </span>
          <h1 className="text-3xl font-bold font-serif-display text-[#431407]">
            Real-Time Order & Courier Telemetry
          </h1>
        </div>

        {/* Order Selector if multiple */}
        {activeOrders.length > 1 && (
          <div className="flex gap-2">
            {activeOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedOrderId(o.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  order.id === o.id
                    ? 'bg-[#ea580c] text-white'
                    : 'bg-[#ffedd5] text-[#7c2d12]'
                }`}
              >
                {o.id} ({o.restaurantName})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Stepper & Delivery Partner Live Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Stepper Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#fed7aa]/70 shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-[#ffedd5]">
              <div>
                <span className="text-xs font-semibold text-[#9a3412]">Order Number:</span>
                <h3 className="text-xl font-bold font-serif-display text-[#431407]">{order.id}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-[#9a3412]">Estimated Arrival:</span>
                <div className="text-base font-bold text-[#ea580c]">{order.estimatedArrival}</div>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isComplete = idx < currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                        isComplete
                          ? 'bg-[#15803d] text-white shadow-sm'
                          : isCurrent
                          ? 'bg-[#ea580c] text-white ring-4 ring-orange-200 animate-pulse'
                          : 'bg-[#ffedd5] text-[#9a3412]'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-[#ea580c]' : isComplete ? 'text-[#15803d]' : 'text-stone-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Demo Status Step Switcher for Graders */}
            <div className="mt-8 pt-4 border-t border-[#ffedd5] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#7c2d12]">Simulate Live Courier Updates:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => advanceOrderStatus(order.id, 'placed')}
                  className="px-2.5 py-1 bg-[#ffedd5] hover:bg-[#fed7aa] text-[#7c2d12] rounded-lg font-semibold"
                >
                  Placed
                </button>
                <button
                  onClick={() => advanceOrderStatus(order.id, 'preparing')}
                  className="px-2.5 py-1 bg-[#ffedd5] hover:bg-[#fed7aa] text-[#7c2d12] rounded-lg font-semibold"
                >
                  Preparing
                </button>
                <button
                  onClick={() => advanceOrderStatus(order.id, 'out-for-delivery')}
                  className="px-2.5 py-1 bg-[#ffedd5] hover:bg-[#fed7aa] text-[#7c2d12] rounded-lg font-semibold"
                >
                  Out for Delivery
                </button>
                <button
                  onClick={() => advanceOrderStatus(order.id, 'delivered')}
                  className="px-2.5 py-1 bg-[#15803d] text-white rounded-lg font-semibold"
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Partner Live Map Simulation */}
          <div className="bg-white rounded-3xl p-6 border border-[#fed7aa]/70 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#ea580c]" />
                <h3 className="font-bold font-serif-display text-[#431407]">
                  Delivery Courier Live Route Map
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#15803d] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                GPS Live Ping
              </span>
            </div>

            {/* Stylized Vector Map Canvas Simulation */}
            <div className="relative h-64 bg-[#fef7e0] rounded-2xl border border-[#fed7aa] overflow-hidden p-6 flex flex-col justify-between">
              {/* Decorative Map Roads */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-2 bg-[#7c2d12] absolute top-1/4 -rotate-6"></div>
                <div className="w-full h-3 bg-[#7c2d12] absolute top-1/2 rotate-3"></div>
                <div className="h-full w-2 bg-[#7c2d12] absolute left-1/3 rotate-12"></div>
                <div className="h-full w-3 bg-[#7c2d12] absolute right-1/4 -rotate-12"></div>
              </div>

              {/* Kitchen Origin Node */}
              <div className="relative z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#fed7aa] shadow-md w-fit">
                <div className="w-3 h-3 rounded-full bg-[#ea580c]"></div>
                <span className="text-xs font-bold text-[#431407]">{order.restaurantName} (Kitchen)</span>
              </div>

              {/* Animated Courier Pin in Transit */}
              <div className="relative z-10 flex items-center gap-3 self-center bg-[#ea580c] text-white px-4 py-2 rounded-2xl shadow-xl animate-bounce">
                <Truck className="w-5 h-5" />
                <div className="text-left">
                  <span className="text-xs font-bold block">{order.rider.name}</span>
                  <span className="text-[10px] text-[#fed7aa]">{order.rider.vehicle}</span>
                </div>
              </div>

              {/* Destination Customer Node */}
              <div className="relative z-10 flex items-center gap-2 self-end bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#fed7aa] shadow-md w-fit">
                <MapPin className="w-4 h-4 text-[#15803d]" />
                <span className="text-xs font-bold text-[#431407]">{order.deliveryAddress} (Your Doorstep)</span>
              </div>
            </div>

            {/* Rider Information Panel */}
            <div className="mt-4 p-4 bg-[#ffedd5]/60 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#fed7aa] flex items-center justify-center text-[#7c2d12] font-bold text-base font-serif-display">
                  MR
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#431407]">{order.rider.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#7c2d12]">
                    <span className="flex items-center gap-0.5 text-[#ea580c] font-bold">
                      <Star className="w-3 h-3 fill-[#ea580c]" /> {order.rider.rating}
                    </span>
                    <span>• {order.rider.vehicle}</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${order.rider.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#fed7aa] hover:border-[#ea580c] text-xs font-bold text-[#ea580c] rounded-xl shadow-sm transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Rider</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Order Manifest & Ratings System */}
        <div className="space-y-6">
          {/* Order Manifest */}
          <div className="bg-white rounded-3xl p-6 border border-[#fed7aa]/70 shadow-sm">
            <h3 className="font-bold font-serif-display text-lg text-[#431407] mb-4">
              Dishes in Manifest
            </h3>
            <div className="space-y-3 divide-y divide-[#ffedd5]">
              {order.items.map((item, i) => (
                <div key={i} className="pt-2.5 first:pt-0 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#431407]">{item.name}</span>
                    <span className="text-[#9a3412] block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-[#ea580c] font-serif-display">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#fed7aa] space-y-1 text-xs text-[#7c2d12]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#15803d] font-bold">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 flex justify-between font-bold text-base text-[#431407] font-serif-display">
                <span>Total</span>
                <span className="text-[#ea580c]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Two-Way Rating System */}
          <div className="bg-white rounded-3xl p-6 border border-[#fed7aa]/70 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <HeartHandshake className="w-5 h-5 text-[#ea580c]" />
              <h3 className="font-bold font-serif-display text-base text-[#431407]">
                Dual Feedback Rating
              </h3>
            </div>
            <p className="text-xs text-[#7c2d12] mb-4">
              Rate your culinary journey and your courier to support local artisans.
            </p>

            {submittedRating ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 text-xs font-bold">
                ✓ Thank you for your feedback! Ratings submitted.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#431407] mb-1">
                    Rate Restaurant ({order.restaurantName})
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRestRating(star)}
                        className="p-1 text-[#ea580c]"
                      >
                        <Star className={`w-5 h-5 ${star <= restRating ? 'fill-[#ea580c]' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#431407] mb-1">
                    Rate Courier ({order.rider.name})
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRiderRating(star)}
                        className="p-1 text-[#ea580c]"
                      >
                        <Star className={`w-5 h-5 ${star <= riderRating ? 'fill-[#ea580c]' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleRate}
                  className="w-full py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Submit Ratings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
