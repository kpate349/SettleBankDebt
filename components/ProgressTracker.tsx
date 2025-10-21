'use client';

import { useState } from 'react';

interface Settlement {
  id: string;
  creditor: string;
  originalAmount: number;
  settledAmount: number;
  status: 'negotiating' | 'settled' | 'paid' | 'rejected';
  lastUpdate: string;
  progress: number;
}

const mockSettlements: Settlement[] = [
  {
    id: '1',
    creditor: 'Capital One',
    originalAmount: 8500,
    settledAmount: 4250,
    status: 'settled',
    lastUpdate: '2024-01-15',
    progress: 100
  },
  {
    id: '2',
    creditor: 'Discover',
    originalAmount: 6200,
    settledAmount: 3100,
    status: 'paid',
    lastUpdate: '2024-01-20',
    progress: 100
  },
  {
    id: '3',
    creditor: 'Chase Bank',
    originalAmount: 12000,
    settledAmount: 7200,
    status: 'negotiating',
    lastUpdate: '2024-01-10',
    progress: 75
  },
  {
    id: '4',
    creditor: 'American Express',
    originalAmount: 4500,
    settledAmount: 0,
    status: 'negotiating',
    lastUpdate: '2024-01-08',
    progress: 50
  }
];

const statusColors = {
  negotiating: 'bg-yellow-100 text-yellow-800',
  settled: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusLabels = {
  negotiating: 'Negotiating',
  settled: 'Settled',
  paid: 'Paid',
  rejected: 'Rejected'
};

export default function ProgressTracker() {
  const [settlements] = useState<Settlement[]>(mockSettlements);

  const totalOriginal = settlements.reduce((sum, s) => sum + s.originalAmount, 0);
  const totalSettled = settlements.reduce((sum, s) => sum + (s.status === 'paid' || s.status === 'settled' ? s.settledAmount : 0), 0);
  const totalSaved = totalOriginal - totalSettled;
  const averageReduction = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100) : 0;

  const completedSettlements = settlements.filter(s => s.status === 'paid').length;
  const totalSettlements = settlements.length;
  const overallProgress = (completedSettlements / totalSettlements) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Settlement Progress Tracker</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">${totalOriginal.toLocaleString()}</div>
          <div className="text-sm text-gray-900">Total Debt</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">${totalSaved.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Saved</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{averageReduction.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Average Reduction</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{overallProgress.toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Overall Progress</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-black">Settlement Overview</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-black">Overall Progress</span>
            <span className="text-sm text-gray-600">{completedSettlements} of {totalSettlements} settlements completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Individual Settlements */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-black">Individual Settlement Status</h3>
        <div className="space-y-4">
          {settlements.map((settlement) => (
            <div key={settlement.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-black">{settlement.creditor}</h4>
                  <p className="text-sm text-gray-600">Last updated: {new Date(settlement.lastUpdate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[settlement.status]}`}>
                  {statusLabels[settlement.status]}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-black">Original Amount</div>
                  <div className="text-lg font-bold text-black">${settlement.originalAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-black">Settled Amount</div>
                  <div className="text-lg font-bold text-green-600">
                    {settlement.settledAmount > 0 ? `$${settlement.settledAmount.toLocaleString()}` : 'Pending'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-black">Savings</div>
                  <div className="text-lg font-bold text-blue-600">
                    {settlement.settledAmount > 0
                      ? `$${(settlement.originalAmount - settlement.settledAmount).toLocaleString()} (${(((settlement.originalAmount - settlement.settledAmount) / settlement.originalAmount) * 100).toFixed(0)}%)`
                      : 'Pending'
                    }
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-black">
                  <span>Progress</span>
                  <span>{settlement.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      settlement.status === 'paid' ? 'bg-green-600' :
                      settlement.status === 'settled' ? 'bg-blue-600' :
                      settlement.status === 'negotiating' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${settlement.progress}%` }}
                  ></div>
                </div>
              </div>

              {settlement.status === 'negotiating' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Next Steps:</strong> Our negotiation team is actively working on your behalf.
                    We&apos;ll update you once we have a counteroffer or final agreement.
                  </p>
                </div>
              )}

              {settlement.status === 'settled' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Great News!</strong> We&apos;ve reached a settlement agreement.
                    Please review and sign the settlement documents to proceed with payment.
                  </p>
                </div>
              )}

              {settlement.status === 'paid' && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Settlement Complete!</strong> This account has been successfully resolved.
                    Thank you for choosing SettleBankDebt.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold mb-2 text-black">Need Help?</h4>
        <p className="text-gray-900 mb-4">
          If you have questions about your settlement progress or need to update your information,
          our client support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
            Download Documents
          </button>
        </div>
      </div>
    </div>
  );
}