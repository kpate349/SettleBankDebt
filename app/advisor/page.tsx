import ChatAdvisor from '../../components/ChatAdvisor';

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Debt Advisor</h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            Chat with our AI assistant to get personalized guidance on debt relief options.
            Answer a few questions and receive tailored recommendations for your situation.
          </p>
        </div>
        <ChatAdvisor />
      </div>
    </div>
  );
}