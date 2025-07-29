import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Inline styles for reliable rendering
const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa'
  },
  sidebar: {
    width: '250px',
    backgroundColor: 'white',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e1e5e9',
    boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
  },
  sidebarHeader: {
    padding: '1.5rem 1rem',
    borderBottom: '1px solid #e1e5e9',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  sidebarNav: {
    flex: 1,
    padding: '1rem 0'
  },
  navItem: {
    display: 'block',
    padding: '0.75rem 1rem',
    color: '#666',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderLeft: '3px solid transparent'
  },
  navItemActive: {
    backgroundColor: '#f8f9fa',
    color: '#035B44',
    borderLeft: '3px solid #035B44'
  },
  navItemHover: {
    backgroundColor: '#f8f9fa',
    color: '#035B44'
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e1e5e9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userAvatar: {
    backgroundColor: '#035B44',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  content: {
    flex: 1,
    padding: '2rem',
    overflow: 'auto',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    backgroundColor: '#f8f9fa',
    color: '#333',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  mainContent: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  welcomeSection: {
    marginBottom: '2rem'
  },
  welcomeTitle: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  welcomeSubtitle: {
    color: '#7f8c8d',
    fontSize: '1.1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statLabel: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  statValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  positiveValue: {
    color: '#27ae60'
  },
  section: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1rem'
  },
  tableHeader: {
    backgroundColor: '#ecf0f1',
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '1px solid #bdc3c7',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  tableCell: {
    padding: '0.75rem',
    borderBottom: '1px solid #ecf0f1'
  },
  investmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  investmentCard: {
    backgroundColor: 'white',
    border: '1px solid #ecf0f1',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem'
  },
  investmentTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  investmentDescription: {
    color: '#7f8c8d',
    marginBottom: '1rem'
  },
  investmentDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  },
  detailItem: {
    textAlign: 'center'
  },
  detailLabel: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
    marginBottom: '0.25rem'
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  progressBar: {
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    height: '8px',
    marginBottom: '0.5rem',
    overflow: 'hidden'
  },
  progressFill: {
    backgroundColor: '#035B44',
    height: '100%',
    borderRadius: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem'
  },
  primaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  secondaryButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  authCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  authTitle: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
    textAlign: 'center'
  },
  authSubtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '0.5rem'
  },
  linkButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center'
  }
};

// Sign In Component
function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = () => {
    window.location.href = '/test-dashboard';
  };

  const handleCreateAccount = () => {
    window.location.href = '/signup';
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Welcome To After Foreclosure Assets</h1>
        <p style={styles.authSubtitle}>The top gainer in your portfolio</p>
        
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        
        <button style={styles.button}>Sign In</button>
        <button style={{...styles.button, backgroundColor: '#27ae60'}} onClick={handleDemoLogin}>
          Demo Login (Skip to Dashboard)
        </button>
        <button style={styles.linkButton} onClick={handleCreateAccount}>
          Create New Account
        </button>
      </div>
    </div>
  );
}

// Create Account Component
function CreateAccount() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnerCode, setPartnerCode] = useState('');

  const handleNext = () => {
    window.location.href = '/email-verification';
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>New Account</h1>
        <h2 style={{...styles.sectionTitle, textAlign: 'center'}}>Create Account</h2>
        
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Partner Code"
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value)}
            style={styles.input}
          />
        </div>
        
        <button style={styles.button}>Send Verification Email</button>
        <button style={{...styles.button, backgroundColor: '#27ae60'}} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

