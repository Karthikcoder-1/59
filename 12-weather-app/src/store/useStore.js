import { create } from 'zustand';

export const useStore = create((set, get) => ({
  unit: 'C', // 'C' | 'F'
  toggleUnit: () => set((state) => ({ unit: state.unit === 'C' ? 'F' : 'C' })),

  activeLocationId: 'loc-1',

  locations: [
    {
      id: 'loc-1',
      city: 'Reykjavik',
      country: 'Iceland',
      coords: '64.1466° N, 21.9426° W',
      timeOfDay: 'Daylight',
      currentTempC: 8,
      condition: 'Partly Cloudy & Crisp',
      icon: 'CloudSun',
      feelsLikeC: 5,
      humidity: '68%',
      windSpeed: '18 km/h NNW',
      uvIndex: '2 (Low)',
      aqi: '12 (Pristine)',
      visibility: '10 km',
      pressure: '1014 hPa',
      tips: [
        'Wind chill active — layered wool or windbreaker advised.',
        'Optimal atmospheric clarity for Aurora Borealis spotting tonight.'
      ],
      severeAlert: null,
      hourly: [
        { time: '12 PM', tempC: 8, pop: '10%' },
        { time: '1 PM', tempC: 9, pop: '15%' },
        { time: '2 PM', tempC: 9, pop: '20%' },
        { time: '3 PM', tempC: 8, pop: '40%' },
        { time: '4 PM', tempC: 7, pop: '60%' },
        { time: '5 PM', tempC: 6, pop: '20%' }
      ],
      sevenDay: [
        { day: 'Today', highC: 9, lowC: 4, condition: 'Partly Cloudy', pop: '20%' },
        { day: 'Mon', highC: 8, lowC: 3, condition: 'Scattered Showers', pop: '70%' },
        { day: 'Tue', highC: 7, lowC: 2, condition: 'Coastal Wind', pop: '40%' },
        { day: 'Wed', highC: 9, lowC: 4, condition: 'Sunny Spells', pop: '10%' },
        { day: 'Thu', highC: 10, lowC: 5, condition: 'Clear Skies', pop: '5%' },
        { day: 'Fri', highC: 8, lowC: 3, condition: 'Overcast', pop: '30%' },
        { day: 'Sat', highC: 6, lowC: 1, condition: 'Light Sleet', pop: '50%' }
      ]
    },
    {
      id: 'loc-2',
      city: 'Tokyo',
      country: 'Japan',
      coords: '35.6762° N, 139.6503° E',
      timeOfDay: 'Dusk',
      currentTempC: 22,
      condition: 'Humid & Overcast',
      icon: 'CloudRain',
      feelsLikeC: 24,
      humidity: '79%',
      windSpeed: '12 km/h SE',
      uvIndex: '5 (Moderate)',
      aqi: '28 (Good)',
      visibility: '8 km',
      pressure: '1008 hPa',
      tips: [
        'Intermittent evening precipitation expected — carry a compact umbrella.',
        'Elevated humidity — stay hydrated during commutes.'
      ],
      severeAlert: 'Advisory: Coastal Gale Warning active along Tokyo Bay (25-35 kts).',
      hourly: [
        { time: '6 PM', tempC: 22, pop: '40%' },
        { time: '7 PM', tempC: 21, pop: '80%' },
        { time: '8 PM', tempC: 20, pop: '75%' },
        { time: '9 PM', tempC: 19, pop: '50%' },
        { time: '10 PM', tempC: 19, pop: '20%' },
        { time: '11 PM', tempC: 18, pop: '10%' }
      ],
      sevenDay: [
        { day: 'Today', highC: 24, lowC: 18, condition: 'Showers', pop: '80%' },
        { day: 'Mon', highC: 26, lowC: 19, condition: 'Clear', pop: '10%' },
        { day: 'Tue', highC: 27, lowC: 20, condition: 'Sunny', pop: '5%' },
        { day: 'Wed', highC: 25, lowC: 19, condition: 'Overcast', pop: '35%' },
        { day: 'Thu', highC: 23, lowC: 17, condition: 'Rain', pop: '90%' },
        { day: 'Fri', highC: 22, lowC: 16, condition: 'Cloudy', pop: '20%' },
        { day: 'Sat', highC: 24, lowC: 18, condition: 'Pleasant', pop: '15%' }
      ]
    },
    {
      id: 'loc-3',
      city: 'San Francisco',
      country: 'United States',
      coords: '37.7749° N, 122.4194° W',
      timeOfDay: 'Daylight',
      currentTempC: 16,
      condition: 'Maritime Fog Clearing',
      icon: 'Sun',
      feelsLikeC: 15,
      humidity: '72%',
      windSpeed: '22 km/h W',
      uvIndex: '6 (High)',
      aqi: '18 (Pristine)',
      visibility: '12 km',
      pressure: '1016 hPa',
      tips: [
        'UV Index peaking at 6.0 at 1:30 PM — apply SPF 30 sunscreen.',
        'High afternoon gusts near Golden Gate Bridge.'
      ],
      severeAlert: null,
      hourly: [
        { time: '12 PM', tempC: 16, pop: '0%' },
        { time: '1 PM', tempC: 17, pop: '0%' },
        { time: '2 PM', tempC: 18, pop: '0%' },
        { time: '3 PM', tempC: 17, pop: '0%' },
        { time: '4 PM', tempC: 16, pop: '5%' },
        { time: '5 PM', tempC: 15, pop: '10%' }
      ],
      sevenDay: [
        { day: 'Today', highC: 18, lowC: 12, condition: 'Sunny', pop: '0%' },
        { day: 'Mon', highC: 19, lowC: 13, condition: 'Clear', pop: '0%' },
        { day: 'Tue', highC: 17, lowC: 12, condition: 'Foggy Morning', pop: '10%' },
        { day: 'Wed', highC: 18, lowC: 12, condition: 'Partly Sunny', pop: '5%' },
        { day: 'Thu', highC: 20, lowC: 13, condition: 'Warm', pop: '0%' },
        { day: 'Fri', highC: 18, lowC: 11, condition: 'Breezy', pop: '0%' },
        { day: 'Sat', highC: 17, lowC: 12, condition: 'Coast Clouds', pop: '15%' }
      ]
    }
  ],

  // Actions
  setActiveLocationId: (id) => set({ activeLocationId: id }),

  convertTemp: (tempC) => {
    const unit = get().unit;
    if (unit === 'F') {
      return Math.round((tempC * 9) / 5 + 32);
    }
    return tempC;
  }
}));
