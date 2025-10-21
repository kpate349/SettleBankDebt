'use client';


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockData = {
  summary: {
    totalClients: 1250,
    averageDebtReduction: 58,
    averageResolutionTime: 4.2,
    averageSatisfaction: 4.7
  },
  debtReductionData: [
    { range: '$0-5K', count: 45, percentage: 12 },
    { range: '$5K-10K', count: 120, percentage: 32 },
    { range: '$10K-25K', count: 180, percentage: 48 },
    { range: '$25K-50K', count: 45, percentage: 12 },
    { range: '$50K+', count: 10, percentage: 3 }
  ],
  resolutionTimeData: [
    { month: '1-3', clients: 320, percentage: 26 },
    { month: '3-6', clients: 580, percentage: 46 },
    { month: '6-9', clients: 280, percentage: 22 },
    { month: '9-12', clients: 70, percentage: 6 }
  ],
  satisfactionData: [
    { rating: 5, count: 680, percentage: 54 },
    { rating: 4, count: 420, percentage: 34 },
    { rating: 3, count: 120, percentage: 10 },
    { rating: 2, count: 25, percentage: 2 },
    { rating: 1, count: 5, percentage: 0.4 }
  ],
  caseStudies: [
    {
      name: 'Sarah M.',
      debt: 35000,
      reduction: 75,
      time: 3,
      satisfaction: 5,
      testimonial: 'SettleBankDebt helped me save thousands and get back on track financially.'
    },
    {
      name: 'Mike R.',
      debt: 18500,
      reduction: 60,
      time: 5,
      satisfaction: 5,
      testimonial: 'Professional service and great results. Highly recommend!'
    },
    {
      name: 'Jennifer L.',
      debt: 42000,
      reduction: 70,
      time: 4,
      satisfaction: 4,
      testimonial: 'The settlement process was smooth and the savings were substantial.'
    }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function SuccessDashboard() {


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Customer Success Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{mockData.summary.totalClients.toLocaleString()}</div>
          <div className="text-sm text-black">Total Clients Helped</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{mockData.summary.averageDebtReduction}%</div>
          <div className="text-sm text-gray-900">Average Debt Reduction</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{mockData.summary.averageResolutionTime} months</div>
          <div className="text-sm text-gray-900">Average Resolution Time</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{mockData.summary.averageSatisfaction}/5</div>
          <div className="text-sm text-gray-900">Average Satisfaction</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Debt Reduction Distribution */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">Debt Reduction by Amount</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.debtReductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} clients`, 'Count']} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Time Distribution */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">Resolution Time Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.resolutionTimeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ month, percentage }) => `${month} months: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="clients"
                >
                  {mockData.resolutionTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} clients`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Satisfaction Ratings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-black">Customer Satisfaction Ratings</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {mockData.satisfactionData.map((item) => (
            <div key={item.rating} className="text-center">
              <div className="text-3xl font-bold text-gray-800">{item.rating}★</div>
              <div className="text-lg font-semibold text-black">{item.count}</div>
              <div className="text-sm text-gray-900">({item.percentage}%)</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-black">Real Client Success Stories</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {mockData.caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg text-black">{study.name}</h4>
                <div className="text-right">
                  <div className="text-sm text-black">Debt: ${study.debt.toLocaleString()}</div>
                  <div className="text-green-600 font-bold">{study.reduction}% saved</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2 text-black">
                  <span>Resolution time:</span>
                  <span className="font-medium">{study.time} months</span>
                </div>
                <div className="flex justify-between text-sm text-black">
                  <span>Satisfaction:</span>
                  <span className="font-medium">{'★'.repeat(study.satisfaction)}</span>
                </div>
              </div>
              <blockquote className="text-gray-900 italic">&ldquo;{study.testimonial}&rdquo;</blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-900 text-center">
          * Results based on actual client data. Individual results may vary based on specific circumstances.
        </p>
      </div>
    </div>
  );
}