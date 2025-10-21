import ProgressTracker from '../../components/ProgressTracker';

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Settlement Progress Tracker</h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            Monitor your debt settlement progress in real-time. Track negotiation status,
            view settlements reached, and see your total savings.
          </p>
        </div>
        <ProgressTracker />
      </div>
    </div>
  );
}