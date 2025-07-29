-- Database initialization script for Surplus Claims Platform
-- This script creates the necessary tables and initial data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active',
    user_type VARCHAR(50) DEFAULT 'Investor',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_invested DECIMAL(12,2) DEFAULT 0,
    current_value DECIMAL(12,2) DEFAULT 0,
    wallet_balance DECIMAL(12,2) DEFAULT 0,
    kyc_status VARCHAR(50) DEFAULT 'Pending',
    accredited_investor BOOLEAN DEFAULT FALSE
);

-- Investment packages table
CREATE TABLE IF NOT EXISTS investment_packages (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    risk_level VARCHAR(50),
    expected_return DECIMAL(5,2),
    duration VARCHAR(100),
    min_investment DECIMAL(12,2),
    max_investment DECIMAL(12,2),
    total_target DECIMAL(12,2),
    current_funding DECIMAL(12,2) DEFAULT 0,
    funding_progress DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    state VARCHAR(100),
    claim_type VARCHAR(100),
    commission_rate DECIMAL(5,4) DEFAULT 0.085,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id),
    package_id INTEGER REFERENCES investment_packages(id),
    amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    transaction_type VARCHAR(50) DEFAULT 'Investment',
    partner_id VARCHAR(50),
    partner_name VARCHAR(255),
    commission DECIMAL(12,2) DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_date TIMESTAMP,
    notes TEXT
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    partner_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    commission_rate DECIMAL(5,4) DEFAULT 0.085,
    total_commission DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Open',
    priority VARCHAR(50) DEFAULT 'Medium',
    category VARCHAR(100) DEFAULT 'General',
    assigned_to VARCHAR(255),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_date TIMESTAMP
);

-- Claim progress table
CREATE TABLE IF NOT EXISTS claim_progress (
    id SERIAL PRIMARY KEY,
    package_id INTEGER REFERENCES investment_packages(id),
    current_stage INTEGER DEFAULT 0,
    stage_1_completed BOOLEAN DEFAULT FALSE,
    stage_1_date TIMESTAMP,
    stage_2_completed BOOLEAN DEFAULT FALSE,
    stage_2_date TIMESTAMP,
    stage_3_completed BOOLEAN DEFAULT FALSE,
    stage_3_date TIMESTAMP,
    stage_4_completed BOOLEAN DEFAULT FALSE,
    stage_4_date TIMESTAMP,
    stage_5_completed BOOLEAN DEFAULT FALSE,
    stage_5_date TIMESTAMP,
    estimated_completion TIMESTAMP,
    notes TEXT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_id INTEGER REFERENCES users(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'deposit', 'withdrawal', 'investment', 'return', 'fee'
    amount DECIMAL(12,2) NOT NULL,
    balance_after DECIMAL(12,2) NOT NULL,
    description TEXT,
    reference_id INTEGER, -- Reference to related transaction
    status VARCHAR(50) DEFAULT 'Completed',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(created_date);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);

-- Insert sample data
INSERT INTO users (name, email, phone, status, total_invested, current_value, wallet_balance) VALUES
('John Smith', 'john.smith@email.com', '555-123-4567', 'Active', 125000, 138750, 5250),
('Sarah Johnson', 'sarah.j@email.com', '555-987-6543', 'Active', 75000, 82500, 2100)
ON CONFLICT (email) DO NOTHING;

INSERT INTO investment_packages (title, description, risk_level, expected_return, duration, min_investment, max_investment, total_target, current_funding, funding_progress, state, claim_type) VALUES
('Orlando Surplus Claims Bundle', 'High-yield surplus claims from Orlando foreclosure auctions', 'Medium', 12.5, '18-24 months', 50000, 250000, 1000000, 650000, 65, 'Florida', 'Foreclosure Surplus'),
('Jacksonville Property Claims', 'Premium surplus claims from Jacksonville metro area', 'Medium-High', 14.2, '12-18 months', 100000, 500000, 2000000, 840000, 42, 'Florida', 'Property Claims')
ON CONFLICT DO NOTHING;

INSERT INTO partners (partner_code, name, email, phone, company, commission_rate) VALUES
('P001', 'Mike Thompson', 'mike.t@partners.com', '555-111-2222', 'Thompson Investments', 0.085),
('P002', 'Lisa Chen', 'lisa.c@partners.com', '555-333-4444', 'Chen Capital', 0.090)
ON CONFLICT (partner_code) DO NOTHING;

-- Create triggers for updated_date
CREATE OR REPLACE FUNCTION update_updated_date_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_date = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_date BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_date_column();
CREATE TRIGGER update_investment_packages_updated_date BEFORE UPDATE ON investment_packages FOR EACH ROW EXECUTE FUNCTION update_updated_date_column();
CREATE TRIGGER update_transactions_updated_date BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_date_column();
CREATE TRIGGER update_support_tickets_updated_date BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_date_column();
CREATE TRIGGER update_claim_progress_updated_date BEFORE UPDATE ON claim_progress FOR EACH ROW EXECUTE FUNCTION update_updated_date_column();

