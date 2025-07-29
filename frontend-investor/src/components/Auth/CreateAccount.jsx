import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    partnerCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendVerification = () => {
    // TODO: Implement email verification logic
    navigate('/email-verification');
  };

  const handleNext = () => {
    navigate('/personal-info');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">New Account</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '16.67%' }}></div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 text-center">Create Account</h2>
        
        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input
              type="text"
              name="partnerCode"
              placeholder="Partner Code"
              value={formData.partnerCode}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSendVerification}
              className="bg-orange-400 text-white px-6 py-3 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Send Verification Email
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Next (button)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

