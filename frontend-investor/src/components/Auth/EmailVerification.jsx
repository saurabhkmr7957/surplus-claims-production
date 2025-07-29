import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/personal-info');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">New Account Email</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33.33%' }}></div>
        </div>
        
        <h2 className="text-xl font-semibold mb-8 text-center">Check Your Email</h2>
        
        <div className="text-center space-y-6">
          <p className="text-gray-700 leading-relaxed">
            We sent a verification link to the email address you used to create the account. 
            If you don't verify your email address, you may not be able to continue.
          </p>
          
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

