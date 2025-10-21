import DebtSimulator from '../../components/DebtSimulator';

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Debt Relief Simulator</h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            Compare different debt relief options and see how they impact your timeline and total payments.
            Make informed decisions about your financial future.
          </p>
        </div>
        <DebtSimulator />
      </div>
    </div>
  );
}