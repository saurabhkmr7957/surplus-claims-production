import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from "../../lib/utils";

const InvestmentFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [investment, setInvestment] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    accountType: '',
    fundingMethod: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    wireInstructions: '',
    agreementAccepted: false
  });

  const steps = [
    { id: 1, title: 'Investment Amount', description: 'Choose your investment amount and account type' },
    { id: 2, title: 'Funding Information', description: 'Provide your funding details' },
    { id: 3, title: 'Review & Confirm', description: 'Review your investment and confirm' }
  ];

  useEffect(() => {
    fetchInvestmentData();
  }, [id]);

  const fetchInvestmentData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockInvestment = {
        id: parseInt(id),
        title: 'Orlando Surplus Claims Bundle',
        expectedReturn: 12.5,
        duration: '18-24 months',
        minInvestment: 50000,
        maxInvestment: 250000,
        riskLevel: 'Medium'
      };
      setInvestment(mockInvestment);
    } catch (error) {
      console.error('Error fetching investment data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.amount && formData.accountType;
      case 2:
        return formData.fundingMethod && 
               (formData.fundingMethod === 'bank_transfer' ? 
                (formData.bankName && formData.accountNumber && formData.routingNumber) : 
                formData.wireInstructions);
      case 3:
        return formData.agreementAccepted;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    try {
      // Submit investment
      console.log('Submitting investment:', formData);
      navigate('/investment-success');
    } catch (error) {
      console.error('Error submitting investment:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Amount</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount (USD)
                  </label>
                  <input
                    type="number"
                    min={investment?.minInvestment}
                    max={investment?.maxInvestment}
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Min: $${investment?.minInvestment?.toLocaleString()}`}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum: ${investment?.minInvestment?.toLocaleString()} | 
                    Maximum: ${investment?.maxInvestment?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Type</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="individual"
                    checked={formData.accountType === 'individual'}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Individual/Business Account</div>
                    <div className="text-sm text-gray-500">Direct investment from personal or business funds</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="custodian"
                    checked={formData.accountType === 'custodian'}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Custodian Account (IRA, 401k, etc.)</div>
                    <div className="text-sm text-gray-500">Investment through retirement or custodial account</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Funding Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="fundingMethod"
                    value="bank_transfer"
                    checked={formData.fundingMethod === 'bank_transfer'}
                    onChange={(e) => handleInputChange('fundingMethod', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Bank Transfer (ACH)</div>
                    <div className="text-sm text-gray-500">3-5 business days processing time</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="fundingMethod"
                    value="wire_transfer"
                    checked={formData.fundingMethod === 'wire_transfer'}
                    onChange={(e) => handleInputChange('fundingMethod', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Wire Transfer</div>
                    <div className="text-sm text-gray-500">Same day processing (fees may apply)</div>
                  </div>
                </label>
              </div>
            </div>

            {formData.fundingMethod === 'bank_transfer' && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Bank Account Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={formData.routingNumber}
                      onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter routing number"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.fundingMethod === 'wire_transfer' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Wire Transfer Instructions</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Bank Name:</strong> SurplusClaims Trust Bank</p>
                  <p><strong>Account Name:</strong> SurplusClaims Investment Trust</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>Routing Number:</strong> 021000021</p>
                  <p><strong>Reference:</strong> Investment #{id} - {formData.amount}</p>
                </div>
                <div className="mt-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.wireInstructions}
                      onChange={(e) => handleInputChange('wireInstructions', e.target.checked)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-blue-800">I have noted the wire transfer instructions</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Summary</h3>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment</span>
                  <span className="font-medium">{investment?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">${parseInt(formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium capitalize">{formData.accountType?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funding Method</span>
                  <span className="font-medium capitalize">{formData.fundingMethod?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="font-medium text-green-600">{investment?.expectedReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{investment?.duration}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Important Notice</h4>
              <p className="text-sm text-yellow-800">
                By proceeding with this investment, you acknowledge that you have read and understood 
                all investment documents, risk factors, and terms and conditions. This investment 
                involves risk and past performance does not guarantee future results.
              </p>
            </div>

            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreementAccepted}
                  onChange={(e) => handleInputChange('agreementAccepted', e.target.checked)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the <a href="#" className="text-blue-600 hover:underline">Investment Agreement</a>, 
                  <a href="#" className="text-blue-600 hover:underline"> Risk Disclosure</a>, and 
                  <a href="#" className="text-blue-600 hover:underline"> Terms of Service</a>.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!investment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Investment Process</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.id} className="text-center" style={{ width: '200px' }}>
                <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Info Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{investment.title}</h2>
              <div className="flex space-x-6 text-sm text-gray-600">
                <span>Expected Return: <strong className="text-green-600">{investment.expectedReturn}%</strong></span>
                <span>Duration: <strong>{investment.duration}</strong></span>
                <span>Risk Level: <strong>{investment.riskLevel}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-md font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Back
          </button>
          
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={!validateCurrentStep()}
              className={`px-6 py-2 rounded-md font-medium ${
                validateCurrentStep()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!validateCurrentStep()}
              className={`px-6 py-2 rounded-md font-medium ${
                validateCurrentStep()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm Investment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentFlow;

