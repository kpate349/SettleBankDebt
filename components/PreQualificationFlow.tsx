'use client';

import { useState } from 'react';

interface QualificationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string; // Last 4 digits
  totalDebt: string;
  monthlyIncome: string;
  creditScore: string;
  employmentStatus: string;
  consent: boolean;
}

interface QualificationResult {
  eligible: boolean;
  score: number;
  recommendedPrograms: string[];
  estimatedSavings: number;
  nextSteps: string[];
  riskFactors: string[];
}

export default function PreQualificationFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QualificationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ssn: '',
    totalDebt: '',
    monthlyIncome: '',
    creditScore: '',
    employmentStatus: 'employed',
    consent: false
  });
  const [result, setResult] = useState<QualificationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const performQualification = async () => {
    setIsProcessing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock qualification logic
    const debt = parseFloat(formData.totalDebt);
    const income = parseFloat(formData.monthlyIncome);
    const score = parseInt(formData.creditScore);

    let score_total = 0;
    const riskFactors: string[] = [];
    let recommendedPrograms: string[] = [];

    // Credit score evaluation (0-30 points)
    if (score >= 700) score_total += 30;
    else if (score >= 600) score_total += 20;
    else if (score >= 500) score_total += 10;
    else score_total += 0;

    // Debt-to-income ratio (0-30 points)
    const dti = debt / (income * 12);
    if (dti <= 0.3) score_total += 30;
    else if (dti <= 0.5) score_total += 20;
    else if (dti <= 0.7) score_total += 10;
    else score_total += 0;

    // Debt amount (0-20 points)
    if (debt >= 10000) score_total += 20;
    else if (debt >= 5000) score_total += 15;
    else if (debt >= 2500) score_total += 10;
    else score_total += 5;

    // Employment stability (0-20 points)
    if (formData.employmentStatus === 'employed') score_total += 20;
    else if (formData.employmentStatus === 'self-employed') score_total += 15;
    else score_total += 5;

    // Determine eligibility and recommendations
    const eligible = score_total >= 40;
    const estimatedSavings = eligible ? debt * (0.4 + (score_total / 100) * 0.3) : 0;

    if (eligible) {
      if (score_total >= 80) {
        recommendedPrograms = ['Debt Settlement', 'Debt Consolidation', 'Balance Transfer'];
      } else if (score_total >= 60) {
        recommendedPrograms = ['Debt Settlement', 'Debt Consolidation'];
      } else {
        recommendedPrograms = ['Debt Settlement'];
      }
    }

    // Risk factors
    if (score < 600) riskFactors.push('Low credit score may limit options');
    if (dti > 0.5) riskFactors.push('High debt-to-income ratio');
    if (debt < 2500) riskFactors.push('Debt amount may be too low for some programs');
    if (formData.employmentStatus === 'unemployed') riskFactors.push('Employment status may affect approval');

    const nextSteps = eligible
      ? [
          'Complete full application',
          'Provide supporting documentation',
          'Schedule consultation with advisor',
          'Begin negotiation process'
        ]
      : [
          'Consider credit improvement options',
          'Explore alternative debt relief programs',
          'Consult with a financial advisor'
        ];

    setResult({
      eligible,
      score: score_total,
      recommendedPrograms,
      estimatedSavings: Math.round(estimatedSavings),
      nextSteps,
      riskFactors
    });

    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === totalSteps) {
      performQualification();
    } else {
      nextStep();
    }
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Pre-Qualification Results</h2>

        <div className={`p-6 rounded-lg mb-6 ${result.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold ${result.eligible ? 'text-green-600' : 'text-red-600'}`}>
              {result.eligible ? 'Eligible!' : 'Not Eligible'}
            </div>
            <div className="text-lg text-gray-900">Qualification Score: {result.score}/100</div>
          </div>

          {result.eligible && (
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-blue-600">${result.estimatedSavings.toLocaleString()}</div>
              <div className="text-sm text-gray-900">Estimated Potential Savings</div>
            </div>
          )}
        </div>

        {result.recommendedPrograms.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recommended Programs</h3>
            <ul className="space-y-2">
              {result.recommendedPrograms.map((program, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  {program}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.riskFactors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-orange-600">Risk Factors</h3>
            <ul className="space-y-2">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-center text-orange-700">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
          <ol className="space-y-2">
            {result.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setResult(null);
              setStep(1);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                ssn: '',
                totalDebt: '',
                monthlyIncome: '',
                creditScore: '',
                employmentStatus: 'employed',
                consent: false
              });
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors mr-4"
          >
            Start New Application
          </button>
          {result.eligible && (
            <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors">
              Proceed to Full Application
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Automated Pre-Qualification</h2>
          <span className="text-sm text-gray-900">Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last 4 Digits of SSN</label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                maxLength={4}
                pattern="[0-9]{4}"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Total Debt Amount ($)</label>
              <input
                type="number"
                name="totalDebt"
                value={formData.totalDebt}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter total debt"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Income ($)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter monthly income"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Credit Score</label>
              <input
                type="number"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleInputChange}
                min="300"
                max="850"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter credit score (300-850)"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Employment Status</label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Consent & Authorization</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-4">
                By checking this box, you authorize SettleBankDebt to perform a soft credit inquiry
                for pre-qualification purposes. This will not affect your credit score.
              </p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mr-3"
                  required
                />
                <span className="text-sm">
                  I consent to the soft credit inquiry and agree to the terms of service.
                </span>
              </label>
            </div>

            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-900">Processing your pre-qualification...</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              disabled={isProcessing}
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors ml-auto"
            disabled={isProcessing}
          >
            {step === totalSteps ? (isProcessing ? 'Processing...' : 'Get Results') : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}