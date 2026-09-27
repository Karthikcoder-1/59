import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentUser: {
    id: 'usr-apex-77',
    name: 'Julian Sterling',
    loyaltyTier: 'Apex Black Member', // 15% discount
    discountRate: 0.15,
    email: 'julian.sterling@apex.corp',
    driverLicense: 'DL-CA-99482109'
  },

  activeRole: 'client', // 'client' | 'admin'

  vehicles: [
    {
      id: 'car-1',
      name: 'Porsche 911 GT3 RS',
      category: 'Track & Supercar',
      dailyRate: 650,
      horsepower: '518 HP',
      zeroToSixty: '3.0s',
      topSpeed: '184 mph',
      transmission: '7-Speed PDK Dual-Clutch',
      location: 'Los Angeles International (LAX)',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      available: true,
      maintenance: { status: 'Optimal', nextService: 'In 3,200 miles', lastInspection: '2026-09-10' }
    },
    {
      id: 'car-2',
      name: 'Mercedes-AMG G 63 4x4²',
      category: 'Luxury SUV',
      dailyRate: 520,
      horsepower: '577 HP',
      zeroToSixty: '4.5s',
      topSpeed: '137 mph',
      transmission: '9G-TRONIC Automatic',
      location: 'Miami South Beach Pavilion',
      image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
      available: true,
      maintenance: { status: 'Service Due in 2 Days', nextService: 'Brake fluid check', lastInspection: '2026-08-15' }
    },
    {
      id: 'car-3',
      name: 'Audi RS e-tron GT',
      category: 'Electric Performance',
      dailyRate: 380,
      horsepower: '637 HP',
      zeroToSixty: '3.1s',
      topSpeed: '155 mph',
      transmission: '2-Speed Automatic Electric',
      location: 'San Francisco Downtown',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
      available: true,
      maintenance: { status: 'Optimal', nextService: 'Battery diagnostics OK', lastInspection: '2026-09-20' }
    }
  ],

  bookings: [
    {
      id: 'bk-991',
      carId: 'car-1',
      carName: 'Porsche 911 GT3 RS',
      startDate: '2026-10-02',
      endDate: '2026-10-05',
      days: 3,
      totalPaid: 1657.50, // 3 * 650 * 0.85
      status: 'Confirmed',
      location: 'Los Angeles International (LAX)',
      agreementSigned: true,
      pickupDamagePhoto: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
      returnDamageReported: false
    }
  ],

  // Actions
  setActiveRole: (role) => set({ activeRole: role }),

  bookVehicle: (bookingData) => set((state) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      carId: bookingData.carId,
      carName: bookingData.carName,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      days: bookingData.days,
      totalPaid: bookingData.totalPaid,
      status: 'Confirmed',
      location: bookingData.location,
      agreementSigned: true,
      pickupDamagePhoto: bookingData.damagePhoto || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
      returnDamageReported: false
    };
    return { bookings: [newBooking, ...state.bookings] };
  }),

  addVehicle: (car) => set((state) => ({
    vehicles: [
      {
        id: `car-${Date.now()}`,
        name: car.name,
        category: car.category || 'Luxury SUV',
        dailyRate: Number(car.dailyRate) || 400,
        horsepower: car.horsepower || '450 HP',
        zeroToSixty: car.zeroToSixty || '3.8s',
        topSpeed: car.topSpeed || '160 mph',
        transmission: car.transmission || 'Automatic',
        location: car.location || 'San Francisco Downtown',
        image: car.image || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
        available: true,
        maintenance: { status: 'Optimal', nextService: 'In 5,000 miles', lastInspection: '2026-09-27' }
      },
      ...state.vehicles
    ]
  })),

  generateAiCarPhoto: async (model) => {
    const cars = [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80'
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cars[Math.floor(Math.random() * cars.length)]);
      }, 750);
    });
  }
}));
