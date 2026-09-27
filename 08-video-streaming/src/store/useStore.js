import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentUser: {
    id: 'usr-vip-901',
    name: 'Ronan Gallagher',
    subscriptionTier: '4K Ultra VIP', // 'Free' | 'Standard' | '4K Ultra VIP'
    parentalPin: '1234',
    isParentalUnlocked: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },

  activeCategory: 'All',
  watchlist: ['mov-1', 'mov-3'],
  heroLoopPlaying: false,

  featuredHero: {
    id: 'mov-1',
    title: 'SYNTHESIS: 2099',
    tagline: 'When artificial consciousness breaches human neural relays.',
    genre: 'Sci-Fi Cyberpunk',
    year: '2026',
    duration: '2h 18m',
    rating: 'TV-MA (18+)',
    tierRequired: 'Standard',
    resolution: '4K Dolby Vision',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },

  videos: [
    {
      id: 'mov-1',
      title: 'SYNTHESIS: 2099',
      category: 'Sci-Fi Cyberpunk',
      year: '2026',
      duration: '2h 18m',
      rating: 'TV-MA',
      tierRequired: 'Standard',
      resolution: '4K UHD',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: 'A rogue neural programmer investigates an algorithmic entity that has evolved past physical constraints in Neo-Shibuya.',
      progress: 65, // % watched
      matchScore: '98% Match'
    },
    {
      id: 'mov-2',
      title: 'THE CHRONO PARADOX',
      category: 'Sci-Fi Cyberpunk',
      year: '2025',
      duration: '1h 52m',
      rating: 'PG-13',
      tierRequired: 'Free',
      resolution: '1080p HD',
      thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      description: 'Quantum physicists uncover a timeline distortion originating inside an abandoned deep-sea particle collider.',
      progress: 30,
      matchScore: '94% Match'
    },
    {
      id: 'mov-3',
      title: 'ABYSSAL HORIZONS',
      category: 'Documentaries',
      year: '2026',
      duration: '1h 38m',
      rating: 'TV-PG',
      tierRequired: '4K Ultra VIP',
      resolution: '4K UHD IMAX',
      thumbnail: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      description: 'Ultra-deep ocean exploration revealing bioluminescent megastructures beneath Mariana Trench thermal vents.',
      progress: 85,
      matchScore: '99% Match'
    },
    {
      id: 'mov-4',
      title: 'SHADOW OF THE CITADEL',
      category: 'Thriller',
      year: '2026',
      duration: '2h 05m',
      rating: 'TV-MA',
      tierRequired: 'Standard',
      resolution: '4K UHD',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      description: 'An investigative syndicate uncovers a high-stakes conspiracy inside the sovereign financial towers of Zurich.',
      progress: 0,
      matchScore: '91% Match'
    },
    {
      id: 'mov-5',
      title: 'NEON VELOCITY',
      category: 'Action & Racing',
      year: '2026',
      duration: '1h 45m',
      rating: 'PG-13',
      tierRequired: 'Free',
      resolution: '1080p HD',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      description: 'Underground magnetic levitation street racers battle high-tech corporate enforcers through midnight highways.',
      progress: 0,
      matchScore: '89% Match'
    }
  ],

  // Actions
  toggleWatchlist: (videoId) => set((state) => ({
    watchlist: state.watchlist.includes(videoId)
      ? state.watchlist.filter((id) => id !== videoId)
      : [...state.watchlist, videoId]
  })),

  unlockParentalControl: (pin) => {
    if (pin === get().currentUser.parentalPin) {
      set({ currentUser: { ...get().currentUser, isParentalUnlocked: true } });
      return true;
    }
    return false;
  },

  lockParentalControl: () => set((state) => ({
    currentUser: { ...state.currentUser, isParentalUnlocked: false }
  })),

  toggleHeroLoop: () => set((state) => ({
    heroLoopPlaying: !state.heroLoopPlaying
  })),

  addVideo: (newVideo) => set((state) => ({
    videos: [
      {
        id: `mov-${Date.now()}`,
        title: newVideo.title,
        category: newVideo.category || 'Sci-Fi Cyberpunk',
        year: '2026',
        duration: newVideo.duration || '1h 30m',
        rating: newVideo.rating || 'PG-13',
        tierRequired: newVideo.tierRequired || 'Standard',
        resolution: '4K UHD',
        thumbnail: newVideo.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        description: newVideo.description,
        progress: 0,
        matchScore: '95% Match'
      },
      ...state.videos
    ]
  })),

  generateAiPoster: async (title) => {
    const posters = [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80'
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(posters[Math.floor(Math.random() * posters.length)]);
      }, 700);
    });
  }
}));
