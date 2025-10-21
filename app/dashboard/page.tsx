import SuccessDashboard from '../../components/SuccessDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Success Dashboard</h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            See real results from our debt settlement program. Track average debt reduction,
            resolution times, and customer satisfaction scores.
          </p>
        </div>
        <SuccessDashboard />
      </div>
    </div>
  );
}