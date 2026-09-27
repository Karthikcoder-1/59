import React, { useState } from 'react';
import { FileSpreadsheet, Download, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ReportsPage() {
  const { inventory } = useStore();
  const [downloading, setDownloading] = useState(false);

  const handleExportCSV = () => {
    setDownloading(true);
    setTimeout(() => {
      const headers = 'SKU,Item Name,Category,Total Stock,Aging (Days),Annual Turnover Rate,Unit Cost,Total Valuation\n';
      const rows = inventory
        .map(
          (i) =>
            `"${i.sku}","${i.name}","${i.category}",${i.totalStock},${i.agingDays},${i.annualTurnover},${i.unitCost},${i.totalStock * i.unitCost}`
        )
        .join('\n');

      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TITAN_INVENTORY_REPORT_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    }, 600);
  };

  const totalValuation = inventory.reduce((a, b) => a + b.totalStock * b.unitCost, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-mono-code">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-[#eab308]" />
            TURNOVER VELOCITY & AGING VALUATION REPORTS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            SUPABASE/POSTGRES AGGREGATED METRICS WITH INSTANT CSV DISK EXPORT
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#eab308] hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider transition"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'GENERATING CSV...' : 'EXPORT CSV REPORT'}</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0f172a] border border-slate-800 p-5">
          <span className="text-[10px] text-slate-500 uppercase font-bold">TOTAL CAPITAL INVENTORY VALUATION</span>
          <div className="text-3xl font-black text-white mt-1">${totalValuation.toLocaleString()}</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-5">
          <span className="text-[10px] text-slate-500 uppercase font-bold">AVERAGE STOCK AGING</span>
          <div className="text-3xl font-black text-[#eab308] mt-1">28.4 DAYS</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-5">
          <span className="text-[10px] text-slate-500 uppercase font-bold">ANNUALIZED INVENTORY TURNS</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">7.3x / YR</div>
        </div>
      </div>

      {/* Detailed Grid */}
      <div className="bg-[#0f172a] border border-slate-800 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <th className="py-3 px-3">SKU</th>
              <th className="py-3 px-3">Item Description</th>
              <th className="py-3 px-3 text-center">Aging Days</th>
              <th className="py-3 px-3 text-center">Turnover Rate</th>
              <th className="py-3 px-3 text-right">Unit Cost</th>
              <th className="py-3 px-3 text-right">Holding Value</th>
              <th className="py-3 px-3 text-center">Velocity Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {inventory.map((i) => {
              const holdingVal = i.totalStock * i.unitCost;
              return (
                <tr key={i.sku} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold text-[#eab308]">{i.sku}</td>
                  <td className="py-3 px-3 font-bold text-slate-200">{i.name}</td>
                  <td className="py-3 px-3 text-center text-slate-300 font-bold">{i.agingDays}d</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-400">{i.annualTurnover}x</td>
                  <td className="py-3 px-3 text-right text-slate-400">${i.unitCost}</td>
                  <td className="py-3 px-3 text-right font-black text-white">${holdingVal.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold ${
                        i.annualTurnover > 8
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : i.annualTurnover > 4
                          ? 'bg-sky-950 text-sky-400 border border-sky-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {i.annualTurnover > 8 ? 'FAST MOVER' : i.annualTurnover > 4 ? 'STEADY' : 'SLOW AGING'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
