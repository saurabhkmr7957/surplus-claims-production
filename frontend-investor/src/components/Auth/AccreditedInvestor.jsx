import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccreditedInvestor = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    if (!isChecked) {
      alert('Please confirm your accredited investor status');
      return;
    }
    navigate('/online-access');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Accredited investor certification</h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
        </div>
        
        <h2 className="text-xl font-semibold mb-8 text-center">Accredited investor certification</h2>
        
        <div className="text-center space-y-8">
          <div className="bg-gray-50 p-6 rounded-md">
            <p className="text-gray-700 mb-4">
              By checking the box below you stating
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <input
              type="checkbox"
              id="accredited"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="accredited" className="text-gray-700">
              (check box)
            </label>
          </div>
        </div>
        
        <div className="mt-12 text-center">
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

export default AccreditedInvestor;

