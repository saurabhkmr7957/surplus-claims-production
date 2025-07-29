import { useState } from 'react';

const InvestmentSuccess = ({ investmentData, onViewDashboard, onMakeAnotherInvestment }) => {
  const [emailSent, setEmailSent] = useState(false);

  const sendConfirmationEmail = async () => {
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-gray-900">Investment Successful!</h3>
            <p className="mt-2 text-sm text-gray-600">
              Your investment has been submitted and is being processed.
            </p>

            {/* Investment Details */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Investment Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{investmentData.package_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">${parseFloat(investmentData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type:</span>
                  <span className="font-medium capitalize">{investmentData.account_type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference ID:</span>
                  <span className="font-medium">INV-{Date.now().toString().slice(-6)}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-6 text-left">
              <h4 className="text-sm font-medium text-gray-900 mb-3">What happens next?</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Funding Verification</p>
                    <p>We'll verify your funding source within 1-2 business days.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Investment Allocation</p>
                    <p>Your investment will be allocated to specific claims within the package.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Progress Tracking</p>
                    <p>Monitor your investment progress through your dashboard.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="mt-6">
              {!emailSent ? (
                <button
                  onClick={sendConfirmationEmail}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Send confirmation email
                </button>
              ) : (
                <p className="text-sm text-green-600">✓ Confirmation email sent</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={onViewDashboard}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                View Dashboard
              </button>
              
              <button
                onClick={onMakeAnotherInvestment}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Make Another Investment
              </button>
            </div>

            {/* Support */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Questions about your investment?{' '}
                <a href="mailto:support@surplusclaims.com" className="text-blue-600 hover:text-blue-500">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuccess;

