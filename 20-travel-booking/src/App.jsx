import React, { useState } from 'react';
import {
  Plane,
  Building2,
  Car,
  MapPin,
  Calendar,
  Compass,
  Star,
  Tag,
  AlertCircle,
  PlusCircle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    user,
    destinations,
    flights,
    hotels,
    savedTrips,
    travelAlerts,
    bookTrip
  } = useStore();

  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'flights' | 'hotels' | 'trips' | 'alerts'
  const [selectedDest, setSelectedDest] = useState(destinations[0]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    bookTrip({
      title: `${selectedDest.city} Luxury Getaway`,
      destination: `${selectedDest.city}, ${selectedDest.country}`,
      totalCost: selectedDest.flightFrom + (selectedDest.hotelFrom * 3) + selectedDest.cabFrom
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowBookingModal(false);
      setActiveTab('trips');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans">
      {/* Sunset Gradient Wanderlust Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#ec4899] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                WANDERLUST // EXPLORER
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#f97316] to-[#ec4899] font-bold">
                Unified Flights • Suites • Itinerary Engine
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-[#1e293b] p-1 rounded-2xl border border-slate-700 text-xs font-semibold text-slate-300">
            {[
              { id: 'search', label: 'Destinations', icon: Compass },
              { id: 'flights', label: 'Flights Grid', icon: Plane },
              { id: 'hotels', label: 'Luxury Stays', icon: Building2 },
              { id: 'trips', label: 'Saved Trips', icon: MapPin },
              { id: 'alerts', label: 'Price Alerts', icon: TrendingDown }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white font-bold shadow-md shadow-orange-500/20'
                      : 'hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* User Loyalty Status */}
          <div className="hidden sm:block text-right text-xs font-mono">
            <span className="font-bold text-white block">{user.name}</span>
            <span className="text-[10px] text-orange-400 font-semibold">{user.loyaltyTier}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* VIEW 1: DESTINATIONS & COMBINED SEARCH */}
        {activeTab === 'search' && (
          <div className="space-y-8">
            {/* Search Filter Bar */}
            <div className="bg-[#1e293b] border border-slate-700 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-[#0f172a] p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Departure Hub</span>
                  <span className="text-sm font-bold text-white">New York (JFK)</span>
                </div>
                <div className="bg-[#0f172a] p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Travel Window</span>
                  <span className="text-sm font-bold text-white">Oct 15 - Nov 20, 2026</span>
                </div>
                <div className="bg-[#0f172a] p-3 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Travelers & Class</span>
                  <span className="text-sm font-bold text-white">2 Adults • Premium</span>
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Discover Rates
              </button>
            </div>

            {/* Curated Destination Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" /> Curated Seasonal Expeditions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-[#1e293b] border border-slate-800 hover:border-orange-500/60 rounded-3xl overflow-hidden shadow-xl transition space-y-4 flex flex-col justify-between group"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.city}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-mono font-bold text-orange-400 border border-orange-500/30">
                        ★ {dest.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-xl text-xs font-mono text-slate-200">
                        {dest.weather}
                      </div>
                    </div>

                    <div className="px-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">{dest.city}, {dest.country}</h3>
                      </div>
                      <p className="text-xs text-slate-400">{dest.tagline}</p>

                      <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                        <div className="p-2 bg-[#0f172a] rounded-xl">
                          <Plane className="w-3.5 h-3.5 text-orange-400 mx-auto" />
                          <span className="text-[10px] text-slate-400 block mt-0.5">Flight</span>
                          <span className="font-bold text-white">${dest.flightFrom}</span>
                        </div>
                        <div className="p-2 bg-[#0f172a] rounded-xl">
                          <Building2 className="w-3.5 h-3.5 text-pink-400 mx-auto" />
                          <span className="text-[10px] text-slate-400 block mt-0.5">Hotel/nt</span>
                          <span className="font-bold text-white">${dest.hotelFrom}</span>
                        </div>
                        <div className="p-2 bg-[#0f172a] rounded-xl">
                          <Car className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
                          <span className="text-[10px] text-slate-400 block mt-0.5">Transfer</span>
                          <span className="font-bold text-white">${dest.cabFrom}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => {
                          setSelectedDest(dest);
                          setShowBookingModal(true);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#f97316] to-[#ec4899] hover:opacity-90 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/20"
                      >
                        Build Complete Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FLIGHTS FARE COMPARISON */}
        {activeTab === 'flights' && (
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white">Direct Flight Schedules & Route Comparison</h2>
            <div className="space-y-3">
              {flights.map((fl) => (
                <div key={fl.id} className="p-4 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <span className="text-orange-400 font-bold">{fl.airline} ({fl.flightNo})</span>
                    <div className="text-sm font-bold text-white font-sans mt-0.5">{fl.depart} → {fl.arrive}</div>
                    <span className="text-slate-400 text-[11px]">Duration: {fl.duration} • Class: {fl.class}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-white font-sans">${fl.price}</span>
                    <button
                      onClick={() => alert(`Seat confirmed on ${fl.flightNo}. Added to itinerary.`)}
                      className="px-4 py-2 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white rounded-xl font-bold"
                    >
                      Select Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: HOTELS */}
        {activeTab === 'hotels' && (
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white">Verified 5-Star Boutique & Cliffside Resorts</h2>
            <div className="space-y-3">
              {hotels.map((ht) => (
                <div key={ht.id} className="p-5 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{ht.name}</h4>
                      <span className="text-xs font-mono text-amber-400">{'★'.repeat(ht.stars)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ht.amenities.map((am, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <span className="text-xl font-bold text-white">${ht.pricePerNight}</span>
                      <span className="text-[10px] text-slate-400 block">/ night</span>
                    </div>
                    <button
                      onClick={() => alert(`Suite reserved at ${ht.name}.`)}
                      className="px-4 py-2 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white rounded-xl text-xs font-bold"
                    >
                      Reserve Suite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: SAVED TRIPS & ITINERARY BUILDER */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white">Confirmed Itineraries & Saved Trips ({savedTrips.length})</h2>
                <span className="text-xs font-mono text-emerald-400">● Amadeus API Real-Time Sync</span>
              </div>

              <div className="space-y-4">
                {savedTrips.map((trip) => (
                  <div key={trip.id} className="p-6 bg-[#0f172a] border border-slate-800 rounded-3xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">{trip.title}</h3>
                        <p className="text-xs text-orange-400 font-mono">{trip.destination} • {trip.dates}</p>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-xs text-slate-400">Total Billed: </span>
                        <span className="text-lg font-bold text-white">${trip.totalCost}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2 font-mono text-xs">
                      {trip.itineraryDays.map((d, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-[#1e293b] rounded-xl">
                          <span className="px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30 text-[10px]">
                            {d.day}
                          </span>
                          <span className="text-slate-200">{d.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: PRICE DROP ALERTS */}
        {activeTab === 'alerts' && (
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white">Real-Time Travel Notifications & Fare Watch</h2>
            <div className="space-y-3">
              {travelAlerts.map((alt) => (
                <div key={alt.id} className="p-4 bg-[#0f172a] border border-slate-800 rounded-2xl flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 flex-shrink-0">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-slate-800 text-orange-400 px-2 py-0.5 rounded font-bold">
                      {alt.type}
                    </span>
                    <p className="text-xs text-slate-200 mt-1">{alt.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: BOOKING SUMMARY */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Confirm All-Inclusive Travel Package</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-base text-white">Booking Confirmed!</h4>
                <p className="text-xs text-slate-400 font-mono">Dispatched flight tickets and hotel vouchers to your email.</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-[#0f172a] rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="text-white font-bold">{selectedDest.city}, {selectedDest.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nonstop Roundtrip Flight:</span>
                    <span className="text-white font-bold">${selectedDest.flightFrom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">3 Nights Luxury Suite:</span>
                    <span className="text-white font-bold">${selectedDest.hotelFrom * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Private Airport Transfer:</span>
                    <span className="text-white font-bold">${selectedDest.cabFrom}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-sans font-bold">
                    <span className="text-slate-200">Total All-Inclusive:</span>
                    <span className="text-orange-400 font-mono">
                      ${selectedDest.flightFrom + (selectedDest.hotelFrom * 3) + selectedDest.cabFrom}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="w-1/2 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold font-sans"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white rounded-xl text-xs font-bold font-sans uppercase tracking-wider shadow-lg shadow-orange-500/20"
                  >
                    Instant Reserve
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0b1120] py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 WANDERLUST GLOBAL TRAVEL NETWORKS. AMADEUS / SABRE GDS DISTRIBUTED APIS.
      </footer>
    </div>
  );
}
