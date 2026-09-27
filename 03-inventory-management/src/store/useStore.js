import { create } from 'zustand';

export const useStore = create((set, get) => ({
  userRole: 'manager', // 'manager' | 'staff'
  setUserRole: (role) => set({ userRole: role }),

  selectedWarehouse: 'ALL', // 'ALL' | 'WH-ALPHA' | 'WH-BETA' | 'WH-CENTRAL'
  skuSearchQuery: '',
  categoryFilter: 'ALL',

  warehouses: [
    { id: 'WH-ALPHA', name: 'Alpha West Port Logistics', capacityUsed: '78%' },
    { id: 'WH-BETA', name: 'Beta North Rail Hub', capacityUsed: '62%' },
    { id: 'WH-CENTRAL', name: 'Central Industrial Depot', capacityUsed: '91%' }
  ],

  inventory: [
    {
      sku: 'SKU-IND-901',
      name: 'High-Torque Planetary Gearmotor 24V',
      category: 'Pneumatics & Motors',
      barcode: '890128490123',
      unitCost: 145.0,
      sellingPrice: 280.0,
      stockByWarehouse: { 'WH-ALPHA': 45, 'WH-BETA': 12, 'WH-CENTRAL': 18 },
      totalStock: 75,
      minThreshold: 30,
      supplierId: 'SUP-01',
      agingDays: 14,
      annualTurnover: 8.4
    },
    {
      sku: 'SKU-IND-902',
      name: 'Ceramic Core Pressure Transducer 100PSI',
      category: 'Sensors & Automation',
      barcode: '890128490145',
      unitCost: 62.5,
      sellingPrice: 120.0,
      stockByWarehouse: { 'WH-ALPHA': 4, 'WH-BETA': 3, 'WH-CENTRAL': 1 },
      totalStock: 8,
      minThreshold: 20, // LOW STOCK ALERT
      supplierId: 'SUP-02',
      agingDays: 45,
      annualTurnover: 4.1
    },
    {
      sku: 'SKU-IND-903',
      name: 'Industrial DIN-Rail Power Supply 480W',
      category: 'Power & Electrics',
      barcode: '890128490188',
      unitCost: 89.0,
      sellingPrice: 175.0,
      stockByWarehouse: { 'WH-ALPHA': 30, 'WH-BETA': 55, 'WH-CENTRAL': 40 },
      totalStock: 125,
      minThreshold: 40,
      supplierId: 'SUP-01',
      agingDays: 8,
      annualTurnover: 12.1
    },
    {
      sku: 'SKU-IND-904',
      name: 'Optic Laser Distance Sensor 50m',
      category: 'Sensors & Automation',
      barcode: '890128490212',
      unitCost: 210.0,
      sellingPrice: 420.0,
      stockByWarehouse: { 'WH-ALPHA': 5, 'WH-BETA': 2, 'WH-CENTRAL': 1 },
      totalStock: 8,
      minThreshold: 15, // LOW STOCK ALERT
      supplierId: 'SUP-03',
      agingDays: 92,
      annualTurnover: 2.2
    },
    {
      sku: 'SKU-IND-905',
      name: 'Heavy-Duty Bearing Flange Unit 40mm',
      category: 'Mechanical Hardware',
      barcode: '890128490333',
      unitCost: 34.0,
      sellingPrice: 72.0,
      stockByWarehouse: { 'WH-ALPHA': 120, 'WH-BETA': 90, 'WH-CENTRAL': 140 },
      totalStock: 350,
      minThreshold: 80,
      supplierId: 'SUP-02',
      agingDays: 22,
      annualTurnover: 9.8
    }
  ],

  suppliers: [
    {
      id: 'SUP-01',
      name: 'Apex Industrial Dynamics Inc.',
      contact: 'Marcus Vance',
      email: 'm.vance@apexdynamics.com',
      phone: '+1 (800) 555-0192',
      leadTimeDays: 4,
      reliabilityScore: 98.4
    },
    {
      id: 'SUP-02',
      name: 'Kobe Heavy Precision Works',
      contact: 'Kenji Sato',
      email: 'orders@kobe-precision.jp',
      phone: '+81 3 5550 4910',
      leadTimeDays: 7,
      reliabilityScore: 99.1
    },
    {
      id: 'SUP-03',
      name: 'Nordic Sensorik GmbH',
      contact: 'Astrid Lind',
      email: 'supply@nordicsensorik.de',
      phone: '+49 89 2039 110',
      leadTimeDays: 5,
      reliabilityScore: 96.0
    }
  ],

  stockMovements: [
    {
      id: 'MOV-89102',
      timestamp: '2026-03-27 10:14:22',
      type: 'INBOUND', // 'INBOUND' | 'OUTBOUND' | 'TRANSFER' | 'ADJUSTMENT'
      sku: 'SKU-IND-903',
      quantity: 50,
      warehouse: 'WH-BETA',
      operator: 'J. Walker (Staff)',
      reference: 'PO-7789'
    },
    {
      id: 'MOV-89101',
      timestamp: '2026-03-27 09:30:05',
      type: 'OUTBOUND',
      sku: 'SKU-IND-901',
      quantity: -10,
      warehouse: 'WH-ALPHA',
      operator: 'T. Briggs (Staff)',
      reference: 'SO-44120'
    },
    {
      id: 'MOV-89100',
      timestamp: '2026-03-26 16:45:11',
      type: 'TRANSFER',
      sku: 'SKU-IND-905',
      quantity: 30,
      warehouse: 'WH-CENTRAL -> WH-ALPHA',
      operator: 'M. Chen (Manager)',
      reference: 'TR-1029'
    }
  ],

  purchaseOrders: [
    {
      id: 'PO-7789',
      supplierId: 'SUP-01',
      supplierName: 'Apex Industrial Dynamics Inc.',
      date: '2026-03-24',
      status: 'RECEIVED', // 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'RECEIVED'
      items: [{ sku: 'SKU-IND-903', name: 'Industrial DIN-Rail Power Supply 480W', qty: 50, unitCost: 89.0 }],
      totalValue: 4450.0,
      targetWarehouse: 'WH-BETA'
    },
    {
      id: 'PO-7790',
      supplierId: 'SUP-02',
      supplierName: 'Kobe Heavy Precision Works',
      date: '2026-03-26',
      status: 'APPROVED',
      items: [{ sku: 'SKU-IND-902', name: 'Ceramic Core Pressure Transducer 100PSI', qty: 40, unitCost: 62.5 }],
      totalValue: 2500.0,
      targetWarehouse: 'WH-ALPHA'
    }
  ],

  // Actions
  setSelectedWarehouse: (wh) => set({ selectedWarehouse: wh }),
  setSkuSearchQuery: (q) => set({ skuSearchQuery: q }),
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),

  recordStockMovement: (type, sku, qty, warehouse, reference) => set((state) => {
    const item = state.inventory.find((i) => i.sku === sku);
    if (!item) return state;

    const newStockByWarehouse = { ...item.stockByWarehouse };
    if (warehouse !== 'WH-ALL' && newStockByWarehouse[warehouse] !== undefined) {
      newStockByWarehouse[warehouse] = Math.max(0, newStockByWarehouse[warehouse] + qty);
    }
    const newTotalStock = Object.values(newStockByWarehouse).reduce((a, b) => a + b, 0);

    const updatedInventory = state.inventory.map((i) =>
      i.sku === sku ? { ...i, stockByWarehouse: newStockByWarehouse, totalStock: newTotalStock } : i
    );

    const newMovement = {
      id: `MOV-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type,
      sku,
      quantity: qty,
      warehouse,
      operator: state.userRole === 'manager' ? 'Admin Manager' : 'Duty Staff',
      reference: reference || 'MANUAL-ENTRY'
    };

    return {
      inventory: updatedInventory,
      stockMovements: [newMovement, ...state.stockMovements]
    };
  }),

  triggerAutomatedReorder: (sku) => {
    const state = get();
    const item = state.inventory.find((i) => i.sku === sku);
    if (!item) return null;
    const supplier = state.suppliers.find((s) => s.id === item.supplierId);

    const reorderQty = item.minThreshold * 3;
    const newPo = {
      id: `PO-${Math.floor(7000 + Math.random() * 2000)}`,
      supplierId: item.supplierId,
      supplierName: supplier ? supplier.name : 'Primary Supplier',
      date: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED',
      items: [{ sku: item.sku, name: item.name, qty: reorderQty, unitCost: item.unitCost }],
      totalValue: reorderQty * item.unitCost,
      targetWarehouse: 'WH-CENTRAL'
    };

    set((s) => ({
      purchaseOrders: [newPo, ...s.purchaseOrders]
    }));
    return newPo;
  },

  advancePOStatus: (poId, nextStatus) => set((state) => ({
    purchaseOrders: state.purchaseOrders.map((po) =>
      po.id === poId ? { ...po, status: nextStatus } : po
    )
  })),

  addNewSku: (skuData) => set((state) => {
    const total = Object.values(skuData.stockByWarehouse).reduce((a, b) => a + b, 0);
    return {
      inventory: [
        {
          ...skuData,
          totalStock: total,
          agingDays: 1,
          annualTurnover: 6.0
        },
        ...state.inventory
      ]
    };
  })
}));
