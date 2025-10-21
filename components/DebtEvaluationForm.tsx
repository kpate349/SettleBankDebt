'use client';

import { useState } from 'react';

interface FormData {
  totalDebt: string;
  monthlyIncome: string;
  creditScore: string;
  debtType: string;
}

export default function DebtEvaluationForm() {
  const [formData, setFormData] = useState<FormData>({
    totalDebt: '',
    monthlyIncome: '',
    creditScore: '',
    debtType: 'credit_card'
  });

  const [results, setResults] = useState<{
    potentialSavings: number;
    eligibilityScore: number;
    recommendedAction: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const debt = parseFloat(formData.totalDebt);
    const income = parseFloat(formData.monthlyIncome);
    const score = parseInt(formData.creditScore);

    if (debt && income && score) {
      // Simple calculation logic (in real app, this would be more sophisticated)
      const debtToIncomeRatio = debt / (income * 12);
      const eligibilityScore = Math.min(100, Math.max(0, (score / 850) * 100 - debtToIncomeRatio * 20));
      const potentialSavings = debt * (0.3 + (eligibilityScore / 100) * 0.4); // 30-70% savings

      let recommendedAction = 'Consider debt consolidation';
      if (eligibilityScore > 70) recommendedAction = 'Excellent candidate for settlement';
      else if (eligibilityScore > 50) recommendedAction = 'Good candidate for settlement';
      else if (eligibilityScore > 30) recommendedAction = 'May qualify with additional factors';

      setResults({
        potentialSavings: Math.round(potentialSavings),
        eligibilityScore: Math.round(eligibilityScore),
        recommendedAction
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Free Debt Evaluation Tool</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Total Debt Amount ($)</label>
          <input
            type="number"
            name="totalDebt"
            value={formData.totalDebt}
            onChange={handleChange}
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter total debt"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">Monthly Income ($)</label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter monthly income"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-black">Credit Score</label>
          <input
            type="number"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            min="300"
            max="850"
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter credit score (300-850)"
            required
          />
        </div>

        <div>
          <label className="text-black block text-sm font-medium mb-2 text-black">Primary Debt Type</label>
          <select
            name="debtType"
            value={formData.debtType}
            onChange={handleChange}
            className="text-black w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="credit_card">Credit Card</option>
            <option value="personal_loan">Personal Loan</option>
            <option value="medical">Medical Debt</option>
            <option value="student">Student Loan</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-black w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Potential Savings
        </button>
      </form>

      {results && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold mb-4 text-green-800">Your Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Potential Savings:</span>
              <span className="text-green-600 font-bold">${results.potentialSavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Eligibility Score:</span>
              <span className="text-blue-600 font-bold">{results.eligibilityScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Recommendation:</span>
              <span className="text-purple-600 font-bold">{results.recommendedAction}</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-900">
            * This is an estimate based on general data. Contact us for a personalized evaluation.
          </p>
        </div>
      )}
    </div>
  );
}