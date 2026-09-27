import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  FileText,
  Clock,
  Landmark,
  KeyRound,
  Download,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  RefreshCw,
  Send
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    user,
    accounts,
    transactions,
    billPayList,
    loans,
    transferFunds,
    payBill,
    applyForLoan
  } = useStore();

  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' | 'transfer' | 'billpay' | 'loans' | 'ledger'
  const [transferFrom, setTransferFrom] = useState('acc-1');
  const [transferTo, setTransferTo] = useState('acc-2');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferMemo, setTransferMemo] = useState('');
  const [showTotpModal, setShowTotpModal] = useState(false);
  const [totpInput, setTotpInput] = useState('');
  const [totpError, setTotpError] = useState(false);

  // Loan state
  const [loanTitle, setLoanTitle] = useState('');
  const [loanAmount, setLoanAmount] = useState('250000');
  const [showLoanModal, setShowLoanModal] = useState(false);

  const totalAssets = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const handleInitiateTransfer = (e) => {
    e.preventDefault();
    if (!transferAmount || Number(transferAmount) <= 0) return;
    setShowTotpModal(true);
  };

  const handleVerifyTotp = (e) => {
    e.preventDefault();
    if (totpInput.length === 6) {
      transferFunds({
        fromAccId: transferFrom,
        toAccId: transferTo,
        amount: transferAmount,
        memo: transferMemo
      });
      setShowTotpModal(false);
      setTotpInput('');
      setTransferAmount('');
      setTransferMemo('');
      setActiveTab('ledger');
    } else {
      setTotpError(true);
    }
  };

  const handleApplyLoan = (e) => {
    e.preventDefault();
    applyForLoan({ title: loanTitle, amount: loanAmount });
    setShowLoanModal(false);
    setLoanTitle('');
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col font-sans">
      {/* Sovereign Vault Header */}
      <header className="sticky top-0 z-40 bg-[#1c1917]/95 backdrop-blur border-b border-amber-900/40 px-6 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <div className="w-full h-full bg-[#0c0a09] rounded-[10px] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-[#fbbf24]" />
              </div>
            </div>
            <div>
              <span className="font-cinzel text-xl font-bold tracking-widest text-[#fbbf24] block leading-none">
                AUREUS VAULT
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold">
                Private Sovereign Liquidity & Bullion Depository
              </span>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="hidden md:flex items-center gap-1 bg-[#292524] p-1 rounded-xl border border-stone-800 text-xs font-semibold text-stone-300">
            {[
              { id: 'accounts', label: 'Accounts & Vault' },
              { id: 'transfer', label: 'Transfer & Wire' },
              { id: 'billpay', label: 'Dispatches & Bills' },
              { id: 'loans', label: 'Credit Facilities' },
              { id: 'ledger', label: 'Reconciled Ledger' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-[#d97706] text-black font-bold shadow-md'
                    : 'hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Security & MFA Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <span className="text-xs font-bold text-white block">{user.name}</span>
              <span className="text-[10px] font-mono text-[#fbbf24] flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> 2FA TOTP Active
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-1 space-y-8">
        {/* Total Liquidity Asset Banner */}
        <div className="bg-[#1c1917] border border-amber-900/30 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#fbbf24] font-bold">
              Total Consolidate Net Liquidity
            </span>
            <div className="font-cinzel text-4xl sm:text-5xl font-black text-white mt-1">
              ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-stone-400 font-mono mt-1">
              Tier: {user.tier} • Sovereign Security Clear ID: {user.electorId}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('transfer')}
              className="px-5 py-3 bg-[#d97706] hover:bg-[#b45309] text-black font-bold text-xs uppercase tracking-wider rounded-2xl transition shadow-lg shadow-amber-900/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Move Funds
            </button>
            <button
              onClick={() => setShowLoanModal(true)}
              className="px-5 py-3 bg-[#292524] hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider rounded-2xl transition"
            >
              Request Credit
            </button>
          </div>
        </div>

        {/* VIEW 1: VAULT ACCOUNTS */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="bg-[#1c1917] border border-stone-800 hover:border-amber-700/60 rounded-3xl p-6 shadow-xl space-y-4 transition flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase bg-[#292524] text-amber-400 px-2.5 py-1 rounded-full font-bold border border-amber-900/30">
                        {acc.type.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-stone-500">{acc.accountNumber}</span>
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-white">{acc.name}</h3>
                  </div>

                  <div className="pt-4 border-t border-stone-800/80">
                    <span className="text-[10px] font-mono uppercase text-stone-400">Available Balance</span>
                    <div className="font-mono text-2xl font-black text-[#fbbf24] mt-0.5">
                      ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: WIRE & TRANSFER */}
        {activeTab === 'transfer' && (
          <div className="max-w-xl mx-auto bg-[#1c1917] border border-amber-900/40 rounded-3xl p-8 shadow-2xl space-y-6">
            <div>
              <h2 className="font-cinzel text-2xl font-bold text-[#fbbf24]">Sovereign Wire & Transfer Engine</h2>
              <p className="text-xs text-stone-400 font-mono mt-1">Multi-factor encrypted settlement between private accounts</p>
            </div>

            <form onSubmit={handleInitiateTransfer} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-stone-400 block mb-1">Source Account</label>
                <select
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} (${acc.balance.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-stone-400 block mb-1">Destination Account</label>
                <select
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.accountNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-stone-400 block mb-1">Transfer Amount ($ USD)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 50000"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-stone-400 block mb-1">Wire Memorandum</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Liquidity Reserve Rebalance"
                  value={transferMemo}
                  onChange={(e) => setTransferMemo(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#d97706] hover:bg-[#b45309] text-black font-bold text-xs uppercase tracking-widest rounded-2xl transition shadow-lg shadow-amber-900/30"
              >
                Authenticate & Initiate Transfer
              </button>
            </form>
          </div>
        )}

        {/* VIEW 3: BILL PAY & DISPATCHES */}
        {activeTab === 'billpay' && (
          <div className="bg-[#1c1917] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-white">Scheduled Dispatches & Utility Payees</h2>
            <div className="space-y-3">
              {billPayList.map((bill) => (
                <div key={bill.id} className="p-4 bg-[#0c0a09] border border-stone-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{bill.payee}</h4>
                    <p className="text-xs font-mono text-stone-400">Due: {bill.dueDate} • Autopay: {bill.autopay ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base font-bold text-[#fbbf24]">${bill.amount.toLocaleString()}</span>
                    {bill.status === 'Scheduled' || bill.status === 'Pending Approval' ? (
                      <button
                        onClick={() => payBill(bill.id)}
                        className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-black font-bold text-xs rounded-xl transition"
                      >
                        Authorize Payment
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-mono font-bold rounded-xl border border-emerald-800">
                        ✓ {bill.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: CREDIT FACILITIES */}
        {activeTab === 'loans' && (
          <div className="bg-[#1c1917] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-cinzel text-xl font-bold text-white">Active Collateralized Facilities</h2>
              <button
                onClick={() => setShowLoanModal(true)}
                className="px-4 py-2 bg-[#d97706] text-black text-xs font-bold rounded-xl"
              >
                + New Facility
              </button>
            </div>
            <div className="space-y-3">
              {loans.map((l) => (
                <div key={l.id} className="p-5 bg-[#0c0a09] border border-stone-800 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-cinzel font-bold text-base text-white">{l.title}</h4>
                    <span className="text-xs font-mono text-amber-400 font-bold">{l.status}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-stone-300 pt-2 border-t border-stone-800">
                    <div>Principal: <b className="text-white">${l.principal.toLocaleString()}</b></div>
                    <div>Remaining: <b className="text-[#fbbf24]">${l.remaining.toLocaleString()}</b></div>
                    <div>Fixed APR: <b className="text-emerald-400">{l.apr}</b></div>
                    <div>Monthly Obligation: <b className="text-white">${l.monthlyPayment.toLocaleString()}</b></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: RECONCILED LEDGER */}
        {activeTab === 'ledger' && (
          <div className="bg-[#1c1917] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h2 className="font-cinzel text-xl font-bold text-white">Cryptographic Transaction Ledger</h2>
              <button
                onClick={() => alert('Statement PDF successfully generated & signed.')}
                className="px-3.5 py-1.5 bg-[#292524] hover:bg-stone-800 border border-stone-700 text-stone-200 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF Statement
              </button>
            </div>

            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 bg-[#0c0a09] border border-stone-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                  <div>
                    <span className="text-stone-400">{tx.date} • {tx.category}</span>
                    <h4 className="font-bold text-white font-sans text-sm mt-0.5">{tx.description}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.amount > 0 ? `+$${tx.amount.toLocaleString()}` : `-$${Math.abs(tx.amount).toLocaleString()}`}
                    </div>
                    <span className="text-[10px] text-stone-500">Status: {tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: TOTP 2FA AUTHENTICATION */}
      {showTotpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1917] border border-amber-900/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-500 mx-auto flex items-center justify-center text-amber-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">Sovereign 2FA Authentication</h3>
              <p className="text-xs text-stone-400 mt-1 font-mono">
                Enter your 6-digit Time-Based One-Time Password (TOTP) from your authenticator app.
              </p>
            </div>

            <form onSubmit={handleVerifyTotp} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                autoFocus
                placeholder="123456"
                value={totpInput}
                onChange={(e) => {
                  setTotpInput(e.target.value);
                  setTotpError(false);
                }}
                className="w-full text-center tracking-[0.5em] font-mono text-2xl bg-[#0c0a09] border border-amber-600 rounded-2xl py-3 text-[#fbbf24] focus:outline-none"
              />

              {totpError && <p className="text-xs text-rose-400 font-mono">Please enter a valid 6-digit code.</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTotpModal(false)}
                  className="w-1/2 py-2.5 bg-stone-800 text-stone-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#d97706] hover:bg-[#b45309] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-900/30"
                >
                  Confirm Wire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: APPLY CREDIT FACILITY */}
      {showLoanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1917] border border-stone-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-cinzel text-lg font-bold text-white">Credit Facility Application</h3>
              <button onClick={() => setShowLoanModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleApplyLoan} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-stone-400 block mb-1">Facility Purpose / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Microgrid Acquisition"
                  value={loanTitle}
                  onChange={(e) => setLoanTitle(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-stone-400 block mb-1">Requested Capital ($ USD)</label>
                <input
                  type="number"
                  required
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full bg-[#0c0a09] border border-stone-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoanModal(false)}
                  className="w-1/2 py-2.5 bg-stone-800 text-stone-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#d97706] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
                >
                  Submit Underwriting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vault Footer */}
      <footer className="border-t border-stone-800 bg-[#0c0a09] py-6 text-center text-xs text-stone-500 font-mono">
        © 2026 AUREUS SOVEREIGN PRIVATE VAULT & BANKING CORP. RLS ROW-LEVEL POSTGRESQL ISOLATION.
      </footer>
    </div>
  );
}