// Dashboard Component
function MainDashboard({ user, onLogout }) {
  const handleInvestNow = (investmentId) => {
    window.location.href = `/investment-details/${investmentId}`;
  };

  const handleViewDetails = (investmentId) => {
    window.location.href = `/investment-details/${investmentId}`;
  };

  return (
    <div style={styles.content}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Welcome back, {user?.name || 'Test'}!</h1>
        <p style={styles.welcomeSubtitle}>Here's an overview of your investment portfolio and available opportunities.</p>
      </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Invested</div>
            <div style={styles.statValue}>$125,000</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Current Value</div>
            <div style={styles.statValue}>$138,750</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Returns</div>
            <div style={{...styles.statValue, ...styles.positiveValue}}>+$13,750</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Return Rate</div>
            <div style={{...styles.statValue, ...styles.positiveValue}}>11%</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Wallet Balance</div>
            <div style={styles.statValue}>$5,250</div>
          </div>
        </div>
        
        {/* Returns Chart Section */}
        <div style={styles.section}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '2rem',
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '12px',
            color: 'white'
          }}>
            {/* Returns Breakdown Table */}
            <div>
              <h3 style={{color: '#333', marginBottom: '1.5rem', fontSize: '1.2rem'}}>Returns</h3>
              
              <div style={{marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span style={{fontSize: '0.9rem', color: '#666'}}>2024 YTD</span>
                  <span style={{fontSize: '0.9rem', color: '#666'}}>All time</span>
                </div>
              </div>
              
              <div style={{borderBottom: '1px solid #e1e5e9', paddingBottom: '0.5rem', marginBottom: '0.5rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '0.9rem', color: '#333'}}>Dividends</span>
                  <div style={{display: 'flex', gap: '2rem'}}>
                    <span style={{fontSize: '0.9rem', color: '#333'}}>$2,184</span>
                    <span style={{fontSize: '0.9rem', color: '#333'}}>$8,750</span>
                  </div>
                </div>
              </div>
              
              <div style={{borderBottom: '1px solid #e1e5e9', paddingBottom: '0.5rem', marginBottom: '0.5rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '0.9rem', color: '#333'}}>Appreciation</span>
                  <div style={{display: 'flex', gap: '2rem'}}>
                    <span style={{fontSize: '0.9rem', color: '#333'}}>$3,250</span>
                    <span style={{fontSize: '0.9rem', color: '#333'}}>$5,000</span>
                  </div>
                </div>
              </div>
              
              <div style={{borderBottom: '1px solid #e1e5e9', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '0.9rem', color: '#333'}}>Advisory fees</span>
                  <div style={{display: 'flex', gap: '2rem'}}>
                    <span style={{fontSize: '0.9rem', color: '#e74c3c'}}>-$125</span>
                    <span style={{fontSize: '0.9rem', color: '#e74c3c'}}>-$500</span>
                  </div>
                </div>
              </div>
              
              <div style={{borderTop: '2px solid #e1e5e9', paddingTop: '0.5rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#333'}}>Total</span>
                  <div style={{display: 'flex', gap: '2rem'}}>
                    <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#333'}}>$5,309</span>
                    <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#333'}}>$13,250</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Historical Account Value Chart */}
            <div>
              <h3 style={{color: '#333', marginBottom: '1.5rem', fontSize: '1.2rem'}}>Historical Account Value</h3>
              
              <div style={{position: 'relative', height: '200px', backgroundColor: '#34495e', borderRadius: '8px', padding: '1rem'}}>
                {/* Y-axis labels */}
                <div style={{position: 'absolute', left: '0', top: '10px', fontSize: '0.8rem', color: '#bdc3c7'}}>$8,000</div>
                <div style={{position: 'absolute', left: '0', top: '60px', fontSize: '0.8rem', color: '#bdc3c7'}}>$6,000</div>
                <div style={{position: 'absolute', left: '0', top: '110px', fontSize: '0.8rem', color: '#bdc3c7'}}>$4,000</div>
                <div style={{position: 'absolute', left: '0', top: '160px', fontSize: '0.8rem', color: '#bdc3c7'}}>$2,000</div>
                <div style={{position: 'absolute', left: '0', bottom: '10px', fontSize: '0.8rem', color: '#bdc3c7'}}>$0</div>
                
                {/* Chart line */}
                <svg style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
                  <polyline
                    points="50,180 100,175 150,170 200,160 250,140 300,120 350,100 400,80 450,60 500,40"
                    fill="none"
                    stroke="#3498db"
                    strokeWidth="2"
                  />
                  <circle cx="500" cy="40" r="4" fill="#3498db" />
                </svg>
                
                {/* X-axis labels */}
                <div style={{position: 'absolute', bottom: '-25px', left: '50px', fontSize: '0.8rem', color: '#bdc3c7'}}>Jul '23</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '150px', fontSize: '0.8rem', color: '#bdc3c7'}}>Oct '23</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '250px', fontSize: '0.8rem', color: '#bdc3c7'}}>Jan '24</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '350px', fontSize: '0.8rem', color: '#bdc3c7'}}>Apr '24</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '450px', fontSize: '0.8rem', color: '#bdc3c7'}}>Jul '24</div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>My Investments</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Investment</th>
                <th style={styles.tableHeader}>Amount</th>
                <th style={styles.tableHeader}>Current Value</th>
                <th style={styles.tableHeader}>Returns</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Stage</th>
                <th style={styles.tableHeader}>Maturity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.tableCell}>Miami Foreclosure Package A</td>
                <td style={styles.tableCell}>$50,000</td>
                <td style={styles.tableCell}>$55,750</td>
                <td style={styles.tableCell}>+$5,750 (11.5%)</td>
                <td style={styles.tableCell}>Active ROI</td>
                <td style={styles.tableCell}>Payout</td>
                <td style={styles.tableCell}>12/15/2025</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>Tampa Commercial Claims</td>
                <td style={styles.tableCell}>$75,000</td>
                <td style={styles.tableCell}>$83,000</td>
                <td style={styles.tableCell}>+$8,000 (10.7%)</td>
                <td style={styles.tableCell}>Active ROI</td>
                <td style={styles.tableCell}>Court</td>
                <td style={styles.tableCell}>3/20/2026</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Available Investment Opportunities</h2>
          
          <div style={styles.investmentCard}>
            <h3 style={styles.investmentTitle}>Orlando Surplus Claims Bundle</h3>
            <p style={styles.investmentDescription}>High-yield surplus claims from Orlando foreclosure auctions</p>
            
            <div style={styles.investmentDetails}>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Risk Level</div>
                <div style={styles.detailValue}>Medium</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Expected Return</div>
                <div style={styles.detailValue}>12.5%</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Duration</div>
                <div style={styles.detailValue}>18-24 months</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Min Investment</div>
                <div style={styles.detailValue}>$50,000</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Max Investment</div>
                <div style={styles.detailValue}>$250,000</div>
              </div>
            </div>
            
            <div>
              <div style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Funding Progress: 65%</div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: '65%'}}></div>
              </div>
              <div style={{fontSize: '0.9rem', color: '#7f8c8d'}}>$650,000 of $1,000,000 raised</div>
            </div>
            
            <div style={{...styles.buttonGroup, marginTop: '1rem'}}>
              <button style={styles.secondaryButton} onClick={() => handleViewDetails(1)}>
                View Details
              </button>
              <button style={styles.primaryButton} onClick={() => handleInvestNow(1)}>
                Invest Now
              </button>
            </div>
          </div>
          
          <div style={styles.investmentCard}>
            <h3 style={styles.investmentTitle}>Jacksonville Property Claims</h3>
            <p style={styles.investmentDescription}>Premium surplus claims from Jacksonville metro area</p>
            
            <div style={styles.investmentDetails}>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Risk Level</div>
                <div style={styles.detailValue}>Medium-High</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Expected Return</div>
                <div style={styles.detailValue}>14.2%</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Duration</div>
                <div style={styles.detailValue}>12-18 months</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Min Investment</div>
                <div style={styles.detailValue}>$100,000</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Max Investment</div>
                <div style={styles.detailValue}>$500,000</div>
              </div>
            </div>
            
            <div>
              <div style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Funding Progress: 42%</div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: '42%'}}></div>
              </div>
              <div style={{fontSize: '0.9rem', color: '#7f8c8d'}}>$840,000 of $2,000,000 raised</div>
            </div>
            
            <div style={{...styles.buttonGroup, marginTop: '1rem'}}>
              <button style={styles.secondaryButton} onClick={() => handleViewDetails(2)}>
                View Details
              </button>
              <button style={styles.primaryButton} onClick={() => handleInvestNow(2)}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

// Investment Details Component
function InvestmentDetails() {
  const handleInvestNow = () => {
    window.location.href = '/invest/1';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>SurplusClaims</div>
        <button style={styles.userAvatar}>TU</button>
      </header>
      
      <main style={styles.mainContent}>
        <div style={styles.section}>
          <h1 style={styles.welcomeTitle}>Orlando Surplus Claims Bundle</h1>
          <p style={styles.welcomeSubtitle}>High-yield surplus claims from Orlando foreclosure auctions</p>
          
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Expected Return</div>
              <div style={styles.statValue}>12.5%</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Duration</div>
              <div style={styles.statValue}>18-24 months</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Min Investment</div>
              <div style={styles.statValue}>$50,000</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Max Investment</div>
              <div style={styles.statValue}>$250,000</div>
            </div>
          </div>
          
          <div style={{marginBottom: '2rem'}}>
            <div style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>Funding Progress: 65%</div>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: '65%'}}></div>
            </div>
            <div style={{fontSize: '0.9rem', color: '#7f8c8d'}}>$650,000 of $1,000,000 raised</div>
          </div>
          
          <button style={{...styles.button, width: 'auto', padding: '1rem 2rem'}} onClick={handleInvestNow}>
            Invest Now
          </button>
        </div>

        {/* Investment Summary Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Investment Summary</h2>
          <p style={styles.welcomeSubtitle}>Download the complete investment summary document with detailed analysis, risk factors, and projected returns.</p>
          <button 
            style={{...styles.primaryButton, padding: '0.75rem 1.5rem', marginTop: '1rem'}} 
            onClick={() => alert('Investment Summary PDF download would start here')}
          >
            📄 Download Investment Summary (PDF)
          </button>
        </div>

        {/* Video Breakdown Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Video Breakdown</h2>
          <p style={styles.welcomeSubtitle}>Watch our detailed video explanation of this investment opportunity.</p>
          <div style={{
            marginTop: '1rem',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #bdc3c7'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎥</div>
            <p style={{color: '#7f8c8d', marginBottom: '1rem'}}>Vimeo Video Embed</p>
            <p style={{fontSize: '0.9rem', color: '#95a5a6'}}>
              Vimeo embed code will be placed here<br/>
              Example: &lt;iframe src="https://player.vimeo.com/video/XXXXXXX"&gt;&lt;/iframe&gt;
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Investor Testimonials</h2>
          <p style={styles.welcomeSubtitle}>Hear from our satisfied investors about their experience with surplus claims investments.</p>
          <div style={{
            marginTop: '1rem',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px dashed #bdc3c7'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💬</div>
            <p style={{color: '#7f8c8d', marginBottom: '1rem'}}>Testimonials Video Embed</p>
            <p style={{fontSize: '0.9rem', color: '#95a5a6'}}>
              Vimeo embed code will be placed here<br/>
              Example: &lt;iframe src="https://player.vimeo.com/video/XXXXXXX"&gt;&lt;/iframe&gt;
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Investment Flow Component
function InvestmentFlow() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [accountType, setAccountType] = useState('individual');
  const [selectedTier, setSelectedTier] = useState(null);

  const investmentTiers = [
    { amount: 50000, tier: 'First Tier', term: '18 months', roi: '12.5%', endingValue: 56250 },
    { amount: 75000, tier: 'Second Tier', term: '18 months', roi: '12.8%', endingValue: 84600 },
    { amount: 100000, tier: 'Third Tier', term: '18 months', roi: '13.0%', endingValue: 113000 },
    { amount: 150000, tier: 'Fourth Tier', term: '18 months', roi: '13.2%', endingValue: 169800 },
    { amount: 175000, tier: 'Fifth Tier', term: '18 months', roi: '13.5%', endingValue: 198625 },
    { amount: 200000, tier: 'Sixth Tier', term: '18 months', roi: '13.8%', endingValue: 227600 },
    { amount: 225000, tier: 'Seventh Tier', term: '18 months', roi: '14.0%', endingValue: 256500 },
    { amount: 250000, tier: 'Eighth Tier', term: '18 months', roi: '14.2%', endingValue: 285500 }
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      window.location.href = '/investment-success';
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>SurplusClaims</div>
        <button style={styles.userAvatar}>TU</button>
      </header>
      
      <main style={styles.mainContent}>
        <div style={styles.section}>
          <h1 style={styles.welcomeTitle}>Investment Process - Step {step} of 6</h1>
          
          {step === 1 && (
            <div>
              <h2 style={styles.sectionTitle}>Asset Selection</h2>
              <p style={styles.welcomeSubtitle}>Your Guaranteed Growth</p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                {investmentTiers.map((tier, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.statCard,
                      cursor: 'pointer',
                      border: selectedTier === index ? '3px solid #3498db' : '1px solid #bdc3c7',
                      backgroundColor: selectedTier === index ? '#ecf0f1' : 'white'
                    }}
                    onClick={() => {
                      setSelectedTier(index);
                      setAmount(tier.amount.toString());
                    }}
                  >
                    <div style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                      ${tier.amount.toLocaleString()}.00
                    </div>
                    <div style={{fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                      {tier.tier}
                    </div>
                    <div style={{fontSize: '0.8rem', color: '#7f8c8d'}}>
                      • Initial amount<br/>
                      • Term: {tier.term}<br/>
                      • ROI: {tier.roi}<br/>
                      • Ending Value: ${tier.endingValue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 style={styles.sectionTitle}>Account Type Selection</h2>
              <div style={styles.formGroup}>
                <label>Account Type</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={styles.input}
                >
                  <option value="individual">Individual/Personal</option>
                  <option value="business">Business/Entity</option>
                  <option value="custodian">Custodian (IRA/401k)</option>
                </select>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div>
              {accountType === 'individual' && (
                <div>
                  <h2 style={styles.sectionTitle}>Personal Account Information</h2>
                  <div style={styles.formGroup}>
                    <label>Full Legal Name</label>
                    <input type="text" placeholder="Enter your full legal name" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Date of Birth</label>
                    <input type="date" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Social Security Number</label>
                    <input type="text" placeholder="XXX-XX-XXXX" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Employment Status</label>
                    <select style={styles.input}>
                      <option>Employed</option>
                      <option>Self-Employed</option>
                      <option>Retired</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label>Annual Income</label>
                    <select style={styles.input}>
                      <option>$100,000 - $250,000</option>
                      <option>$250,000 - $500,000</option>
                      <option>$500,000 - $1,000,000</option>
                      <option>$1,000,000+</option>
                    </select>
                  </div>
                </div>
              )}
              
              {accountType === 'business' && (
                <div>
                  <h2 style={styles.sectionTitle}>Business Account Information</h2>
                  <div style={styles.formGroup}>
                    <label>Business Legal Name</label>
                    <input type="text" placeholder="Enter business legal name" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Business Type</label>
                    <select style={styles.input}>
                      <option>LLC</option>
                      <option>Corporation</option>
                      <option>Partnership</option>
                      <option>Sole Proprietorship</option>
                      <option>Trust</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label>Federal Tax ID (EIN)</label>
                    <input type="text" placeholder="XX-XXXXXXX" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>State of Incorporation</label>
                    <input type="text" placeholder="Enter state" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Authorized Signatory Name</label>
                    <input type="text" placeholder="Name of person authorized to sign" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Signatory Title</label>
                    <input type="text" placeholder="e.g., CEO, Managing Member" style={styles.input} />
                  </div>
                </div>
              )}
              
              {accountType === 'custodian' && (
                <div>
                  <h2 style={styles.sectionTitle}>Custodian Account Information</h2>
                  <div style={styles.formGroup}>
                    <label>Account Holder Name</label>
                    <input type="text" placeholder="Enter account holder name" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Custodian Type</label>
                    <select style={styles.input}>
                      <option>Traditional IRA</option>
                      <option>Roth IRA</option>
                      <option>SEP IRA</option>
                      <option>401(k)</option>
                      <option>403(b)</option>
                      <option>Other Qualified Plan</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label>Custodian Company Name</label>
                    <input type="text" placeholder="e.g., Fidelity, Charles Schwab" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Account Number</label>
                    <input type="text" placeholder="Enter custodian account number" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Custodian Contact Information</label>
                    <input type="text" placeholder="Phone number or email" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Account Holder SSN</label>
                    <input type="text" placeholder="XXX-XX-XXXX" style={styles.input} />
                  </div>
                </div>
              )}
            </div>
          )}
          
          {step === 4 && (
            <div>
              <h2 style={styles.sectionTitle}>Funding Information</h2>
              <div style={styles.formGroup}>
                <label>Funding Method</label>
                <select style={styles.input}>
                  <option>Bank Transfer (ACH)</option>
                  <option>Wire Transfer</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label>Bank Name</label>
                <input type="text" placeholder="Enter bank name" style={styles.input} />
              </div>
              
              <div style={styles.formGroup}>
                <label>Account Number</label>
                <input type="text" placeholder="Enter account number" style={styles.input} />
              </div>
            </div>
          )}
          
          {step === 5 && (
            <div>
              <h2 style={styles.sectionTitle}>Review & Confirm</h2>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Investment Amount</div>
                <div style={styles.statValue}>${amount || '50,000'}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Account Type</div>
                <div style={styles.statValue}>
                  {accountType === 'individual' ? 'Individual/Personal' : 
                   accountType === 'business' ? 'Business/Entity' : 
                   'Custodian (IRA/401k)'}
                </div>
              </div>
              
              <div style={{margin: '1rem 0'}}>
                <label>
                  <input type="checkbox" style={{marginRight: '0.5rem'}} />
                  I agree to the Platform Service Agreement (PSA)
                </label>
              </div>
            </div>
          )}
          
          {step === 6 && (
            <div>
              <h2 style={styles.sectionTitle}>Final Confirmation</h2>
              <p style={styles.welcomeSubtitle}>Please review all information and click "Confirm Investment" to complete your investment.</p>
              <div style={{...styles.statCard, marginTop: '1rem'}}>
                <div style={styles.statLabel}>Ready to Submit</div>
                <div style={styles.statValue}>✓ All information collected</div>
              </div>
            </div>
          )}
          
          <div style={{...styles.buttonGroup, marginTop: '2rem'}}>
            {step > 1 && (
              <button style={styles.secondaryButton} onClick={handleBack}>
                Back
              </button>
            )}
            <button style={styles.primaryButton} onClick={handleNext}>
              {step === 6 ? 'Confirm Investment' : 'Next'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Investment Success Component
function InvestmentSuccess() {
  const handleContinue = () => {
    window.location.href = '/test-dashboard';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>SurplusClaims</div>
        <button style={styles.userAvatar}>TU</button>
      </header>
      
      <main style={styles.mainContent}>
        <div style={styles.section}>
          <h1 style={{...styles.welcomeTitle, textAlign: 'center', color: '#27ae60'}}>
            Investment Successful!
          </h1>
          <p style={{...styles.welcomeSubtitle, textAlign: 'center'}}>
            Your investment has been submitted and is pending approval.
          </p>
          
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <button style={{...styles.button, width: 'auto', padding: '1rem 2rem'}} onClick={handleContinue}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Other placeholder components
function EmailVerification() {
  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Check Your Email</h1>
        <p style={styles.authSubtitle}>We've sent a verification link to your email address.</p>
        <button style={styles.button} onClick={() => window.location.href = '/personal-info'}>
          Continue
        </button>
      </div>
    </div>
  );
}

function PersonalInfo() {
  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Personal Information</h1>
        <div style={styles.formGroup}>
          <input type="text" placeholder="First Name" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <input type="text" placeholder="Last Name" style={styles.input} />
        </div>
        <button style={styles.button} onClick={() => window.location.href = '/address-info'}>
          Next
        </button>
      </div>
    </div>
  );
}

function AddressInfo() {
  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Address Information</h1>
        <div style={styles.formGroup}>
          <input type="text" placeholder="Street Address" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <input type="text" placeholder="City" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <input type="text" placeholder="State" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <input type="text" placeholder="Zip Code" style={styles.input} />
        </div>
        <button style={styles.button} onClick={() => window.location.href = '/password-setup'}>
          Next
        </button>
      </div>
    </div>
  );
}

function PasswordSetup() {
  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Password Setup</h1>
        <div style={styles.formGroup}>
          <input type="password" placeholder="Password" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <input type="password" placeholder="Confirm Password" style={styles.input} />
        </div>
        <button style={styles.button} onClick={() => window.location.href = '/accredited-investor'}>
          Next
        </button>
      </div>
    </div>
  );
}

function AccreditedInvestor() {
  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Accredited Investor Certification</h1>
        <div style={{margin: '1rem 0'}}>
          <label>
            <input type="checkbox" style={{marginRight: '0.5rem'}} />
            I certify that I am an accredited investor
          </label>
        </div>
        <button style={styles.button} onClick={() => window.location.href = '/account-type-selection'}>
          Next
        </button>
      </div>
    </div>
  );
}

function OnlineAccess() {
  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h1 style={styles.authTitle}>Platform Agreement</h1>
        <div style={{maxHeight: '200px', overflowY: 'scroll', border: '1px solid #bdc3c7', padding: '1rem', marginBottom: '1rem'}}>
          <h3>Review and Sign the NDA</h3>
          <p>This Non-Disclosure Agreement contains the terms and conditions...</p>
          
          <h3>Accept the Platform Agreement</h3>
          <p>By using this platform, you agree to the following terms and conditions...</p>
        </div>
        
        <div style={{margin: '1rem 0'}}>
          <label>
            <input type="checkbox" style={{marginRight: '0.5rem'}} />
            I have read and agree to the NDA
          </label>
        </div>
        
        <div style={{margin: '1rem 0'}}>
          <label>
            <input type="checkbox" style={{marginRight: '0.5rem'}} />
            I have read and agree to the Platform Agreement
          </label>
        </div>
        
        <button style={styles.button} onClick={() => window.location.href = '/test-dashboard'}>
          Accept & Complete Registration
        </button>
      </div>
    </div>
  );
}

// Sidebar Navigation Component
function SidebarNavigation({ activeSection, onSectionChange, user, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'available-returns', label: 'Available Returns' },
    { id: 'current-investments', label: 'Current Investments' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'support', label: 'Support' }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        SurplusClaims
      </div>
      
      <nav style={styles.sidebarNav}>
        {navItems.map(item => (
          <div
            key={item.id}
            style={{
              ...styles.navItem,
              ...(activeSection === item.id ? styles.navItemActive : {})
            }}
            onClick={() => onSectionChange(item.id)}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.target.style.backgroundColor = '#2d2d2d';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ccc';
              }
            }}
          >
            {item.label}
          </div>
        ))}
        
        <div style={{marginTop: 'auto', padding: '1rem'}}>
          <div
            style={styles.navItem}
            onClick={onLogout}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2d2d2d';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ccc';
            }}
          >
            Log Out
          </div>
        </div>
      </nav>
    </div>
  );
}

// Current Investments Component
// Current Investments Component
function CurrentInvestments() {
  const investments = [
    {
      id: 1,
      name: 'Northeast Tranche A—July 2025',
      amount: 50000,
      stage: 'Filed',
      stageIndex: 1,
      timeline: '1-3 months',
      claims: [
        { amount: 50000, status: 'Filed', location: 'FL' },
        { amount: 117000, status: 'Filed', location: 'TX' },
        { amount: 186000, status: 'Filed', location: 'CA' }
      ]
    },
    {
      id: 2,
      name: 'Miami Foreclosure Package A',
      amount: 75000,
      stage: 'Awaiting Court Approval',
      stageIndex: 2,
      timeline: '2-4 months',
      claims: [
        { amount: 75000, status: 'Filed', location: 'FL' },
        { amount: 125000, status: 'Awaiting Court', location: 'FL' }
      ]
    }
  ];
  
  const stages = ['Transferred Ownership', 'Awaiting Disbursement', 'Attorney Received Check', 'Attorney Disbursed Funds', 'Returns Paid Out'];
  
  return (
    <div style={styles.content}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Current Investments</h1>
        <p style={styles.welcomeSubtitle}>Track the progress of your active investments and claim stages.</p>
      </div>
      
      <div style={styles.section}>
        {investments.map((investment) => (
          <div key={investment.id} style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem'}}>
              <div>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#2c3e50', marginBottom: '0.5rem'}}>
                  {investment.name}
                </h2>
                <p style={{color: '#7f8c8d', fontSize: '1rem'}}>
                  Your investment of ${investment.amount.toLocaleString()}
                </p>
              </div>
              <button style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}>
                Download Claim Verification
              </button>
            </div>
            
            {/* 1. Claim Stages */}
            <div style={{marginBottom: '2rem'}}>
              <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1rem'}}>
                Claim Stage
              </h3>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                {stages.map((stage, index) => (
                  <div key={stage} style={{display: 'flex', alignItems: 'center', flex: 1}}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: index <= investment.stageIndex ? '#27ae60' : '#bdc3c7',
                      marginRight: '0.5rem'
                    }} />
                    {index < stages.length - 1 && (
                      <div style={{
                        flex: 1,
                        height: '2px',
                        backgroundColor: index < investment.stageIndex ? '#27ae60' : '#bdc3c7',
                        marginRight: '0.5rem'
                      }} />
                    )}
                  </div>
                ))}
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#7f8c8d'}}>
                {stages.map((stage, index) => (
                  <div key={stage} style={{flex: 1, textAlign: index === 0 ? 'left' : index === stages.length - 1 ? 'right' : 'center'}}>
                    {stage}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 2. Expected Timeline */}
            <div style={{marginBottom: '2rem'}}>
              <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '0.5rem'}}>
                Expected Timeline
              </h3>
              <p style={{fontSize: '1rem', color: '#7f8c8d'}}>
                {investment.timeline}
              </p>
            </div>
            
            {/* 3. What's Inside */}
            <div>
              <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1rem'}}>
                What's Inside
              </h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                {investment.claims.map((claim, index) => (
                  <div key={index} style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50', marginBottom: '0.5rem'}}>
                      ${claim.amount.toLocaleString()}
                    </div>
                    <div style={{fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '0.25rem'}}>
                      {claim.status}
                    </div>
                    <div style={{fontSize: '0.9rem', color: '#7f8c8d'}}>
                      {claim.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Wallet Component
// Wallet Component
function WalletSection() {
  const [activeModal, setActiveModal] = useState(null);
  const [autoReinvest, setAutoReinvest] = useState(false);
  const [formData, setFormData] = useState({});

  const transactions = [
    { date: '2024-07-15', type: 'Investment Return', amount: '+$2,500', status: 'Completed' },
    { date: '2024-07-01', type: 'Payout', amount: '+$1,250', status: 'Completed' },
    { date: '2024-06-15', type: 'Reinvestment', amount: '-$3,000', status: 'Completed' },
    { date: '2024-06-01', type: 'Investment Return', amount: '+$1,800', status: 'Completed' }
  ];

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
    setFormData({});
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setFormData({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process form submission based on activeModal type
    alert(`${activeModal} request submitted successfully!`);
    handleModalClose();
  };

  const renderModal = () => {
    if (!activeModal) return null;

    const modalContent = {
      'change-password': {
        title: 'Change Password',
        fields: [
          { name: 'currentPassword', type: 'password', label: 'Current Password', required: true },
          { name: 'newPassword', type: 'password', label: 'New Password', required: true },
          { name: 'confirmPassword', type: 'password', label: 'Confirm New Password', required: true }
        ]
      },
      'change-email': {
        title: 'Change Email Address',
        fields: [
          { name: 'currentEmail', type: 'email', label: 'Current Email', value: 'test@example.com', disabled: true },
          { name: 'newEmail', type: 'email', label: 'New Email Address', required: true },
          { name: 'password', type: 'password', label: 'Confirm Password', required: true }
        ]
      },
      'change-phone': {
        title: 'Change Phone Number',
        fields: [
          { name: 'currentPhone', type: 'tel', label: 'Current Phone', value: '(555) 123-4567', disabled: true },
          { name: 'newPhone', type: 'tel', label: 'New Phone Number', required: true },
          { name: 'password', type: 'password', label: 'Confirm Password', required: true }
        ]
      },
      'bank-account': {
        title: 'Bank Account Information',
        fields: [
          { name: 'accountType', type: 'select', label: 'Account Type', options: ['Checking', 'Savings'], required: true },
          { name: 'bankName', type: 'text', label: 'Bank Name', required: true },
          { name: 'routingNumber', type: 'text', label: 'Routing Number', required: true },
          { name: 'accountNumber', type: 'text', label: 'Account Number', required: true },
          { name: 'confirmAccountNumber', type: 'text', label: 'Confirm Account Number', required: true }
        ]
      },
      'request-payout': {
        title: 'Request Payout',
        fields: [
          { name: 'amount', type: 'number', label: 'Payout Amount', placeholder: 'Available: $5,250', required: true },
          { name: 'method', type: 'select', label: 'Payout Method', options: ['ACH Transfer', 'Wire Transfer'], required: true },
          { name: 'reason', type: 'textarea', label: 'Reason (Optional)', placeholder: 'Optional reason for payout request' }
        ]
      }
    };

    const modal = modalContent[activeModal];
    if (!modal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#2c3e50', margin: 0}}>
              {modal.title}
            </h2>
            <button 
              onClick={handleModalClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#7f8c8d'
              }}
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleFormSubmit}>
            {modal.fields.map((field) => (
              <div key={field.name} style={{marginBottom: '1rem'}}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#2c3e50'
                }}>
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    required={field.required}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={field.disabled}
                    defaultValue={field.value}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      backgroundColor: field.disabled ? '#f8f9fa' : 'white'
                    }}
                    value={formData[field.name] || field.value || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                  />
                )}
              </div>
            ))}
            
            <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
              <button
                type="button"
                onClick={handleModalClose}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#666',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.content}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>My Account</h1>
        <p style={styles.welcomeSubtitle}>Manage your wallet, investments, and account settings.</p>
      </div>
      
      <div style={styles.section}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem'}}>
          {/* 1. Wallet Balance */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1rem'}}>
              Wallet Balance
            </h3>
            <div style={{fontSize: '2.5rem', fontWeight: '700', color: '#27ae60', marginBottom: '0.5rem'}}>
              $5,250
            </div>
            <p style={{color: '#7f8c8d', fontSize: '0.9rem'}}>Available for reinvestment or withdrawal</p>
          </div>

          {/* 2 & 3. Reinvest Options */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1.5rem'}}>
              Reinvestment Options
            </h3>
            <button style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#035B44',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}>
              Reinvest Now
            </button>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <input
                type="checkbox"
                id="autoReinvest"
                checked={autoReinvest}
                onChange={(e) => setAutoReinvest(e.target.checked)}
                style={{width: '16px', height: '16px'}}
              />
              <label htmlFor="autoReinvest" style={{fontSize: '0.9rem', color: '#2c3e50'}}>
                Enable Auto Reinvest
              </label>
            </div>
          </div>
        </div>

        {/* 4. Transaction History */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1.5rem'}}>
            Transaction History
          </h3>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '2px solid #e9ecef'}}>
                  <th style={{textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontSize: '0.9rem'}}>Date</th>
                  <th style={{textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontSize: '0.9rem'}}>Type</th>
                  <th style={{textAlign: 'right', padding: '0.75rem', color: '#7f8c8d', fontSize: '0.9rem'}}>Amount</th>
                  <th style={{textAlign: 'center', padding: '0.75rem', color: '#7f8c8d', fontSize: '0.9rem'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} style={{borderBottom: '1px solid #f8f9fa'}}>
                    <td style={{padding: '0.75rem', fontSize: '0.9rem'}}>{transaction.date}</td>
                    <td style={{padding: '0.75rem', fontSize: '0.9rem'}}>{transaction.type}</td>
                    <td style={{
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      textAlign: 'right',
                      color: transaction.amount.startsWith('+') ? '#27ae60' : '#e74c3c',
                      fontWeight: '600'
                    }}>
                      {transaction.amount}
                    </td>
                    <td style={{padding: '0.75rem', fontSize: '0.9rem', textAlign: 'center'}}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5-9. Account Management */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1.5rem'}}>
            Account Management
          </h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <button
              onClick={() => handleModalOpen('change-password')}
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Change Password
            </button>
            <button
              onClick={() => handleModalOpen('change-email')}
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Change Email
            </button>
            <button
              onClick={() => handleModalOpen('change-phone')}
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Change Phone Number
            </button>
            <button
              onClick={() => handleModalOpen('bank-account')}
              style={{
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Bank Account Info
            </button>
            <button
              onClick={() => handleModalOpen('request-payout')}
              style={{
                padding: '1rem',
                backgroundColor: '#e74c3c',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'white',
                fontWeight: '600'
              }}
            >
              Request Payout
            </button>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
}

// Support Component
function SupportSection() {
  return (
    <div style={styles.content}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Support</h1>
        <p style={styles.welcomeSubtitle}>Get help with your account and investments through our support system.</p>
      </div>
      
      <div style={styles.section}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            border: '2px solid #3498db',
            padding: '2.5rem',
            borderRadius: '12px',
            backgroundColor: '#f8f9fa'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Ticketing System
            </h2>
            <p style={{
              color: '#7f8c8d',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Submit a support ticket and our team will get back to you within 24 hours. 
              We're here to help with any questions about your investments, account, or platform usage.
            </p>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>
              Create New Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// Main Layout Component with Sideba}

// Available Returns Component
function AvailableReturns() {
  const handleViewDetails = (investmentId) => {
    window.location.href = `/investment-details/${investmentId}`;
  };

  const handleInvestNow = (investmentId) => {
    window.location.href = `/investment-details/${investmentId}`;
  };

  return (
    <div style={styles.content}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>Available Investment Opportunities</h1>
        <p style={styles.welcomeSubtitle}>Explore high-yield surplus claims available for investment.</p>
      </div>
      
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Current Opportunities</h2>
        <div style={styles.investmentGrid}>
          <div style={styles.investmentCard}>
            <h3 style={styles.investmentTitle}>Orlando Surplus Claims Bundle</h3>
            <p style={styles.investmentDescription}>High-yield surplus claims from Orlando foreclosure auctions</p>
            
            <div style={styles.investmentStats}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Risk Level</span>
                <span style={styles.statValue}>Medium</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Expected Return</span>
                <span style={styles.statValue}>12.5%</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Duration</span>
                <span style={styles.statValue}>18-24 months</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Min Investment</span>
                <span style={styles.statValue}>$50,000</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Max Investment</span>
                <span style={styles.statValue}>$250,000</span>
              </div>
            </div>
            
            <div style={styles.progressSection}>
              <div style={styles.progressLabel}>Funding Progress: 65%</div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: '65%'}}></div>
              </div>
              <div style={styles.progressText}>$650,000 of $1,000,000 raised</div>
            </div>
            
            <div style={styles.buttonGroup}>
              <button style={styles.secondaryButton} onClick={() => handleViewDetails(1)}>
                View Details
              </button>
              <button style={styles.primaryButton} onClick={() => handleInvestNow(1)}>
                Invest Now
              </button>
            </div>
          </div>

          <div style={styles.investmentCard}>
            <h3 style={styles.investmentTitle}>Jacksonville Property Claims</h3>
            <p style={styles.investmentDescription}>Premium surplus claims from Jacksonville metro area</p>
            
            <div style={styles.investmentStats}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Risk Level</span>
                <span style={styles.statValue}>Medium-High</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Expected Return</span>
                <span style={styles.statValue}>14.2%</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Duration</span>
                <span style={styles.statValue}>12-18 months</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Min Investment</span>
                <span style={styles.statValue}>$100,000</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Max Investment</span>
                <span style={styles.statValue}>$500,000</span>
              </div>
            </div>
            
            <div style={styles.progressSection}>
              <div style={styles.progressLabel}>Funding Progress: 42%</div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: '42%'}}></div>
              </div>
              <div style={styles.progressText}>$840,000 of $2,000,000 raised</div>
            </div>
            
            <div style={styles.buttonGroup}>
              <button style={styles.secondaryButton} onClick={() => handleViewDetails(2)}>
                View Details
              </button>
              <button style={styles.primaryButton} onClick={() => handleInvestNow(2)}>
                Invest Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainLayout({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <MainDashboard user={user} onLogout={onLogout} />;
      case 'available-returns':
        return <AvailableReturns />;
      case 'current-investments':
        return <CurrentInvestments />;
      case 'wallet':
        return <WalletSection />;
      case 'support':
        return <SupportSection />;
      default:
        return <MainDashboard user={user} onLogout={onLogout} />;
    }
  };
  
  return (
    <div style={styles.appContainer}>
      <SidebarNavigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={onLogout}
      />
      <div style={styles.mainArea}>
        <div style={styles.topBar}>
          <div style={{fontSize: '1.1rem', fontWeight: '500'}}>
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
          </div>
          <button style={styles.userAvatar}>
            {user?.name || 'Test User'}
          </button>
        </div>
        <div style={{flex: 1, overflow: 'auto'}}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => { // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/address-info" element={<AddressInfo />} />
          <Route path="/password-setup" element={<PasswordSetup />} />
          <Route path="/accredited-investor" element={<AccreditedInvestor />} />
          <Route path="/online-access" element={<OnlineAccess />} />
          
          {/* Public test route for dashboard with new layout */}
          <Route path="/test-dashboard" element={<MainLayout user={{name: 'Test User', email: 'test@example.com', id: 1}} onLogout={() => {}} />} />
          
          {/* Investment routes */}
          <Route path="/investment-details/:id" element={<InvestmentDetails />} />
          <Route path="/invest/:id" element={<InvestmentFlow />} />
          <Route path="/investment-success" element={<InvestmentSuccess />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={user ? <MainLayout user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

