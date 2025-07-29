import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OnlineAccess = () => {
  const navigate = useNavigate();
  const [isAgreedNDA, setIsAgreedNDA] = useState(false);
  const [isAgreedPlatform, setIsAgreedPlatform] = useState(false);

  const steps = [
    { id: 1, title: 'Accept Agreement', completed: true },
    { id: 2, title: 'Identify Account', completed: false },
    { id: 3, title: 'Confirm Identity', completed: false },
    { id: 4, title: 'Set Up Profile', completed: false },
    { id: 5, title: 'Review Information', completed: false },
    { id: 6, title: 'Create Login', completed: false }
  ];

  const handleAccept = () => {
    if (!isAgreedNDA || !isAgreedPlatform) {
      alert('Please read and accept all agreements to continue');
      return;
    }
    // Complete registration and redirect to dashboard
    // For demo purposes, we'll set a mock user
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      id: 1
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">Get Online Access</h1>
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                step.completed ? 'bg-blue-600' : index === 0 ? 'bg-blue-600' : 'bg-gray-400'
              }`}>
                {step.completed ? '✓' : step.id}
              </div>
              <div className="text-xs text-center mt-2 max-w-16">
                <div className="font-semibold">{step.title.split(' ')[0]}</div>
                <div>{step.title.split(' ').slice(1).join(' ')}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-8">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-8">
              <h2 className="text-xl font-semibold mb-4">Review and Sign the NDA</h2>
              <div className="bg-gray-50 p-4 rounded-md max-h-60 overflow-y-auto text-sm mb-6">
                <p className="mb-4">
                  NDA Document Content Area - This is where the full text of the Non-Disclosure Agreement would be displayed.
                  It would cover confidentiality clauses, non-compete, non-solicitation, and other legal terms related to
                  the proprietary information shared on the platform and about the investment opportunities.
                  Users must read and understand this agreement before proceeding.
                </p>
                <p className="mb-4">Additional NDA content...</p>
                <p>More NDA content...</p>
              </div>
              <div className="mt-6 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="agreement-nda"
                  checked={isAgreedNDA}
                  onChange={(e) => setIsAgreedNDA(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreement-nda" className="text-sm text-gray-700">
                  I have read and understood the NDA.
                </label>
              </div>
              <p className="text-sm text-gray-600 mt-2 mb-8">
                You must accept the NDA to proceed.
              </p>

              <h2 className="text-xl font-semibold mb-4">Accept the Platform Agreement</h2>
              <div className="bg-gray-50 p-4 rounded-md max-h-60 overflow-y-auto text-sm">
                <p className="mb-4">
                  I have read, understand, and accept the terms and conditions set forth below, by selecting the "Accept" 
                  option below. NOTE: ACCESSING OR REQUESTING ACCOUNT INFORMATION OR TRANSACTIONS 
                  THROUGH THIS SITE CONSTITUTES AND SHALL BE DEEMED TO BE AN ACCEPTANCE OF THE 
                  FOLLOWING TERMS AND CONDITIONS, WHICH CONSTITUTES A LEGAL AGREEMENT BETWEEN MYSELF 
                  AND XYZ FUNDS.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <strong>1. Online Services.</strong> This Agreement ("Agreement") between me and XYZ Funds (the "Fund") sets forth 
                    the terms on which I am permitted to use the Online Services. The words "I", "my" and "me" in this 
                    Agreement mean each person who has an interest in the Fund account, that is accessible through 
                    the Online Services and any person authorized to have such access. Online Services, for purposes of 
                    this Agreement, includes the online services currently offered and that may be offered in the future 
                    by the Fund for mutual fund transactions and account inquiry, and any other online system made 
                    available to the Fund shareholders by the Fund or its affiliates, agents or service providers. The 
                    Online Services permit me to transact electronically requests to buy, redeem and exchange shares of 
                    the Fund. These services are available for use with compatible personal, home, or small business 
                    computers with modems that can connect to the Internet.
                  </div>
                  
                  <div>
                    <strong>2. Agreement Governs.</strong> I will use the Online Services only on the terms set forth in this Agreement.
                  </div>
                  
                  <div>
                    <strong>3. Sole User.</strong> I will be the only authorized user of the Online Services under this Agreement and I will not 
                    make the Online Services available to anyone else. I will keep my security code(s) and other security 
                    information (all such codes and information, "security information") confidential. I will be solely 
                    responsible for all requests for transactions and information (and the use of the information) 
                    transmitted through the Online Services using my security information. The Fund is not obligated to...
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="agreement-platform"
                  checked={isAgreedPlatform}
                  onChange={(e) => setIsAgreedPlatform(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreement-platform" className="text-sm text-gray-700">
                  I have read and understood the platform agreement.
                </label>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">
                You can proceed only if you accept the terms and conditions.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleAccept}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Accept
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineAccess;

