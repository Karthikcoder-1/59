import React, { useState } from 'react';
import {
  Cloud,
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Compass,
  Thermometer,
  ShieldAlert,
  Sparkles,
  MapPin,
  Layers,
  Radio,
  Play,
  Pause,
  Umbrella,
  Sunrise,
  Sunset
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    unit,
    toggleUnit,
    locations,
    activeLocationId,
    setActiveLocationId,
    convertTemp
  } = useStore();

  const [activeRadarLayer, setActiveRadarLayer] = useState('precipitation');
  const [radarPlaying, setRadarPlaying] = useState(true);

  const activeLoc = locations.find((l) => l.id === activeLocationId) || locations[0];

  const getConditionIcon = (iconName) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-12 h-12 text-amber-300 animate-spin-slow" />;
      case 'CloudSun':
        return <CloudSun className="w-12 h-12 text-sky-200" />;
      case 'CloudRain':
        return <CloudRain className="w-12 h-12 text-blue-200" />;
      default:
        return <Cloud className="w-12 h-12 text-slate-200" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 flex flex-col justify-between ${
      activeLoc.timeOfDay === 'Daylight'
        ? 'bg-gradient-to-br from-sky-400 via-sky-600 to-indigo-800 text-white'
        : 'bg-gradient-to-br from-indigo-900 via-slate-900 to-[#0b0f19] text-white'
    }`}>
      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-lg">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight block leading-none">
                AETHER METEO
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-200 font-semibold">
                Atmospheric Intelligence & Radar
              </span>
            </div>
          </div>

          {/* Location Selector Pills */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-2xl border border-white/20 text-xs font-semibold">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveLocationId(loc.id)}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeLocationId === loc.id
                    ? 'bg-white text-slate-900 font-bold shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {loc.city}
              </button>
            ))}
          </div>

          {/* Unit Toggle */}
          <button
            onClick={toggleUnit}
            className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl font-mono text-xs font-black transition shadow-sm"
          >
            °{unit} Switch
          </button>
        </div>
      </header>

      {/* Main Weather Container */}
      <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 space-y-6">
        {/* Severe Weather Alert if Active */}
        {activeLoc.severeAlert && (
          <div className="glass-panel p-4 rounded-3xl border-l-4 border-amber-400 flex items-center gap-3 shadow-xl">
            <ShieldAlert className="w-6 h-6 text-amber-300 flex-shrink-0" />
            <div className="text-xs">
              <strong className="text-amber-200 uppercase tracking-wide">Severe Weather Telemetry:</strong>{' '}
              <span>{activeLoc.severeAlert}</span>
            </div>
          </div>
        )}

        {/* Hero Current Conditions Card */}
        <div className="glass-panel rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-200">
                <MapPin className="w-4 h-4" /> {activeLoc.coords} • {activeLoc.country}
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-1">
                {activeLoc.city}
              </h1>
              <p className="text-sm font-semibold text-white/90 mt-1 flex items-center gap-2">
                {activeLoc.condition} • Feels like {convertTemp(activeLoc.feelsLikeC)}°{unit}
              </p>
            </div>

            <div className="flex items-center gap-6">
              {getConditionIcon(activeLoc.icon)}
              <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter">
                {convertTemp(activeLoc.currentTempC)}°
              </div>
            </div>
          </div>

          {/* Detailed Metric Widgets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 text-center">
              <Droplets className="w-4 h-4 text-sky-200 mx-auto" />
              <span className="text-[10px] uppercase font-mono text-sky-100 block mt-1">Humidity</span>
              <div className="text-sm font-bold mt-0.5">{activeLoc.humidity}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 text-center">
              <Wind className="w-4 h-4 text-sky-200 mx-auto" />
              <span className="text-[10px] uppercase font-mono text-sky-100 block mt-1">Wind</span>
              <div className="text-sm font-bold mt-0.5">{activeLoc.windSpeed}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 text-center">
              <Sun className="w-4 h-4 text-amber-300 mx-auto" />
              <span className="text-[10px] uppercase font-mono text-sky-100 block mt-1">UV Index</span>
              <div className="text-sm font-bold mt-0.5">{activeLoc.uvIndex}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 text-center">
              <Sparkles className="w-4 h-4 text-emerald-300 mx-auto" />
              <span className="text-[10px] uppercase font-mono text-sky-100 block mt-1">Air Quality</span>
              <div className="text-sm font-bold mt-0.5">{activeLoc.aqi}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 text-center">
              <Eye className="w-4 h-4 text-sky-200 mx-auto" />
              <span className="text-[10px] uppercase font-mono text-sky-100 block mt-1">Visibility</span>
              <div className="text-sm font-bold mt-0.5">{activeLoc.visibility}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 text-center">
              <Compass className="w-4 h-4 text-sky-200 mx-auto" />
              <span className="text-[10px] uppercase font-mono text-sky-100 block mt-1">Barometer</span>
              <div className="text-sm font-bold mt-0.5">{activeLoc.pressure}</div>
            </div>
          </div>

          {/* Personalized Lifestyle Intelligence Tips */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-sky-200 font-bold flex items-center gap-1.5">
              <Umbrella className="w-3.5 h-3.5" /> Meteorological Lifestyle Recommendations
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {activeLoc.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 bg-black/15 p-2.5 rounded-xl border border-white/10">
                  <span className="text-sky-300 font-bold">✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 24-Hour Hourly Breakdown */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
            24-Hour Atmospheric Curve & Precipitation Probability
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {activeLoc.hourly.map((h, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-3 text-center border border-white/15 space-y-1">
                <span className="text-[11px] font-mono text-sky-200">{h.time}</span>
                <div className="text-lg font-black font-mono">{convertTemp(h.tempC)}°</div>
                <span className="text-[10px] font-bold text-sky-300 block">{h.pop} Rain</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid: 7-Day Forecast & Interactive Doppler Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 7-Day Extended Forecast */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
              7-Day Synoptic Forecast
            </h3>
            <div className="space-y-2.5">
              {activeLoc.sevenDay.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl border border-white/10 text-xs">
                  <span className="w-16 font-bold">{d.day}</span>
                  <span className="flex-1 text-sky-200 text-[11px] font-medium">{d.condition} ({d.pop})</span>
                  <div className="font-mono font-bold space-x-2">
                    <span className="text-white">{convertTemp(d.highC)}°</span>
                    <span className="text-white/60">{convertTemp(d.lowC)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Doppler Radar & Map Overlay */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-sky-300 animate-pulse" /> Live High-Res Doppler Radar
                </h3>
                <div className="flex gap-1 bg-black/20 p-1 rounded-xl border border-white/20 text-[10px] font-semibold">
                  <button
                    onClick={() => setActiveRadarLayer('precipitation')}
                    className={`px-2 py-1 rounded-lg ${activeRadarLayer === 'precipitation' ? 'bg-white text-slate-900 font-bold' : 'text-white/80'}`}
                  >
                    Precipitation
                  </button>
                  <button
                    onClick={() => setActiveRadarLayer('clouds')}
                    className={`px-2 py-1 rounded-lg ${activeRadarLayer === 'clouds' ? 'bg-white text-slate-900 font-bold' : 'text-white/80'}`}
                  >
                    Cloud Mass
                  </button>
                  <button
                    onClick={() => setActiveRadarLayer('wind')}
                    className={`px-2 py-1 rounded-lg ${activeRadarLayer === 'wind' ? 'bg-white text-slate-900 font-bold' : 'text-white/80'}`}
                  >
                    Wind Vectors
                  </button>
                </div>
              </div>

              {/* Radar Map Simulation Stage */}
              <div className="relative mt-4 aspect-video rounded-2xl overflow-hidden border border-white/20 bg-slate-950 flex items-center justify-center">
                {/* Radar Grid Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="absolute w-48 h-48 rounded-full border border-sky-400/40 animate-ping" />
                <div className="absolute w-72 h-72 rounded-full border border-sky-400/20" />

                <div className="relative z-10 text-center space-y-1">
                  <div className="px-3 py-1 bg-sky-500/30 border border-sky-400 text-sky-200 rounded-full text-xs font-mono font-bold backdrop-blur">
                    {activeLoc.city} Synoptic Radar Scan: OK
                  </div>
                  <span className="text-[10px] text-white/60 font-mono block">
                    Telemetry Stream: Open-Meteo API v2.4 (Live)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-sky-200 pt-2 border-t border-white/10">
              <span>Radar Resolution: 1km² Grid</span>
              <button
                onClick={() => setRadarPlaying(!radarPlaying)}
                className="flex items-center gap-1 font-bold text-white hover:text-sky-200"
              >
                {radarPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{radarPlaying ? 'Pause Loop' : 'Play Loop'}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Atmospheric Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-6 text-center text-xs text-white/60 font-mono">
        © 2026 AETHER METEO. PUBLIC SYNOPTIC METEOROLOGICAL API INTEGRATION.
      </footer>
    </div>
  );
}
