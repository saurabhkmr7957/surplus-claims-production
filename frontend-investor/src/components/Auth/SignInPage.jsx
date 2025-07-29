import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // For demo purposes, create a mock user session
    const mockUser = {
      name: 'John Doe',
      email: email || 'john@example.com',
      id: 1
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate('/dashboard');
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const handleDemoLogin = () => {
    // Quick demo login for testing
    const mockUser = {
      name: 'Demo User',
      email: 'demo@example.com',
      id: 1
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    // Force a page reload to ensure the user state is updated
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome To After Foreclosure Assets</h1>
          <p className="text-gray-600">The top gainer in your portfolio</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>

          <button
            onClick={handleDemoLogin}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Demo Login (Skip to Dashboard)
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleCreateAccount}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

