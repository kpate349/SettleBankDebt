'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SimulationData {
  totalDebt: number;
  interestRate: number;
  monthlyPayment: number;
}

export default function DebtSimulator() {
  const [data, setData] = useState<SimulationData>({
    totalDebt: 25000,
    interestRate: 18,
    monthlyPayment: 500
  });

  const [simulationResults, setSimulationResults] = useState<{
    timelineData: Array<{month: number, original: number, consolidation: number, bankruptcy: number}>;
    totals: {original: number, settlement: number, consolidation: number, bankruptcy: number};
    monthlyPayments: {original: number, settlement: number, consolidation: number, bankruptcy: number};
  } | null>(null);

  const calculateScenarios = () => {
    const { totalDebt, interestRate, monthlyPayment } = data;
    const monthlyRate = interestRate / 100 / 12;

    // Settlement scenario (assume 50% reduction, lump sum payment)
    const settlementAmount = totalDebt * 0.5;
    const settlementMonthlyPayment = settlementAmount / 24; // 2-year payment plan

    // Consolidation scenario (lower interest, longer term)
    const consolidationRate = 8 / 100 / 12;
    const consolidationTerm = 60; // 5 years
    const consolidationMonthly = (totalDebt * (consolidationRate * Math.pow(1 + consolidationRate, consolidationTerm))) /
                                (Math.pow(1 + consolidationRate, consolidationTerm) - 1);

    // Bankruptcy scenario (7-year repayment plan with lower payments)
    const bankruptcyMonthly = totalDebt / 84; // 7 years

    // Generate payment timeline data
    const timelineData = [];
    let balance = totalDebt;
    let consolidationBalance = totalDebt;
    let bankruptcyBalance = totalDebt;

    for (let month = 1; month <= 84; month++) {
      // Original debt (minimum payments)
      const interest = balance * monthlyRate;
      const principal = Math.min(monthlyPayment - interest, balance);
      balance -= principal;

      // Consolidation
      if (month <= 60) {
        const consInterest = consolidationBalance * consolidationRate;
        const consPrincipal = consolidationMonthly - consInterest;
        consolidationBalance -= consPrincipal;
      }

      // Bankruptcy (fixed payments for 7 years)
      if (month <= 84) {
        bankruptcyBalance -= bankruptcyMonthly;
      }

      if (month % 6 === 0) { // Every 6 months
        timelineData.push({
          month,
          original: Math.max(0, balance),
          consolidation: Math.max(0, consolidationBalance),
          bankruptcy: Math.max(0, bankruptcyBalance)
        });
      }
    }

    // Total payments calculation
    const originalTotal = monthlyPayment * Math.ceil((Math.log(1 + monthlyRate * totalDebt / monthlyPayment) / Math.log(1 + monthlyRate)));
    const settlementTotal = settlementAmount;
    const consolidationTotal = consolidationMonthly * 60;
    const bankruptcyTotal = bankruptcyMonthly * 84;

    setSimulationResults({
      timelineData,
      totals: {
        original: originalTotal,
        settlement: settlementTotal,
        consolidation: consolidationTotal,
        bankruptcy: bankruptcyTotal
      },
      monthlyPayments: {
        original: monthlyPayment,
        settlement: settlementMonthlyPayment,
        consolidation: consolidationMonthly,
        bankruptcy: bankruptcyMonthly
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    calculateScenarios();
  };

  const totalPaymentData = simulationResults ? [
    { name: 'Original', amount: simulationResults.totals.original },
    { name: 'Settlement', amount: simulationResults.totals.settlement },
    { name: 'Consolidation', amount: simulationResults.totals.consolidation },
    { name: 'Bankruptcy', amount: simulationResults.totals.bankruptcy }
  ] : [];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Debt Relief Simulator</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Total Debt ($)</label>
          <input
            type="number"
            name="totalDebt"
            value={data.totalDebt}
            onChange={handleChange}
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Interest Rate (%)</label>
          <input
            type="number"
            name="interestRate"
            value={data.interestRate}
            onChange={handleChange}
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Current Monthly Payment ($)</label>
          <input
            type="number"
            name="monthlyPayment"
            value={data.monthlyPayment}
            onChange={handleChange}
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={handleCalculate}
          className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Run Simulation
        </button>
      </div>

      {simulationResults && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">Debt Payoff Timeline</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationResults.timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Remaining Balance ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="original" stroke="#ef4444" name="Original Plan" />
                  <Line type="monotone" dataKey="consolidation" stroke="#3b82f6" name="Consolidation" />
                  <Line type="monotone" dataKey="bankruptcy" stroke="#10b981" name="Bankruptcy" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">Total Payments Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={totalPaymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Total Amount ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Payment']} />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-black">Monthly Payment Comparison</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-black">
                  <span>Original:</span>
                  <span className="font-bold">${simulationResults.monthlyPayments.original.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Settlement:</span>
                  <span className="font-bold text-green-600">${simulationResults.monthlyPayments.settlement.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Consolidation:</span>
                  <span className="font-bold text-blue-600">${simulationResults.monthlyPayments.consolidation.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Bankruptcy:</span>
                  <span className="font-bold text-purple-600">${simulationResults.monthlyPayments.bankruptcy.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4 text-black">Key Insights</h4>
              <ul className="space-y-2 text-sm text-black">
                <li>• Settlement offers the lowest total payment but requires lump sum</li>
                <li>• Consolidation spreads payments over longer term with lower interest</li>
                <li>• Bankruptcy provides the most relief but has long-term consequences</li>
                <li>• Choose based on your financial situation and long-term goals</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}