import React, { useState } from 'react';
import { ShoppingCart, CheckCircle, Clock, Truck, FileCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function PurchaseOrderPage() {
  const { purchaseOrders, advancePOStatus, suppliers, userRole } = useStore();
  const [toast, setToast] = useState('');

  const handleAdvance = (po, nextStatus) => {
    advancePOStatus(po.id, nextStatus);
    setToast(`PO ${po.id} transitioned to ${nextStatus}!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono-code">
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase text-white flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-[#eab308]" />
          AUTOMATED PURCHASE ORDER WORKFLOW
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          PROCUREMENT PIPELINE: DRAFT → SUBMITTED → APPROVED → RECEIVED
        </p>
      </div>

      {toast && (
        <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/40 text-[#eab308] text-xs font-bold">
          {toast}
        </div>
      )}

      <div className="space-y-6">
        {purchaseOrders.map((po) => (
          <div key={po.id} className="bg-[#0f172a] border border-slate-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-white">{po.id}</span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      po.status === 'RECEIVED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : po.status === 'APPROVED'
                        ? 'bg-sky-950 text-sky-400 border border-sky-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {po.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  SUPPLIER: <span className="text-white font-bold">{po.supplierName}</span> | DESTINATION: <span className="text-[#eab308]">{po.targetWarehouse}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">TOTAL PO VALUE</span>
                  <span className="text-lg font-black text-[#eab308]">${po.totalValue.toLocaleString()}</span>
                </div>

                {/* Manager Action Buttons */}
                {userRole === 'manager' && (
                  <div className="flex gap-2">
                    {po.status === 'SUBMITTED' && (
                      <button
                        onClick={() => handleAdvance(po, 'APPROVED')}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase transition"
                      >
                        Approve PO
                      </button>
                    )}
                    {po.status === 'APPROVED' && (
                      <button
                        onClick={() => handleAdvance(po, 'RECEIVED')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase transition"
                      >
                        Receive & Restock
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* PO Line Items */}
            <div className="mt-4 pt-2">
              <span className="text-[10px] text-slate-500 uppercase block mb-2 font-bold">PO LINE ITEMS:</span>
              <div className="space-y-2">
                {po.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs bg-slate-900 p-2 border border-slate-800">
                    <span className="text-slate-200">
                      <span className="text-[#eab308] font-bold">{it.sku}</span> - {it.name}
                    </span>
                    <span className="text-white font-bold">
                      {it.qty} units @ ${it.unitCost} = ${(it.qty * it.unitCost).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
