import DebtEvaluationForm from '../../components/DebtEvaluationForm';

export default function EvaluationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Debt Evaluation</h1>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            Discover your potential savings and eligibility for debt settlement.
            Get a personalized assessment in minutes.
          </p>
        </div>
        <DebtEvaluationForm />
      </div>
    </div>
  );
}