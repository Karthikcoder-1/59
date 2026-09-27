import React, { useState } from 'react';
import { Search, Plus, Minus, AlertCircle, ArrowUpRight, Barcode, ShieldAlert, Sparkles, RefreshCcw } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function StockGridPage() {
  const {
    inventory,
    selectedWarehouse,
    skuSearchQuery,
    setSkuSearchQuery,
    categoryFilter,
    setCategoryFilter,
    recordStockMovement,
    triggerAutomatedReorder,
    userRole
  } = useStore();

  const [toast, setToast] = useState('');
  const [adjustingItem, setAdjustingItem] = useState(null);
  const [adjustQty, setAdjustQty] = useState(10);
  const [adjustWarehouse, setAdjustWarehouse] = useState('WH-ALPHA');
  const [adjustType, setAdjustType] = useState('INBOUND');

  const categories = ['ALL', 'Pneumatics & Motors', 'Sensors & Automation', 'Power & Electrics', 'Mechanical Hardware'];

  const filteredItems = inventory.filter((item) => {
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesSearch =
      item.sku.toLowerCase().includes(skuSearchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(skuSearchQuery.toLowerCase()) ||
      item.barcode.includes(skuSearchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleQuickReorder = (sku) => {
    const po = triggerAutomatedReorder(sku);
    if (po) {
      setToast(`Automated Purchase Order ${po.id} generated for SKU ${sku}!`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleSaveAdjustment = (e) => {
    e.preventDefault();
    if (!adjustingItem) return;
    const signedQty = adjustType === 'OUTBOUND' ? -Math.abs(adjustQty) : Math.abs(adjustQty);
    recordStockMovement(adjustType, adjustingItem.sku, signedQty, adjustWarehouse, 'MANUAL-DISPATCH');
    setAdjustingItem(null);
    setToast(`Movement logged: ${adjustType} ${Math.abs(signedQty)} units for ${adjustingItem.sku}`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono-code">
      {/* Top Banner with Industrial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0f172a] border border-slate-800 p-4">
          <span className="text-[10px] text-slate-400 uppercase">ACTIVE SKUS MONITORED</span>
          <div className="text-2xl font-black text-white">{inventory.length} SKUs</div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-4">
          <span className="text-[10px] text-slate-400 uppercase">TOTAL STOCK UNITS</span>
          <div className="text-2xl font-black text-[#eab308]">
            {inventory.reduce((a, b) => a + b.totalStock, 0).toLocaleString()}
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-4">
          <span className="text-[10px] text-slate-400 uppercase">BELOW SAFETY THRESHOLD</span>
          <div className="text-2xl font-black text-amber-500">
            {inventory.filter((i) => i.totalStock <= i.minThreshold).length} ITEMS
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 p-4">
          <span className="text-[10px] text-slate-400 uppercase">ACTIVE OPERATING HUB</span>
          <div className="text-lg font-black text-slate-200">{selectedWarehouse}</div>
        </div>
      </div>

      {toast && (
        <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/40 text-[#eab308] text-xs font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter and Barcode Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
        {/* Search Barcode/SKU */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-[#eab308] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="SCAN BARCODE OR TYPE SKU..."
            value={skuSearchQuery}
            onChange={(e) => setSkuSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-[#eab308]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase transition ${
                categoryFilter === c
                  ? 'bg-[#eab308] text-black'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Dense Industrial Data-Grid Table */}
      <div className="bg-[#0f172a] border border-slate-800 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <th className="py-3 px-3">SKU / Barcode</th>
              <th className="py-3 px-3">Component Description</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3 text-center">Alpha Hub</th>
              <th className="py-3 px-3 text-center">Beta Hub</th>
              <th className="py-3 px-3 text-center">Central Depot</th>
              <th className="py-3 px-3 text-center">Total Stock</th>
              <th className="py-3 px-3 text-right">Cost / Price</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredItems.map((item) => {
              const isLowStock = item.totalStock <= item.minThreshold;

              return (
                <tr key={item.sku} className={`hover:bg-slate-800/40 ${isLowStock ? 'bg-amber-950/20' : ''}`}>
                  <td className="py-3 px-3 font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <Barcode className="w-4 h-4 text-[#eab308]" />
                      <span>{item.sku}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-normal">{item.barcode}</span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-100">{item.name}</div>
                    {isLowStock && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        CRITICAL: THRESHOLD ({item.minThreshold})
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-slate-400">{item.category}</td>
                  <td className="py-3 px-3 text-center text-slate-300 font-bold">{item.stockByWarehouse['WH-ALPHA']}</td>
                  <td className="py-3 px-3 text-center text-slate-300 font-bold">{item.stockByWarehouse['WH-BETA']}</td>
                  <td className="py-3 px-3 text-center text-slate-300 font-bold">{item.stockByWarehouse['WH-CENTRAL']}</td>

                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-1 text-xs font-black ${
                        isLowStock
                          ? 'bg-amber-500 text-black animate-pulse'
                          : 'bg-slate-800 text-white border border-slate-700'
                      }`}
                    >
                      {item.totalStock}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-slate-400 block text-[10px]">${item.unitCost} cost</span>
                    <span className="text-[#eab308] font-bold">${item.sellingPrice} list</span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setAdjustingItem(item)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] uppercase font-bold"
                      >
                        Adjust
                      </button>

                      {isLowStock && (
                        <button
                          onClick={() => handleQuickReorder(item.sku)}
                          className="px-2.5 py-1 bg-[#eab308] hover:bg-yellow-400 text-black text-[10px] uppercase font-bold flex items-center gap-1"
                        >
                          <RefreshCcw className="w-3 h-3" />
                          <span>Reorder PO</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stock Movement Modal */}
      {adjustingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAdjustingItem(null)} />
          <div className="relative z-10 w-full max-w-md bg-[#0f172a] border-2 border-[#eab308] p-6 shadow-2xl">
            <h3 className="text-base font-black text-white uppercase tracking-wider mb-2">
              RECORD STOCK MOVEMENT // {adjustingItem.sku}
            </h3>
            <p className="text-xs text-slate-400 mb-4">{adjustingItem.name}</p>

            <form onSubmit={handleSaveAdjustment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 uppercase mb-1">Movement Operation</label>
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 p-2 text-white font-bold"
                >
                  <option value="INBOUND">INBOUND (Receiving from Supplier)</option>
                  <option value="OUTBOUND">OUTBOUND (Production / Dispatch)</option>
                  <option value="ADJUSTMENT">AUDIT CORRECTION</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={adjustQty}
                    onChange={(e) => setAdjustQty(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 p-2 text-[#eab308] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase mb-1">Target Warehouse</label>
                  <select
                    value={adjustWarehouse}
                    onChange={(e) => setAdjustWarehouse(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2 text-white font-bold"
                  >
                    <option value="WH-ALPHA">Alpha Port</option>
                    <option value="WH-BETA">Beta Rail</option>
                    <option value="WH-CENTRAL">Central Depot</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdjustingItem(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#eab308] hover:bg-yellow-400 text-black font-black uppercase"
                >
                  Commit Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
