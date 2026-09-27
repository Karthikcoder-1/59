import { create } from 'zustand';

export const useStore = create((set, get) => ({
  user: {
    name: 'Alexander Vance',
    passportVerified: true,
    loyaltyTier: 'Platinum Globetrotter (142,000 Miles)'
  },

  destinations: [
    {
      id: 'dest-1',
      city: 'Santorini',
      country: 'Greece',
      tagline: 'Aegean Caldera Vistas & Sunset Domes',
      flightFrom: 420,
      hotelFrom: 180,
      cabFrom: 45,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      rating: 4.95,
      weather: '26°C Sunny'
    },
    {
      id: 'dest-2',
      city: 'Kyoto',
      country: 'Japan',
      tagline: 'Ancient Bamboo Groves & Zen Sanctuaries',
      flightFrom: 840,
      hotelFrom: 160,
      cabFrom: 35,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      rating: 4.98,
      weather: '21°C Clear'
    },
    {
      id: 'dest-3',
      city: 'Reykjavik & Geysir',
      country: 'Iceland',
      tagline: 'Volcanic Basalt Columns & Aurora Skies',
      flightFrom: 510,
      hotelFrom: 220,
      cabFrom: 70,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
      rating: 4.92,
      weather: '8°C Northern Lights'
    }
  ],

  flights: [
    { id: 'fl-1', airline: 'AeroLux Flagship', flightNo: 'AL-882', depart: '08:30 JFK', arrive: '22:15 JTR', duration: '8h 45m (Nonstop)', price: 420, class: 'Economy Extra' },
    { id: 'fl-2', airline: 'Helios Airways', flightNo: 'HA-409', depart: '14:00 EWR', arrive: '06:30 ATH', duration: '9h 30m (1 Stop)', price: 360, class: 'Economy' },
    { id: 'fl-3', airline: 'Sovereign First', flightNo: 'SF-101', depart: '21:00 JFK', arrive: '11:45 JTR', duration: '7h 45m (Direct)', price: 1450, class: 'Private Suite' }
  ],

  hotels: [
    { id: 'ht-1', name: 'Canaves Oia Suites & Cliff Spa', stars: 5, pricePerNight: 280, rating: 4.9, amenities: ['Infinity Pool', 'Caldera View', 'Champagne Breakfast'] },
    { id: 'ht-2', name: 'Mystique Luxury Collection Resort', stars: 5, pricePerNight: 340, rating: 4.95, amenities: ['Private Plunge Pool', 'Wine Cave', 'Helipad'] }
  ],

  savedTrips: [
    {
      id: 'trip-101',
      title: 'Mediterranean Autumn Odyssey',
      destination: 'Santorini, Greece',
      dates: 'Oct 14 - Oct 21, 2026',
      totalCost: 1980,
      status: 'Confirmed & Ticketed',
      itineraryDays: [
        { day: 'Day 1', title: 'Arrival in Fira & Cliffside Welcome Dinner' },
        { day: 'Day 2', title: 'Catamaran Caldera Cruise & Volcanic Springs' },
        { day: 'Day 3', title: 'Oia Sunset Photography & Vineyard Tasting' }
      ]
    }
  ],

  travelAlerts: [
    { id: 'alt-1', type: 'Price Drop', message: 'Kyoto Autumn Foliage flights dropped by $120 for November departures!', code: 'KYOTO-120' },
    { id: 'alt-2', type: 'Advisory', message: 'Icelandic High-Plateau F-Roads require 4x4 vehicles due to early frost.', code: 'IS-WEATHER' }
  ],

  // Actions
  bookTrip: (tripData) => set((state) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      title: tripData.title || 'Spontaneous Getaway',
      destination: tripData.destination || 'Kyoto, Japan',
      dates: tripData.dates || 'Nov 02 - Nov 09, 2026',
      totalCost: Number(tripData.totalCost || 1200),
      status: 'Confirmed & Ticketed',
      itineraryDays: [
        { day: 'Day 1', title: 'Arrive at destination & check in to luxury suite' },
        { day: 'Day 2', title: 'Guided local cultural exploration and culinary tour' },
        { day: 'Day 3', title: 'Full day adventure & scenic excursion' }
      ]
    };
    return {
      savedTrips: [newTrip, ...state.savedTrips]
    };
  })
}));
