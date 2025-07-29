import React from 'react';

const MainDashboard = ({ user, onLogout }) => {
  const portfolioData = {
    totalInvested: 125000,
    currentValue: 138750,
    totalReturns: 13750,
    returnRate: 11,
    walletBalance: 5250
  };

  const investments = [
    {
      id: 1,
      name: 'Miami Foreclosure Package A',
      amount: 50000,
      currentValue: 55750,
      returns: 5750,
      returnRate: 11.5,
      status: 'Active ROI',
      stage: 'Payout',
      maturity: '12/15/2025'
    },
    {
      id: 2,
      name: 'Tampa Commercial Claims',
      amount: 75000,
      currentValue: 83000,
      returns: 8000,
      returnRate: 10.7,
      status: 'Active ROI',
      stage: 'Court',
      maturity: '3/20/2026'
    }
  ];

  const availableOpportunities = [
    {
      id: 1,
      name: 'Orlando Surplus Claims Bundle',
      description: 'High-yield surplus claims from Orlando foreclosure auctions',
      risk: 'Medium',
      expectedReturn: 12.5,
      duration: '18-24 months',
      minInvestment: 50000,
      maxInvestment: 250000,
      fundingProgress: 65,
      raised: 650000,
      target: 1000000
    },
    {
      id: 2,
      name: 'Jacksonville Property Claims',
      description: 'Premium surplus claims from Jacksonville metro area',
      risk: 'Medium-High',
      expectedReturn: 14.2,
      duration: '12-18 months',
      minInvestment: 100000,
      maxInvestment: 500000,
      fundingProgress: 42,
      raised: 840000,
      target: 2000000
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a202c'
  };

  const userButtonStyle = {
    backgroundColor: '#48bb78',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem'
  };

  const mainContentStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const welcomeStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    color: '#4a5568',
    marginBottom: '2rem'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const statCardStyle = {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  };

  const statTitleStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '0.5rem'
  };

  const statValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a202c'
  };

  const sectionStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    marginBottom: '2rem'
  };

  const sectionHeaderStyle = {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a202c'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    padding: '0.75rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
    borderBottom: '1px solid #e2e8f0'
  };

  const tdStyle = {
    padding: '0.75rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    color: '#1a202c'
  };

  const opportunityCardStyle = {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0'
  };

  const opportunityTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '0.5rem'
  };

  const opportunityDescStyle = {
    color: '#4a5568',
    marginBottom: '1rem'
  };

  const opportunityDetailsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  };

  const detailItemStyle = {
    fontSize: '0.875rem'
  };

  const detailLabelStyle = {
    color: '#4a5568',
    fontWeight: '600'
  };

  const detailValueStyle = {
    color: '#1a202c',
    fontWeight: '500'
  };

  const progressBarStyle = {
    width: '100%',
    height: '0.5rem',
    backgroundColor: '#e2e8f0',
    borderRadius: '0.25rem',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  };

  const progressFillStyle = {
    height: '100%',
    backgroundColor: '#48bb78'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
  };

  const primaryButtonStyle = {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  const secondaryButtonStyle = {
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={logoStyle}>SurplusClaims</div>
        <button style={userButtonStyle} onClick={onLogout}>
          {user.name.split(' ').map(n => n[0]).join('')}
          {user.name}
        </button>
      </header>

      <main style={mainContentStyle}>
        <h1 style={welcomeStyle}>Welcome back, {user.name.split(' ')[0]}!</h1>
        <p style={subtitleStyle}>Here's an overview of your investment portfolio and available opportunities.</p>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={statTitleStyle}>Total Invested</div>
            <div style={statValueStyle}>${portfolioData.totalInvested.toLocaleString()}</div>
          </div>
          <div style={statCardStyle}>
            <div style={statTitleStyle}>Current Value</div>
            <div style={statValueStyle}>${portfolioData.currentValue.toLocaleString()}</div>
          </div>
          <div style={statCardStyle}>
            <div style={statTitleStyle}>Total Returns</div>
            <div style={statValueStyle}>+${portfolioData.totalReturns.toLocaleString()}</div>
          </div>
          <div style={statCardStyle}>
            <div style={statTitleStyle}>Return Rate</div>
            <div style={statValueStyle}>{portfolioData.returnRate}%</div>
          </div>
          <div style={statCardStyle}>
            <div style={statTitleStyle}>Wallet Balance</div>
            <div style={statValueStyle}>${portfolioData.walletBalance.toLocaleString()}</div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>My Investments</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Investment</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Current Value</th>
                <th style={thStyle}>Returns</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Stage</th>
                <th style={thStyle}>Maturity</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(investment => (
                <tr key={investment.id}>
                  <td style={tdStyle}>{investment.name}</td>
                  <td style={tdStyle}>${investment.amount.toLocaleString()}</td>
                  <td style={tdStyle}>${investment.currentValue.toLocaleString()}</td>
                  <td style={tdStyle}>+${investment.returns.toLocaleString()} ({investment.returnRate}%)</td>
                  <td style={tdStyle}>{investment.status}</td>
                  <td style={tdStyle}>{investment.stage}</td>
                  <td style={tdStyle}>{investment.maturity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Available Investment Opportunities</div>
          {availableOpportunities.map((opportunity, index) => (
            <div key={opportunity.id} style={{...opportunityCardStyle, borderBottom: index === availableOpportunities.length - 1 ? 'none' : '1px solid #e2e8f0'}}>
              <h3 style={opportunityTitleStyle}>{opportunity.name}</h3>
              <p style={opportunityDescStyle}>{opportunity.description}</p>
              
              <div style={opportunityDetailsStyle}>
                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>Risk Level</div>
                  <div style={detailValueStyle}>{opportunity.risk}</div>
                </div>
                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>Expected Return</div>
                  <div style={detailValueStyle}>{opportunity.expectedReturn}%</div>
                </div>
                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>Duration</div>
                  <div style={detailValueStyle}>{opportunity.duration}</div>
                </div>
                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>Min Investment</div>
                  <div style={detailValueStyle}>${opportunity.minInvestment.toLocaleString()}</div>
                </div>
                <div style={detailItemStyle}>
                  <div style={detailLabelStyle}>Max Investment</div>
                  <div style={detailValueStyle}>${opportunity.maxInvestment.toLocaleString()}</div>
                </div>
              </div>

              <div>
                <div style={detailLabelStyle}>Funding Progress: {opportunity.fundingProgress}%</div>
                <div style={progressBarStyle}>
                  <div style={{...progressFillStyle, width: `${opportunity.fundingProgress}%`}}></div>
                </div>
                <div style={{fontSize: '0.875rem', color: '#4a5568'}}>
                  ${opportunity.raised.toLocaleString()} of ${opportunity.target.toLocaleString()} raised
                </div>
              </div>

              <div style={buttonGroupStyle}>
                <button style={secondaryButtonStyle}>View Details</button>
                <button style={primaryButtonStyle}>Invest Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;

