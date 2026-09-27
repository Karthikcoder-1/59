import React from 'react';
import { Star, Clock, MapPin, DollarSign, ChevronRight } from 'lucide-react';

export default function RestaurantCard({ restaurant, onOpenMenu }) {
  return (
    <div
      onClick={() => onOpenMenu(restaurant)}
      className="group bg-white rounded-3xl overflow-hidden border border-[#fed7aa]/60 hover:border-[#ea580c] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ffedd5]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-[#431407]/85 backdrop-blur-md text-[#fed7aa] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          {restaurant.cuisine}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#7c2d12] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#ea580c] text-[#ea580c]" />
          <span>{restaurant.rating}</span>
          <span className="text-stone-400 font-normal">({restaurant.reviewCount})</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif-display text-[#431407] group-hover:text-[#ea580c] transition-colors">
            {restaurant.name}
          </h3>
          <p className="mt-1 text-xs text-[#9a3412] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{restaurant.address}</span>
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#ffedd5] flex items-center justify-between text-xs font-semibold text-[#7c2d12]">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#9a3412] font-normal">Fee:</span>
            <span>${restaurant.deliveryFee}</span>
          </div>
          <div className="flex items-center text-[#ea580c] font-bold group-hover:translate-x-1 transition-transform">
            <span>View Menu</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
