import { create } from 'zustand';

export const useStore = create((set, get) => ({
  userRole: 'customer', // 'customer' | 'restaurant' | 'rider'
  setUserRole: (role) => set({ userRole: role }),

  selectedCuisine: 'All',
  minRating: 0,
  searchQuery: '',
  promoCode: '',
  discount: 0,

  restaurants: [
    {
      id: 'rest-1',
      name: 'Trattoria Rustica',
      cuisine: 'Italian',
      rating: 4.9,
      reviewCount: 382,
      deliveryTime: '25-35 min',
      deliveryFee: 2.99,
      priceCategory: '$$',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      address: '14 Via Roma, Little Italy',
      menu: [
        {
          id: 'dish-101',
          name: 'Handcrafted Truffle Tagliolini',
          price: 24,
          description: 'Fresh egg pasta tossed in Umbrian black truffle butter and 24-month aged Parmigiano Reggiano.',
          image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80',
          category: 'Pastas',
          popular: true
        },
        {
          id: 'dish-102',
          name: 'Wood-Fired Burrata Margherita',
          price: 19,
          description: 'San Marzano DOP tomato sauce, creamy Pugliese burrata, and fresh Genovese basil.',
          image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
          category: 'Pizzas',
          popular: true
        },
        {
          id: 'dish-103',
          name: 'Classic Venetian Tiramisu',
          price: 11,
          description: 'Espresso-soaked savoiardi biscuits, mascarpone cream, and dark Valrhona cocoa.',
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
          category: 'Desserts',
          popular: false
        }
      ]
    },
    {
      id: 'rest-2',
      name: 'Umami Ramen & Izakaya',
      cuisine: 'Japanese',
      rating: 4.8,
      reviewCount: 512,
      deliveryTime: '20-30 min',
      deliveryFee: 1.99,
      priceCategory: '$$',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      address: '88 Sakura Boulevard, Downtown',
      menu: [
        {
          id: 'dish-201',
          name: '24hr Tonkotsu Black Garlic Ramen',
          price: 18.5,
          description: 'Rich pork bone broth, slow-braised chashu pork belly, ajitsuke tamago, and burnt garlic oil.',
          image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80',
          category: 'Ramen',
          popular: true
        },
        {
          id: 'dish-202',
          name: 'Crispy Wagyu Gyoza (6pcs)',
          price: 13,
          description: 'Pan-fried Japanese dumplings stuffed with minced A5 wagyu beef and scallions with ponzu dip.',
          image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
          category: 'Small Plates',
          popular: true
        }
      ]
    },
    {
      id: 'rest-3',
      name: 'Oasis Mediterranean Mezze',
      cuisine: 'Mediterranean',
      rating: 4.7,
      reviewCount: 220,
      deliveryTime: '30-40 min',
      deliveryFee: 3.49,
      priceCategory: '$$$',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      address: '42 Cedar Grove Way',
      menu: [
        {
          id: 'dish-301',
          name: 'Lamb Kofta & Smoked Hummus Platter',
          price: 22,
          description: 'Charcoal grilled spiced lamb skewers served with tahini, house pickles, and warm zaatar pita.',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          category: 'Grill',
          popular: true
        }
      ]
    }
  ],

  cartRestaurantId: null,
  cartItems: [],

  activeOrders: [
    {
      id: 'CRV-9082',
      restaurantId: 'rest-1',
      restaurantName: 'Trattoria Rustica',
      restaurantAddress: '14 Via Roma, Little Italy',
      items: [
        { name: 'Handcrafted Truffle Tagliolini', price: 24, quantity: 2 },
        { name: 'Classic Venetian Tiramisu', price: 11, quantity: 1 }
      ],
      subtotal: 59,
      deliveryFee: 2.99,
      discount: 10,
      total: 51.99,
      status: 'out-for-delivery', // 'placed' | 'preparing' | 'out-for-delivery' | 'delivered'
      placedAt: '12:42 PM',
      estimatedArrival: '1:10 PM (8 mins away)',
      deliveryAddress: '550 Maple Street, Apt 4B',
      rider: {
        name: 'Mateo Rossi',
        vehicle: 'Vespa Sprint 150 (Terracotta Red)',
        phone: '+1 (555) 392-1092',
        rating: 4.95,
        location: { lat: 40.7128, lng: -74.0060 }
      },
      ratingsSubmitted: {
        restaurant: null,
        rider: null
      }
    }
  ],

  // Actions
  setCuisine: (cuisine) => set({ selectedCuisine: cuisine }),
  setMinRating: (rating) => set({ minRating: rating }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addToCart: (restaurantId, dish) => {
    const { cartRestaurantId, cartItems } = get();

    if (cartRestaurantId && cartRestaurantId !== restaurantId && cartItems.length > 0) {
      const confirmSwitch = window.confirm(
        'Your basket contains items from another kitchen. Would you like to clear your current basket to order from this restaurant?'
      );
      if (!confirmSwitch) return false;
      set({
        cartRestaurantId: restaurantId,
        cartItems: [{ ...dish, quantity: 1 }]
      });
      return true;
    }

    const existingIndex = cartItems.findIndex((item) => item.id === dish.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      set({ cartRestaurantId: restaurantId, cartItems: updated });
    } else {
      set({
        cartRestaurantId: restaurantId,
        cartItems: [...cartItems, { ...dish, quantity: 1 }]
      });
    }
    return true;
  },

  removeFromCart: (index) => set((state) => {
    const updated = state.cartItems.filter((_, i) => i !== index);
    return {
      cartItems: updated,
      cartRestaurantId: updated.length === 0 ? null : state.cartRestaurantId
    };
  }),

  updateCartQty: (index, delta) => set((state) => {
    const updated = [...state.cartItems];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      const filtered = updated.filter((_, i) => i !== index);
      return {
        cartItems: filtered,
        cartRestaurantId: filtered.length === 0 ? null : state.cartRestaurantId
      };
    }
    updated[index].quantity = newQty;
    return { cartItems: updated };
  }),

  applyPromoCode: (code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'CRAVE20' || normalized === 'TASTY20') {
      set({ promoCode: normalized, discount: 0.2 });
      return { success: true, message: '20% Artisanal discount applied!' };
    }
    if (normalized === 'FREESHIP') {
      set({ promoCode: normalized, discount: 0.1 });
      return { success: true, message: 'Free delivery credit applied!' };
    }
    return { success: false, message: 'Invalid or expired promo code.' };
  },

  placeOrder: (deliveryAddress) => {
    const state = get();
    if (state.cartItems.length === 0) return null;

    const rest = state.restaurants.find((r) => r.id === state.cartRestaurantId);
    const subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = rest ? rest.deliveryFee : 2.99;
    const discountAmount = Math.round(subtotal * state.discount * 100) / 100;
    const total = Math.max(0, subtotal + deliveryFee - discountAmount);

    const newOrder = {
      id: `CRV-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantId: state.cartRestaurantId,
      restaurantName: rest ? rest.name : 'Artisan Kitchen',
      restaurantAddress: rest ? rest.address : '12 Culinary Row',
      items: [...state.cartItems],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total,
      status: 'placed',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: '30-40 mins',
      deliveryAddress: deliveryAddress || '550 Maple Street, Apt 4B',
      rider: {
        name: 'Leo Valenti',
        vehicle: 'Electric Courier Bike',
        phone: '+1 (555) 849-2910',
        rating: 4.9,
        location: { lat: 40.7130, lng: -74.0070 }
      },
      ratingsSubmitted: {
        restaurant: null,
        rider: null
      }
    };

    set((s) => ({
      activeOrders: [newOrder, ...s.activeOrders],
      cartItems: [],
      cartRestaurantId: null,
      promoCode: '',
      discount: 0
    }));

    return newOrder;
  },

  advanceOrderStatus: (orderId, newStatus) => set((state) => ({
    activeOrders: state.activeOrders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
  })),

  rateOrder: (orderId, target, score) => set((state) => ({
    activeOrders: state.activeOrders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            ratingsSubmitted: {
              ...o.ratingsSubmitted,
              [target]: score
            }
          }
        : o
    )
  })),

  addDishToRestaurant: (restaurantId, dishData) => set((state) => ({
    restaurants: state.restaurants.map((r) => {
      if (r.id === restaurantId) {
        return {
          ...r,
          menu: [
            ...r.menu,
            {
              ...dishData,
              id: `dish-${Date.now()}`
            }
          ]
        };
      }
      return r;
    })
  })),

  generateAiDishPhoto: async (dishName, cuisine) => {
    const dishImages = [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dishImages[Math.floor(Math.random() * dishImages.length)]);
      }, 1000);
    });
  }
}));
