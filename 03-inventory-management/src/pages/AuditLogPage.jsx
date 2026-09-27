import React from 'react';
import { ClipboardList, ArrowDownLeft, ArrowUpRight, Repeat, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function AuditLogPage() {
  const { stockMovements } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono-code">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase text-white flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#eab308]" />
            IMMUTABLE STOCK MOVEMENT AUDIT TRAIL
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            CONTINUOUS POSTGRES AUDIT LOGGING FOR ALL MATERIAL MOVEMENTS & DISPATCHES
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-3 py-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>TAMPER-EVIDENT RECORDING</span>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <th className="py-3 px-3">Movement ID</th>
              <th className="py-3 px-3">Timestamp (UTC)</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">SKU Code</th>
              <th className="py-3 px-3 text-center">Qty Change</th>
              <th className="py-3 px-3">Facility / Hub</th>
              <th className="py-3 px-3">Authorized Operator</th>
              <th className="py-3 px-3">Reference Document</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {stockMovements.map((mov) => {
              const isPositive = mov.quantity > 0;

              return (
                <tr key={mov.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-bold text-slate-200">{mov.id}</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{mov.timestamp}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        mov.type === 'INBOUND'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : mov.type === 'OUTBOUND'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {mov.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">{mov.sku}</td>
                  <td className="py-3 px-3 text-center font-bold">
                    <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                      {isPositive ? `+${mov.quantity}` : mov.quantity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{mov.warehouse}</td>
                  <td className="py-3 px-3 text-slate-400">{mov.operator}</td>
                  <td className="py-3 px-3 text-[#eab308] font-bold">{mov.reference}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
