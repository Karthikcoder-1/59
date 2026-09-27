import { create } from 'zustand';

export const useStore = create((set, get) => ({
  user: {
    name: 'Marcus Vance',
    athleteTier: 'Kinetic Elite // Division I',
    restingHeartRate: 54,
    currentHeartRate: 138,
    vo2Max: 56.4,
    recoveryScore: 89,
    streakDays: 19
  },

  goals: {
    steps: 12500,
    calories: 2800,
    activeMinutes: 60,
    waterLiters: 3.5,
    sleepHours: 8.0
  },

  dailyProgress: {
    steps: 10420,
    calories: 2310,
    activeMinutes: 52,
    waterLiters: 2.8,
    sleepHours: 7.6
  },

  weeklyTrends: [
    { day: 'Mon', steps: 11200, calories: 2450, strain: 14.2 },
    { day: 'Tue', steps: 13400, calories: 2890, strain: 16.8 },
    { day: 'Wed', steps: 9800, calories: 2100, strain: 11.5 },
    { day: 'Thu', steps: 14100, calories: 3020, strain: 17.4 },
    { day: 'Fri', steps: 12800, calories: 2750, strain: 15.1 },
    { day: 'Sat', steps: 15600, calories: 3340, strain: 18.9 },
    { day: 'Sun', steps: 10420, calories: 2310, strain: 13.6 }
  ],

  sleepTelemetry: {
    totalDuration: '7h 38m',
    efficiency: '92%',
    deepSleep: '1h 54m (25%)',
    remSleep: '2h 10m (28%)',
    lightSleep: '3h 34m (47%)',
    hrvBaseline: '78 ms'
  },

  exerciseLibrary: [
    { id: 'ex-1', name: 'Barbell High-Bar Squat', category: 'Strength', muscle: 'Quadriceps / Glutes', met: 6.0 },
    { id: 'ex-2', name: 'Zone-4 High Intensity Sprints', category: 'Cardio', muscle: 'Full Body Cardiovascular', met: 11.5 },
    { id: 'ex-3', name: 'Romanian Deadlift', category: 'Hypertrophy', muscle: 'Hamstrings / Posterior Chain', met: 5.5 },
    { id: 'ex-4', name: 'Weighted Pull-Ups', category: 'Upper Body', muscle: 'Lats / Biceps / Rhomboids', met: 6.5 },
    { id: 'ex-5', name: 'Olympic Snatch & Clean', category: 'Explosive Power', muscle: 'Full Kinetic Chain', met: 9.0 },
    { id: 'ex-6', name: 'Assault Bike Tabata Protocol', category: 'Conditioning', muscle: 'Metabolic Conditioning', met: 13.0 }
  ],

  workoutLogs: [
    {
      id: 'log-101',
      title: 'Lower Body Kinetic Power',
      date: 'Today, 07:15 AM',
      durationMinutes: 52,
      caloriesBurned: 580,
      avgHeartRate: 146,
      peakHeartRate: 178,
      exercises: [
        { name: 'Barbell High-Bar Squat', sets: '5 sets × 5 reps @ 140kg', rpe: 8.5 },
        { name: 'Romanian Deadlift', sets: '4 sets × 8 reps @ 120kg', rpe: 8.0 }
      ]
    },
    {
      id: 'log-100',
      title: 'Zone-4 Interval Conditioning',
      date: 'Yesterday, 06:30 PM',
      durationMinutes: 45,
      caloriesBurned: 520,
      avgHeartRate: 158,
      peakHeartRate: 184,
      exercises: [
        { name: 'Assault Bike Tabata Protocol', sets: '8 rounds (20s on / 10s off)', rpe: 9.5 }
      ]
    }
  ],

  achievements: [
    { id: 'ach-1', title: 'Century Velocity', desc: 'Exceeded 15,000 steps in a single tactical session', unlocked: true, icon: 'Zap' },
    { id: 'ach-2', title: 'Iron Metabolism', desc: 'Burned 3,000+ active kcal in 24 hours', unlocked: true, icon: 'Flame' },
    { id: 'ach-3', title: 'Unbroken Discipline', desc: '14 consecutive days of meeting strain targets', unlocked: true, icon: 'Trophy' },
    { id: 'ach-4', title: 'Super-Comp Recovery', desc: 'Achieved 95%+ recovery index during high training load', unlocked: false, icon: 'ShieldAlert' }
  ],

  recommendations: [
    {
      id: 'rec-1',
      type: 'Hypertrophy Recovery',
      title: 'Elevated Hamstring Strain Detected',
      body: 'Your posterior chain load exceeded baseline by 22% over the last 48h. Prioritize 20 min active myofascial mobility and 3.5L hydration today.'
    },
    {
      id: 'rec-2',
      type: 'Zone-2 Engine',
      title: 'Optimal Aerobic Recovery Window',
      body: 'HRV baseline is +12% above average. Excellent window for a 40-minute steady-state Zone 2 endurance stimulus.'
    }
  ],

  isSyncingWearable: false,
  connectedDevice: 'Garmin Forerunner 965 // BT-Sync active',

  // Actions
  logWorkout: (newWorkout) => set((state) => {
    const updatedProgress = {
      ...state.dailyProgress,
      calories: state.dailyProgress.calories + Number(newWorkout.caloriesBurned || 400),
      activeMinutes: state.dailyProgress.activeMinutes + Number(newWorkout.durationMinutes || 45)
    };
    return {
      dailyProgress: updatedProgress,
      workoutLogs: [
        {
          id: `log-${Date.now()}`,
          date: 'Just now',
          avgHeartRate: 145,
          peakHeartRate: 175,
          ...newWorkout
        },
        ...state.workoutLogs
      ]
    };
  }),

  updateGoals: (newGoals) => set((state) => ({
    goals: { ...state.goals, ...newGoals }
  })),

  syncWearableData: () => {
    set({ isSyncingWearable: true });
    setTimeout(() => {
      set((state) => ({
        isSyncingWearable: false,
        dailyProgress: {
          ...state.dailyProgress,
          steps: state.dailyProgress.steps + 650,
          calories: state.dailyProgress.calories + 140
        },
        user: {
          ...state.user,
          currentHeartRate: Math.floor(120 + Math.random() * 35)
        }
      }));
    }, 1200);
  }
}));
