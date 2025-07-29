import { useState, useEffect } from 'react';
import { getApiBaseUrl } from "../lib/utils";

const Dashboard = ({ userId = 1, onSignOut, onStartInvestment }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [packages, setPackages] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = getApiBaseUrl();

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch user portfolio
      const portfolioResponse = await fetch(`${API_BASE}/api/users/${userId}/portfolio`);
      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json();
        setPortfolio(portfolioData);
      }

      // Fetch investment packages
      const packagesResponse = await fetch(`${API_BASE}/api/packages`);
      if (packagesResponse.ok) {
        const packagesData = await packagesResponse.json();
        setPackages(packagesData);
      }

      // Fetch claims
      const claimsResponse = await fetch(`${API_BASE}/api/claims`);
      if (claimsResponse.ok) {
        const claimsData = await claimsResponse.json();
        setClaims(claimsData);
      }

    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const makeInvestment = async (packageId, amount) => {
    try {
      const response = await fetch(`${API_BASE}/api/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          package_id: packageId,
          amount: amount
        })
      });

      if (response.ok) {
        // Refresh data after investment
        fetchData();
        alert('Investment successful!');
      } else {
        const errorData = await response.json();
        alert(`Investment failed: ${errorData.error}`);
      }
    } catch (err) {
      alert('Investment failed: Network error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'verification': 'bg-yellow-100 text-yellow-800',
      'legal_process': 'bg-blue-100 text-blue-800',
      'court_approval': 'bg-purple-100 text-purple-800',
      'payout_pending': 'bg-orange-100 text-orange-800',
      'paid': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Welcome, {portfolio?.user?.first_name} {portfolio?.user?.last_name}
              </div>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        {portfolio && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Invested</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio.total_invested)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Current Value</h3>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolio.total_current_value)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Returns</h3>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(portfolio.total_returns)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Wallet Balance</h3>
              <p className="text-2xl font-bold text-gray-900">
                {portfolio.wallet ? formatCurrency(portfolio.wallet.balance) : '$0.00'}
              </p>
            </div>
          </div>
        )}

        {/* Investment Packages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Investment Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {pkg.package_type.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Target Amount:</span>
                    <span className="text-sm font-medium">{formatCurrency(pkg.target_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Current Amount:</span>
                    <span className="text-sm font-medium">{formatCurrency(pkg.current_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Min Investment:</span>
                    <span className="text-sm font-medium">{formatCurrency(pkg.min_investment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Projected Return:</span>
                    <span className="text-sm font-medium">{pkg.projected_return_min}% - {pkg.projected_return_max}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Timeline:</span>
                    <span className="text-sm font-medium">{pkg.expected_timeline_months} months</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Funding Progress</span>
                    <span>{pkg.funding_percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(pkg.funding_percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onStartInvestment) {
                      onStartInvestment({
                        id: pkg.id,
                        name: pkg.name,
                        min_investment: pkg.min_investment,
                        projected_return_min: pkg.projected_return_min,
                        projected_return_max: pkg.projected_return_max,
                        expected_timeline_months: pkg.expected_timeline_months,
                        funding_percentage: pkg.funding_percentage
                      });
                    } else {
                      const amount = prompt(`Enter investment amount (minimum ${formatCurrency(pkg.min_investment)}):`);
                      if (amount && parseFloat(amount) >= pkg.min_investment) {
                        makeInvestment(pkg.id, parseFloat(amount));
                      }
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  Invest Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Claims Status */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Claims Progress</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Surplus Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {claim.property_address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {claim.county}, {claim.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(claim.surplus_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                        {claim.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Package #{claim.package_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

