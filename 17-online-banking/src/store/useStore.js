import { create } from 'zustand';

export const useStore = create((set, get) => ({
  user: {
    name: 'Lord Sterling Vance',
    electorId: 'AUR-9902-SWISS',
    tier: 'Sovereign Private Client',
    totpEnabled: true,
    lastLogin: 'Today, 09:42 EST'
  },

  accounts: [
    {
      id: 'acc-1',
      name: 'Private Liquid Checking',
      accountNumber: '**** 8841',
      balance: 148520.40,
      currency: 'USD',
      type: 'checking',
      routing: '021000021'
    },
    {
      id: 'acc-2',
      name: 'Sovereign Bullion & Gold Reserve',
      accountNumber: '**** 9104',
      balance: 1250000.00,
      currency: 'USD',
      type: 'vault',
      routing: '021000021'
    },
    {
      id: 'acc-3',
      name: 'High-Yield Municipal Treasury Bond',
      accountNumber: '**** 3392',
      balance: 420800.75,
      currency: 'USD',
      type: 'treasury',
      routing: '021000021'
    }
  ],

  transactions: [
    { id: 'tx-101', date: '2026-09-27', description: 'Metropolitan Clean Desalination Bond Dividend', category: 'Yield / Dividend', amount: 8450.00, type: 'credit', status: 'Settled', accountId: 'acc-3' },
    { id: 'tx-102', date: '2026-09-25', description: 'Global Cloud Microgrid Hosting Node', category: 'Infrastructure', amount: -1240.00, type: 'debit', status: 'Settled', accountId: 'acc-1' },
    { id: 'tx-103', date: '2026-09-22', description: 'Internal Vault Transfer to Liquid Checking', category: 'Transfer', amount: 50000.00, type: 'credit', status: 'Settled', accountId: 'acc-1' },
    { id: 'tx-104', date: '2026-09-20', description: 'Sovereign Aviation Lease Monthly Payment', category: 'Lease', amount: -15200.00, type: 'debit', status: 'Settled', accountId: 'acc-1' }
  ],

  billPayList: [
    { id: 'bill-1', payee: 'Metropolitan Municipal Power Grid', dueDate: '2026-10-05', amount: 2450.00, autopay: true, status: 'Scheduled' },
    { id: 'bill-2', payee: 'Sovereign Cyber Defense Consortium', dueDate: '2026-10-12', amount: 8900.00, autopay: false, status: 'Pending Approval' }
  ],

  loans: [
    { id: 'loan-1', title: 'Collateralized Commercial Facility', principal: 500000, remaining: 380000, apr: '4.85%', monthlyPayment: 9800, status: 'Active & In Good Standing' }
  ],

  // Actions
  transferFunds: ({ fromAccId, toAccId, amount, memo }) => set((state) => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return {};

    const updatedAccounts = state.accounts.map((acc) => {
      if (acc.id === fromAccId) return { ...acc, balance: acc.balance - amt };
      if (acc.id === toAccId) return { ...acc, balance: acc.balance + amt };
      return acc;
    });

    const newTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      description: memo || 'Internal Account Transfer',
      category: 'Transfer',
      amount: -amt,
      type: 'debit',
      status: 'Settled & Authenticated',
      accountId: fromAccId
    };

    return {
      accounts: updatedAccounts,
      transactions: [newTx, ...state.transactions]
    };
  }),

  payBill: (billId) => set((state) => {
    const bill = state.billPayList.find((b) => b.id === billId);
    if (!bill) return {};

    const checkingAcc = state.accounts.find((a) => a.id === 'acc-1');
    if (!checkingAcc || checkingAcc.balance < bill.amount) return {};

    const updatedAccounts = state.accounts.map((acc) =>
      acc.id === 'acc-1' ? { ...acc, balance: acc.balance - bill.amount } : acc
    );

    const newTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      description: `Bill Payment: ${bill.payee}`,
      category: 'Bill Pay',
      amount: -bill.amount,
      type: 'debit',
      status: 'Settled',
      accountId: 'acc-1'
    };

    return {
      accounts: updatedAccounts,
      transactions: [newTx, ...state.transactions],
      billPayList: state.billPayList.map((b) => b.id === billId ? { ...b, status: 'Paid & Reconciled' } : b)
    };
  }),

  applyForLoan: (loanData) => set((state) => ({
    loans: [
      {
        id: `loan-${Date.now()}`,
        title: loanData.title || 'Private Real Estate Facility',
        principal: Number(loanData.amount),
        remaining: Number(loanData.amount),
        apr: '5.10%',
        monthlyPayment: Math.round(Number(loanData.amount) * 0.018),
        status: 'Provisionally Approved (Underwriting Review)'
      },
      ...state.loans
    ]
  }))
}));
