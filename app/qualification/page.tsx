import PreQualificationFlow from '../../components/PreQualificationFlow';

export default function QualificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Automated Pre-Qualification</h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            Get instant pre-qualification for debt relief programs. Our automated system
            performs a soft credit check and analyzes your debt load to determine program fit.
          </p>
        </div>
        <PreQualificationFlow />
      </div>
    </div>
  );
}