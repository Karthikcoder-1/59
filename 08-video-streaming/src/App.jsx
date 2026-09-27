import React, { useState } from 'react';
import {
  Play,
  Plus,
  Check,
  Info,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Tv,
  Film,
  Sparkles,
  Sliders,
  X,
  Upload,
  Layers,
  Flame,
  Search
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    currentUser,
    featuredHero,
    videos,
    watchlist,
    heroLoopPlaying,
    toggleWatchlist,
    unlockParentalControl,
    lockParentalControl,
    toggleHeroLoop,
    addVideo,
    generateAiPoster
  } = useStore();

  const [activeCategory, setActiveCategory] = useState('All');
  const [activePlayerVideo, setActivePlayerVideo] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState('4K Ultra HD (2160p)');
  const [showStudioModal, setShowStudioModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Studio Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Sci-Fi Cyberpunk');
  const [uploadRating, setUploadRating] = useState('TV-MA');
  const [uploadTier, setUploadTier] = useState('Standard');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadPoster, setUploadPoster] = useState('');
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);

  const categories = ['All', 'Sci-Fi Cyberpunk', 'Thriller', 'Documentaries', 'Action & Racing'];

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter((v) => v.category === activeCategory);

  const handlePlayVideo = (video) => {
    if (video.rating.includes('18') || video.rating === 'TV-MA') {
      if (!currentUser.isParentalUnlocked) {
        setShowPinModal(true);
        return;
      }
    }
    setActivePlayerVideo(video);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    const success = unlockParentalControl(pinInput);
    if (success) {
      setShowPinModal(false);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleGeneratePoster = async () => {
    if (!uploadTitle.trim()) return;
    setIsGeneratingPoster(true);
    const poster = await generateAiPoster(uploadTitle);
    setUploadPoster(poster);
    setIsGeneratingPoster(false);
  };

  const handleStudioSubmit = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    addVideo({
      title: uploadTitle,
      category: uploadCategory,
      rating: uploadRating,
      tierRequired: uploadTier,
      description: uploadDesc || 'New cinematic release in creator studio.',
      thumbnail: uploadPoster
    });
    setShowStudioModal(false);
    setUploadTitle('');
    setUploadDesc('');
    setUploadPoster('');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-red-600">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bebas text-2xl tracking-tighter text-white shadow-lg shadow-red-600/40">
                C
              </div>
              <span className="font-bebas text-2xl tracking-wider text-red-600">
                CINESTREAM
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-300">
              <button
                onClick={() => setActiveCategory('All')}
                className={`transition ${activeCategory === 'All' ? 'text-white font-bold' : 'hover:text-white'}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveCategory('Sci-Fi Cyberpunk')}
                className={`transition ${activeCategory === 'Sci-Fi Cyberpunk' ? 'text-white font-bold' : 'hover:text-white'}`}
              >
                Sci-Fi
              </button>
              <button
                onClick={() => setActiveCategory('Thriller')}
                className={`transition ${activeCategory === 'Thriller' ? 'text-white font-bold' : 'hover:text-white'}`}
              >
                Thrillers
              </button>
              <button
                onClick={() => setActiveCategory('Documentaries')}
                className={`transition ${activeCategory === 'Documentaries' ? 'text-white font-bold' : 'hover:text-white'}`}
              >
                Docu-Series
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Parental Lock Toggle */}
            <button
              onClick={() => {
                if (currentUser.isParentalUnlocked) {
                  lockParentalControl();
                } else {
                  setShowPinModal(true);
                }
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition flex items-center gap-1.5 ${
                currentUser.isParentalUnlocked
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
            >
              {currentUser.isParentalUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              <span>{currentUser.isParentalUnlocked ? '18+ Unlocked' : 'PIN Lock'}</span>
            </button>

            {/* Creator Studio Upload */}
            <button
              onClick={() => setShowStudioModal(true)}
              className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-full text-xs font-bold transition flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Creator Studio</span>
            </button>

            {/* User VIP Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
              <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-red-600 to-amber-600 text-[10px] font-black uppercase tracking-wider">
                {currentUser.subscriptionTier}
              </span>
              <img src={currentUser.avatar} alt="User" className="w-8 h-8 rounded-full object-cover border border-neutral-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1">
        {/* EDGE-TO-EDGE HERO BANNER */}
        <div className="relative w-full h-[520px] bg-neutral-950 overflow-hidden">
          <img
            src={featuredHero.banner}
            alt={featuredHero.title}
            className="w-full h-full object-cover object-center opacity-60 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-12 left-4 md:left-12 max-w-2xl space-y-4 z-10">
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest">
                CINEMA ORIGINAL
              </span>
              <span className="text-amber-400 font-mono">{featuredHero.resolution}</span>
              <span className="text-neutral-400">{featuredHero.duration}</span>
              <span className="px-2 py-0.5 border border-neutral-700 rounded text-neutral-300 text-[10px]">
                {featuredHero.rating}
              </span>
            </div>

            <h1 className="font-bebas text-5xl md:text-7xl tracking-wider text-white drop-shadow-2xl leading-none">
              {featuredHero.title}
            </h1>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-xl">
              {featuredHero.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handlePlayVideo(videos[0])}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-red-600/30 transition transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-white" /> Watch 4K Stream
              </button>

              <button
                onClick={() => toggleWatchlist(featuredHero.id)}
                className="px-5 py-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 rounded-xl font-semibold text-xs flex items-center gap-2 backdrop-blur transition"
              >
                {watchlist.includes(featuredHero.id) ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> In Watchlist
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to List
                  </>
                )}
              </button>

              <button
                onClick={toggleHeroLoop}
                className={`px-4 py-3 rounded-xl text-xs font-semibold border flex items-center gap-2 transition ${
                  heroLoopPlaying
                    ? 'bg-red-950/60 border-red-600 text-red-400'
                    : 'bg-neutral-900/80 border-neutral-700 text-neutral-300'
                }`}
              >
                {heroLoopPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{heroLoopPlaying ? 'Synthesizer Audio Active' : 'Soundtrack Preview'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT ROWS */}
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
          {/* Row 1: Continue Watching */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 tracking-wide">
              <Tv className="w-4 h-4 text-red-500" /> Continue Watching for Ronan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.filter((v) => v.progress > 0).map((video) => (
                <div
                  key={video.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-red-600/50 transition shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-600/50">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </button>
                    {/* Playback Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-800">
                      <div className="h-full bg-red-600" style={{ width: `${video.progress}%` }} />
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{video.title}</h4>
                      <span className="text-xs text-neutral-400">{video.duration} • {video.progress}% watched</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{video.matchScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Row 2: Category Filter & Grid */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-red-500" /> Browse 4K HDR Library
              </h2>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1 rounded-full text-xs font-semibold transition ${
                      activeCategory === cat
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-red-600/60 transition shadow-xl flex flex-col justify-between"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-neutral-950">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-2 py-0.5 bg-black/70 backdrop-blur rounded text-[9px] font-mono text-amber-400 font-bold">
                        {video.resolution}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </button>
                  </div>

                  <div className="p-3 space-y-1">
                    <h4 className="font-bold text-xs text-white line-clamp-1">{video.title}</h4>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span>{video.year} • {video.rating}</span>
                      <span className="text-emerald-400 font-bold">{video.matchScore}</span>
                    </div>
                    <button
                      onClick={() => toggleWatchlist(video.id)}
                      className="w-full mt-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-[10px] font-semibold transition"
                    >
                      {watchlist.includes(video.id) ? '✓ In Watchlist' : '+ Watchlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* MODAL: 4K VIDEO PLAYER */}
      {activePlayerVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col">
            {/* Player Header */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-red-600 rounded text-[10px] font-black uppercase">
                  Adaptive HLS
                </span>
                <h3 className="font-bold text-sm text-white">{activePlayerVideo.title}</h3>
                <span className="text-xs text-neutral-400">({activePlayerVideo.duration})</span>
              </div>
              <button onClick={() => setActivePlayerVideo(null)} className="text-neutral-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Screen */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activePlayerVideo.thumbnail}
                alt={activePlayerVideo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl shadow-red-600/50">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/80 backdrop-blur p-3 rounded-2xl flex items-center justify-between border border-neutral-800">
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="text-red-500 font-mono">00:42:18 / 02:18:00</span>
                  <span className="text-neutral-400">• Buffer Health: 99.4% (Adaptive HLS)</span>
                </div>

                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                  <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="bg-neutral-800 text-xs text-white px-3 py-1 rounded-xl border border-neutral-700 focus:outline-none"
                  >
                    <option value="4K Ultra HD (2160p)">4K Ultra HD (2160p)</option>
                    <option value="1080p Full HD">1080p Full HD</option>
                    <option value="720p HD">720p HD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PARENTAL PIN UNLOCK */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 mx-auto flex items-center justify-center text-red-500">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Parental Control Lock</h3>
              <p className="text-xs text-neutral-400 mt-1">Enter your 4-digit PIN to access TV-MA & 18+ content (Default PIN: 1234)</p>
            </div>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full text-center tracking-widest text-2xl font-mono bg-neutral-950 border border-neutral-800 rounded-2xl py-3 text-white focus:outline-none focus:border-red-600"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-500 font-semibold">Incorrect PIN code. Please try again.</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300 hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-700 shadow-lg shadow-red-600/30"
                >
                  Unlock 18+
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATOR STUDIO UPLOAD */}
      {showStudioModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h3 className="text-base font-bold text-white">Creator Cinema Upload Studio</h3>
                <p className="text-xs text-neutral-400">Publish 4K Master with AI Poster generation</p>
              </div>
              <button onClick={() => setShowStudioModal(false)} className="text-neutral-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStudioSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">Film / Series Title</label>
                <input
                  type="text"
                  placeholder="E.g., Quantum Singularity"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Genre</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="Sci-Fi Cyberpunk">Sci-Fi</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Documentaries">Documentaries</option>
                    <option value="Action & Racing">Action</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Rating</label>
                  <select
                    value={uploadRating}
                    onChange={(e) => setUploadRating(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="PG-13">PG-13</option>
                    <option value="TV-MA">TV-MA (18+)</option>
                    <option value="TV-PG">TV-PG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 mb-1">Access Tier</label>
                  <select
                    value={uploadTier}
                    onChange={(e) => setUploadTier(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="Free">Free</option>
                    <option value="Standard">Standard</option>
                    <option value="4K Ultra VIP">4K Ultra VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">Synopsis / Description</label>
                <textarea
                  rows={2}
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  placeholder="Story synopsis..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-neutral-300">AI Poster Synthesizer</span>
                </div>
                <button
                  type="button"
                  onClick={handleGeneratePoster}
                  disabled={isGeneratingPoster || !uploadTitle}
                  className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-lg text-xs font-bold disabled:opacity-50"
                >
                  {isGeneratingPoster ? 'Synthesizing...' : 'Auto-Generate Poster'}
                </button>
              </div>

              {uploadPoster && (
                <div className="w-full h-24 rounded-xl overflow-hidden border border-neutral-700">
                  <img src={uploadPoster} alt="Poster" className="w-full h-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/30"
              >
                Publish to CineStream Catalog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cinematic Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-6 text-center text-xs text-neutral-500 font-mono">
        © 2026 CINESTREAM ENTERTAINMENT. FIREBASE STORAGE + ADAPTIVE HLS PROTOCOL ENGINE.
      </footer>
    </div>
  );
}
