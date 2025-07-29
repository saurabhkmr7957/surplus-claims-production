import { useState } from 'react';

const SignUp = ({ onSignUp, onSwitchToSignIn }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'US',
    
    // Account
    password: '',
    confirm_password: '',
    
    // Investment Profile
    account_type: 'individual', // individual, business, custodian
    investment_experience: '',
    annual_income: '',
    net_worth: '',
    accredited_investor: false,
    
    // Agreements
    terms_accepted: false,
    privacy_accepted: false,
    marketing_consent: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.first_name) newErrors.first_name = 'First name is required';
      if (!formData.last_name) newErrors.last_name = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    }
    
    if (stepNumber === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip_code) newErrors.zip_code = 'ZIP code is required';
    }
    
    if (stepNumber === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = 'Passwords do not match';
      }
    }
    
    if (stepNumber === 4) {
      if (!formData.investment_experience) newErrors.investment_experience = 'Investment experience is required';
      if (!formData.annual_income) newErrors.annual_income = 'Annual income is required';
      if (!formData.net_worth) newErrors.net_worth = 'Net worth is required';
    }
    
    if (stepNumber === 5) {
      if (!formData.terms_accepted) newErrors.terms_accepted = 'You must accept the terms and conditions';
      if (!formData.privacy_accepted) newErrors.privacy_accepted = 'You must accept the privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSignUp({
        id: Date.now(),
        ...formData
      });
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.first_name ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.last_name ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.date_of_birth ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.state ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Select State</option>
                <option value="AL">Alabama</option>
                <option value="CA">California</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                {/* Add more states as needed */}
              </select>
              {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.zip_code ? 'border-red-300' : 'border-gray-300'}`}
              />
              {errors.zip_code && <p className="mt-1 text-sm text-red-600">{errors.zip_code}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <select
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="individual">Individual Account</option>
              <option value="business">Business Account</option>
              <option value="custodian">Custodian Account (IRA/401k)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            <p className="mt-1 text-sm text-gray-500">Must be at least 8 characters long</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.confirm_password ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.confirm_password && <p className="mt-1 text-sm text-red-600">{errors.confirm_password}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Profile</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Investment Experience</label>
            <select
              name="investment_experience"
              value={formData.investment_experience}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.investment_experience ? 'border-red-300' : 'border-gray-300'}`}
            >
              <option value="">Select Experience Level</option>
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (3-7 years)</option>
              <option value="experienced">Experienced (8+ years)</option>
              <option value="professional">Professional Investor</option>
            </select>
            {errors.investment_experience && <p className="mt-1 text-sm text-red-600">{errors.investment_experience}</p>}
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Income</label>
              <select
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.annual_income ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Select Income Range</option>
                <option value="under_50k">Under $50,000</option>
                <option value="50k_100k">$50,000 - $100,000</option>
                <option value="100k_200k">$100,000 - $200,000</option>
                <option value="200k_500k">$200,000 - $500,000</option>
                <option value="over_500k">Over $500,000</option>
              </select>
              {errors.annual_income && <p className="mt-1 text-sm text-red-600">{errors.annual_income}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Net Worth</label>
              <select
                name="net_worth"
                value={formData.net_worth}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.net_worth ? 'border-red-300' : 'border-gray-300'}`}
              >
                <option value="">Select Net Worth Range</option>
                <option value="under_100k">Under $100,000</option>
                <option value="100k_500k">$100,000 - $500,000</option>
                <option value="500k_1m">$500,000 - $1,000,000</option>
                <option value="1m_5m">$1,000,000 - $5,000,000</option>
                <option value="over_5m">Over $5,000,000</option>
              </select>
              {errors.net_worth && <p className="mt-1 text-sm text-red-600">{errors.net_worth}</p>}
            </div>
          </div>
          
          <div>
            <div className="flex items-center">
              <input
                id="accredited_investor"
                name="accredited_investor"
                type="checkbox"
                checked={formData.accredited_investor}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="accredited_investor" className="ml-2 block text-sm text-gray-900">
                I am an accredited investor
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Accredited investors have access to additional investment opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Terms and Agreements</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <input
              id="terms_accepted"
              name="terms_accepted"
              type="checkbox"
              checked={formData.terms_accepted}
              onChange={handleChange}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 ${errors.terms_accepted ? 'border-red-300' : ''}`}
            />
            <label htmlFor="terms_accepted" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">Terms and Conditions</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">Investment Agreement</a>
            </label>
          </div>
          {errors.terms_accepted && <p className="ml-6 text-sm text-red-600">{errors.terms_accepted}</p>}
          
          <div className="flex items-start">
            <input
              id="privacy_accepted"
              name="privacy_accepted"
              type="checkbox"
              checked={formData.privacy_accepted}
              onChange={handleChange}
              className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 ${errors.privacy_accepted ? 'border-red-300' : ''}`}
            />
            <label htmlFor="privacy_accepted" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
            </label>
          </div>
          {errors.privacy_accepted && <p className="ml-6 text-sm text-red-600">{errors.privacy_accepted}</p>}
          
          <div className="flex items-start">
            <input
              id="marketing_consent"
              name="marketing_consent"
              type="checkbox"
              checked={formData.marketing_consent}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="marketing_consent" className="ml-2 block text-sm text-gray-900">
              I consent to receive marketing communications (optional)
            </label>
          </div>
        </div>
        
        {errors.submit && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Personal Info', component: renderStep1 },
    { number: 2, title: 'Address', component: renderStep2 },
    { number: 3, title: 'Account', component: renderStep3 },
    { number: 4, title: 'Investment Profile', component: renderStep4 },
    { number: 5, title: 'Agreements', component: renderStep5 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= stepItem.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= stepItem.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`ml-4 w-8 h-0.5 ${
                    step > stepItem.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={step === 5 ? handleSubmit : (e) => e.preventDefault()}>
            {steps[step - 1].component()}
            
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              
              <div className="ml-auto">
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

