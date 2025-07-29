import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from "../../lib/utils";

const InvestmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentDetails();
  }, [id]);

  const fetchInvestmentDetails = async () => {
    try {
      // Mock data - replace with actual API call
      const mockInvestment = {
        id: parseInt(id),
        title: 'Orlando Surplus Claims Bundle',
        description: 'High-yield surplus claims from Orlando foreclosure auctions with verified legal documentation and clear title paths.',
        longDescription: `This investment opportunity consists of a carefully curated bundle of surplus claims from Orlando-area foreclosure auctions. Each claim has been thoroughly vetted by our legal team and represents excess funds from property sales that exceeded the outstanding mortgage balance.

        Our research indicates strong potential for recovery based on historical data from similar claims in the Orlando market. The average recovery time for this type of claim is 18-24 months, with recovery rates consistently above 85% in this market.

        Key highlights include:
        • All claims have clear legal documentation
        • Properties located in high-growth Orlando suburbs
        • Average claim value: $45,000
        • Diversified across 15+ individual claims
        • Professional legal representation included`,
        
        minInvestment: 50000,
        maxInvestment: 250000,
        expectedReturn: 12.5,
        duration: '18-24 months',
        riskLevel: 'Medium',
        fundingProgress: 65,
        totalFunding: 1000000,
        currentFunding: 650000,
        
        keyMetrics: {
          totalClaims: 18,
          averageClaimValue: 45000,
          expectedRecoveryRate: 87,
          legalFeesIncluded: true,
          insuranceCoverage: true
        },
        
        documents: [
          { name: 'Investment Memorandum', type: 'PDF', size: '2.4 MB' },
          { name: 'Legal Opinion Letter', type: 'PDF', size: '1.8 MB' },
          { name: 'Claims Summary Report', type: 'PDF', size: '3.2 MB' },
          { name: 'Risk Disclosure Statement', type: 'PDF', size: '1.1 MB' }
        ],
        
        timeline: [
          { stage: 'Investment Period', duration: '30 days', status: 'current' },
          { stage: 'Legal Filing', duration: '60-90 days', status: 'upcoming' },
          { stage: 'Court Processing', duration: '6-12 months', status: 'upcoming' },
          { stage: 'Recovery & Distribution', duration: '30-60 days', status: 'upcoming' }
        ],
        
        riskFactors: [
          'Court processing times may vary',
          'Recovery amounts may be less than projected',
          'Legal challenges from other parties possible',
          'Market conditions may affect property values'
        ]
      };
      
      setInvestment(mockInvestment);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching investment details:', error);
      setLoading(false);
    }
  };

  const handleInvestNow = () => {
    navigate(`/invest/${id}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment details...</p>
        </div>
      </div>
    );
  }

  if (!investment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Investment not found</p>
          <button
            onClick={handleBackToDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Investment Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Investment Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{investment.title}</h2>
                  <p className="text-gray-600 mb-4">{investment.description}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  investment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {investment.riskLevel} Risk
                </span>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{investment.expectedReturn}%</p>
                  <p className="text-sm text-gray-600">Expected Return</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{investment.duration}</p>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{investment.keyMetrics.totalClaims}</p>
                  <p className="text-sm text-gray-600">Total Claims</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{investment.keyMetrics.expectedRecoveryRate}%</p>
                  <p className="text-sm text-gray-600">Recovery Rate</p>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Funding Progress</span>
                  <span>{investment.fundingProgress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full" 
                    style={{ width: `${investment.fundingProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>${investment.currentFunding.toLocaleString()} raised</span>
                  <span>${investment.totalFunding.toLocaleString()} target</span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Overview</h3>
              <div className="prose prose-sm text-gray-600">
                {investment.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Investment Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Timeline</h3>
              <div className="space-y-4">
                {investment.timeline.map((phase, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      phase.status === 'current' ? 'bg-blue-600' : 
                      phase.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">{phase.stage}</h4>
                        <span className="text-sm text-gray-500">{phase.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
              <ul className="space-y-2">
                {investment.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span className="text-sm text-gray-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Investment Action Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Minimum Investment</span>
                  <span className="text-sm font-medium">${investment.minInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Maximum Investment</span>
                  <span className="text-sm font-medium">${investment.maxInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Claim Value</span>
                  <span className="text-sm font-medium">${investment.keyMetrics.averageClaimValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Legal Fees</span>
                  <span className="text-sm font-medium text-green-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Insurance Coverage</span>
                  <span className="text-sm font-medium text-green-600">Yes</span>
                </div>
              </div>

              <button
                onClick={handleInvestNow}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                Invest Now
              </button>

              <p className="text-xs text-gray-500 text-center">
                By investing, you agree to our terms and conditions
              </p>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Documents</h3>
              <div className="space-y-3">
                {investment.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;

