import React, { useState } from 'react';
import {
  Car,
  Key,
  ShieldCheck,
  Gauge,
  Zap,
  Calendar,
  MapPin,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Sparkles,
  Plus,
  Sliders,
  DollarSign,
  ChevronRight,
  X
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    currentUser,
    activeRole,
    setActiveRole,
    vehicles,
    bookings,
    bookVehicle,
    addVehicle,
    generateAiCarPhoto
  } = useStore();

  const [activeTab, setActiveTab] = useState('fleet');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCarForBooking, setSelectedCarForBooking] = useState(null);
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  // Booking Form State
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-13');
  const [signatureName, setSignatureName] = useState(currentUser.name);
  const [agreementAgreed, setAgreementAgreed] = useState(true);

  // Admin New Car Form State
  const [newCarName, setNewCarName] = useState('');
  const [newCarCategory, setNewCarCategory] = useState('Track & Supercar');
  const [newCarRate, setNewCarRate] = useState(550);
  const [newCarHp, setNewCarHp] = useState('500 HP');
  const [newCarZeroSixty, setNewCarZeroSixty] = useState('3.2s');
  const [newCarLocation, setNewCarLocation] = useState('Los Angeles International (LAX)');
  const [newCarImage, setNewCarImage] = useState('');
  const [isGeneratingPhoto, setIsGeneratingPhoto] = useState(false);

  const locations = ['All', 'Los Angeles International (LAX)', 'Miami South Beach Pavilion', 'San Francisco Downtown'];
  const categories = ['All', 'Track & Supercar', 'Luxury SUV', 'Electric Performance'];

  const filteredVehicles = vehicles.filter((car) => {
    const matchesLoc = selectedLocation === 'All' || car.location === selectedLocation;
    const matchesCat = selectedCategory === 'All' || car.category === selectedCategory;
    return matchesLoc && matchesCat;
  });

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)));
    return diff;
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedCarForBooking || !agreementAgreed) return;
    const days = calculateDays(startDate, endDate);
    const subtotal = days * selectedCarForBooking.dailyRate;
    const total = subtotal * (1 - currentUser.discountRate);

    bookVehicle({
      carId: selectedCarForBooking.id,
      carName: selectedCarForBooking.name,
      startDate,
      endDate,
      days,
      totalPaid: total,
      location: selectedCarForBooking.location
    });

    setSelectedCarForBooking(null);
    setActiveTab('my-rentals');
  };

  const handleGenerateCarPhoto = async () => {
    if (!newCarName.trim()) return;
    setIsGeneratingPhoto(true);
    const photo = await generateAiCarPhoto(newCarName);
    setNewCarImage(photo);
    setIsGeneratingPhoto(false);
  };

  const handleCreateCar = (e) => {
    e.preventDefault();
    if (!newCarName.trim()) return;
    addVehicle({
      name: newCarName,
      category: newCarCategory,
      dailyRate: newCarRate,
      horsepower: newCarHp,
      zeroToSixty: newCarZeroSixty,
      location: newCarLocation,
      image: newCarImage
    });
    setShowAddCarModal(false);
    setNewCarName('');
    setNewCarImage('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Sleek Charcoal Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-500 font-condensed text-2xl font-bold shadow-lg">
              <Car className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-condensed text-2xl tracking-wider text-white block leading-none">
                APEX FLEET
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-semibold">
                Supercar & Performance Rentals
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-4 py-1.5 rounded-lg transition ${activeTab === 'fleet' ? 'bg-zinc-800 text-white font-bold border border-zinc-700' : 'text-zinc-400 hover:text-white'}`}
            >
              Browse Fleet ({vehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('my-rentals')}
              className={`px-4 py-1.5 rounded-lg transition ${activeTab === 'my-rentals' ? 'bg-zinc-800 text-white font-bold border border-zinc-700' : 'text-zinc-400 hover:text-white'}`}
            >
              My Reservations ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('admin-fleet')}
              className={`px-4 py-1.5 rounded-lg transition ${activeTab === 'admin-fleet' ? 'bg-zinc-800 text-white font-bold border border-zinc-700' : 'text-zinc-400 hover:text-white'}`}
            >
              Fleet Maintenance Console
            </button>
          </div>

          {/* Loyalty Status */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block">{currentUser.name}</span>
              <span className="text-[10px] font-mono text-amber-400 font-semibold">
                ★ {currentUser.loyaltyTier} (15% OFF)
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-amber-500/40 flex items-center justify-center font-bold text-amber-400 text-xs">
              AB
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        {/* VIEW 1: VEHICLE SEARCH & CATALOG */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            {/* Filter Hub */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                    Curated Exotic Inventory
                  </span>
                  <h1 className="font-condensed text-3xl tracking-wide text-white mt-0.5">
                    RESERVE HIGH-PERFORMANCE MACHINERY
                  </h1>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Grid with Angular Cut Corners */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((car) => {
                const discountedRate = Math.round(car.dailyRate * (1 - currentUser.discountRate));
                return (
                  <div
                    key={car.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300 font-bold border border-zinc-800">
                          {car.category}
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="font-condensed text-2xl tracking-wide text-white">{car.name}</h3>
                          <span className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" /> {car.location}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 text-center">
                          <div>
                            <span className="text-[9px] uppercase font-mono text-zinc-500">Power</span>
                            <div className="text-xs font-bold text-white font-mono mt-0.5">{car.horsepower}</div>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-mono text-zinc-500">0-60 MPH</span>
                            <div className="text-xs font-bold text-amber-400 font-mono mt-0.5">{car.zeroToSixty}</div>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-mono text-zinc-500">Top Speed</span>
                            <div className="text-xs font-bold text-white font-mono mt-0.5">{car.topSpeed}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-4">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase line-through">${car.dailyRate}/day</span>
                        <div className="text-lg font-black text-amber-400 font-mono leading-none">
                          ${discountedRate} <span className="text-xs text-zinc-400 font-normal">/ day</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCarForBooking(car)}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-condensed text-base font-bold tracking-wider transition shadow-lg shadow-amber-500/20"
                      >
                        RESERVE VEHICLE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: MY RESERVATIONS & DAMAGE VERIFICATION */}
        {activeTab === 'my-rentals' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="font-condensed text-3xl tracking-wide text-white">ACTIVE & HISTORICAL RESERVATIONS</h2>
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        {b.status} // #{b.id}
                      </span>
                      <h3 className="font-condensed text-2xl text-white mt-1">{b.carName}</h3>
                      <p className="text-xs text-zinc-400">{b.location} • {b.days} Days Reservation</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-zinc-500">Total Paid (VIP Rate)</span>
                      <div className="text-xl font-black text-amber-400 font-mono">${b.totalPaid.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-400" /> Digital Lease Agreement
                      </div>
                      <p className="text-zinc-400">Signed electronically by {signatureName} on file with 256-bit TLS hash.</p>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs space-y-2">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-amber-400" /> Pre-Pickup Vehicle Condition Telemetry
                      </div>
                      <div className="flex items-center gap-3">
                        <img src={b.pickupDamagePhoto} alt="Condition" className="w-16 h-10 object-cover rounded-lg border border-zinc-700" />
                        <span className="text-[11px] text-zinc-400">Zero structural blemishes logged at LAX hub.</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: ADMIN FLEET & MAINTENANCE MANAGER */}
        {activeTab === 'admin-fleet' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-condensed text-3xl tracking-wide text-white">FLEET TELEMETRY & MAINTENANCE CONSOLE</h2>
                <p className="text-xs text-zinc-400">Schedule brake rotations, tire swaps, and add exotic listings with AI photography</p>
              </div>
              <button
                onClick={() => setShowAddCarModal(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-condensed text-base font-bold tracking-wider transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> ADD EXOTIC TO FLEET
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vehicles.map((car) => (
                <div key={car.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">{car.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      car.maintenance.status.includes('Due') ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {car.maintenance.status}
                    </span>
                  </div>

                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs space-y-1">
                    <div className="text-zinc-400">Next Service: <strong className="text-white">{car.maintenance.nextService}</strong></div>
                    <div className="text-zinc-400">Last Inspection: <strong className="text-zinc-300">{car.maintenance.lastInspection}</strong></div>
                  </div>

                  <button
                    onClick={() => alert(`Service work order logged for ${car.name}`)}
                    className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-bold transition"
                  >
                    Log Scheduled Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: BOOKING & DIGITAL LEASE AGREEMENT */}
      {selectedCarForBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="font-condensed text-2xl text-white">RESERVE {selectedCarForBooking.name}</h3>
                <span className="text-xs text-amber-400 font-mono">Location: {selectedCarForBooking.location}</span>
              </div>
              <button onClick={() => setSelectedCarForBooking(null)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 mb-1">Pickup Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Digital Rental Agreement Box */}
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs space-y-2">
                <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block">
                  APEX BINDING RENTAL AGREEMENT
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed max-h-20 overflow-y-auto">
                  By executing this digital agreement, the lessee agrees to comply with speed protocols, track liability waivers, and ensure premium 93-octane fuel fill. Pre-existing condition telemetry photos are logged prior to departure.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreementAgreed}
                    onChange={(e) => setAgreementAgreed(e.target.checked)}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <label htmlFor="agree" className="text-xs font-bold text-white cursor-pointer">
                    I accept legal terms & telemetry liability
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono block">Estimated Total</span>
                  <div className="text-xl font-black text-amber-400 font-mono">
                    ${(calculateDays(startDate, endDate) * selectedCarForBooking.dailyRate * (1 - currentUser.discountRate)).toFixed(2)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!agreementAgreed}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-condensed text-lg font-bold rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  CONFIRM & SIGN LEASE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW CAR WITH AI GENERATOR */}
      {showAddCarModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="font-condensed text-2xl text-white">ADD EXOTIC TO APEX FLEET</h3>
              <button onClick={() => setShowAddCarModal(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCar} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Make & Model</label>
                <input
                  type="text"
                  placeholder="E.g., Ferrari 296 GTB Assetto Fiorano"
                  value={newCarName}
                  onChange={(e) => setNewCarName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    value={newCarRate}
                    onChange={(e) => setNewCarRate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 mb-1">Horsepower</label>
                  <input
                    type="text"
                    value={newCarHp}
                    onChange={(e) => setNewCarHp(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 mb-1">0-60 MPH</label>
                  <input
                    type="text"
                    value={newCarZeroSixty}
                    onChange={(e) => setNewCarZeroSixty(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-zinc-300">AI Listing Photo Synthesizer</span>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateCarPhoto}
                  disabled={isGeneratingPhoto || !newCarName}
                  className="px-3 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-bold disabled:opacity-50"
                >
                  {isGeneratingPhoto ? 'Generating...' : 'Auto-Generate Photo'}
                </button>
              </div>

              {newCarImage && (
                <div className="w-full h-24 rounded-xl overflow-hidden border border-zinc-700">
                  <img src={newCarImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-condensed text-lg font-bold rounded-xl tracking-wider transition shadow-lg shadow-amber-500/20"
              >
                PUBLISH TO ACTIVE FLEET
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-[#09090b] py-6 text-center text-xs text-zinc-500 font-mono">
        © 2026 APEX AUTO EXOTICS. SUPABASE / POSTGRESQL FLEET RELATIONAL SCHEMA.
      </footer>
    </div>
  );
}
