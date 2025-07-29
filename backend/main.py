import os
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import json
from config import config

# Create Flask app with configuration
def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')
    
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
    app.config.from_object(config[config_name])
    
    # Enable CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    return app

app = create_app()

# In-memory data store (in production, this would be a real database)
data_store = {
    'users': [
        {
            'id': 1,
            'name': 'John Smith',
            'email': 'john.smith@email.com',
            'phone': '555-123-4567',
            'status': 'Active',
            'created_date': '2024-01-15',
            'total_invested': 125000,
            'current_value': 138750,
            'wallet_balance': 5250
        },
        {
            'id': 2,
            'name': 'Sarah Johnson',
            'email': 'sarah.j@email.com',
            'phone': '555-987-6543',
            'status': 'Active',
            'created_date': '2024-02-20',
            'total_invested': 75000,
            'current_value': 82500,
            'wallet_balance': 2100
        }
    ],
    'investment_packages': [
        {
            'id': 1,
            'title': 'Orlando Surplus Claims Bundle',
            'description': 'High-yield surplus claims from Orlando foreclosure auctions',
            'risk_level': 'Medium',
            'expected_return': 12.5,
            'duration': '18-24 months',
            'min_investment': 50000,
            'max_investment': 250000,
            'funding_progress': 65,
            'raised_amount': 650000,
            'target_amount': 1000000,
            'status': 'Active',
            'state': 'Florida',
            'claim_type': 'Foreclosure Surplus',
            'commission_rate': 8.5
        },
        {
            'id': 2,
            'title': 'Jacksonville Property Claims',
            'description': 'Premium surplus claims from Jacksonville metro area',
            'risk_level': 'Medium-High',
            'expected_return': 14.2,
            'duration': '12-18 months',
            'min_investment': 100000,
            'max_investment': 500000,
            'funding_progress': 42,
            'raised_amount': 840000,
            'target_amount': 2000000,
            'status': 'Active',
            'state': 'Florida',
            'claim_type': 'Property Tax Surplus',
            'commission_rate': 9.0
        }
    ],
    'transactions': [
        {
            'id': 1,
            'user_id': 1,
            'user_name': 'John Smith',
            'package_id': 1,
            'package_name': 'Orlando Surplus Claims Bundle',
            'amount': 75000,
            'status': 'Approved',
            'date': '2024-07-20',
            'partner_id': 'P001',
            'partner_name': 'Investment Partners LLC',
            'commission': 6375
        },
        {
            'id': 2,
            'user_id': 2,
            'user_name': 'Sarah Johnson',
            'package_id': 2,
            'package_name': 'Jacksonville Property Claims',
            'amount': 50000,
            'status': 'Pending',
            'date': '2024-07-22',
            'partner_id': 'P002',
            'partner_name': 'Capital Growth Partners',
            'commission': 4500
        }
    ],
    'partners': [
        {
            'id': 'P001',
            'name': 'Investment Partners LLC',
            'email': 'contact@investmentpartners.com',
            'phone': '555-111-2222',
            'commission_rate': 8.5,
            'total_sales': 245000,
            'total_commission': 20825,
            'status': 'Active',
            'joined_date': '2024-01-10'
        },
        {
            'id': 'P002',
            'name': 'Capital Growth Partners',
            'email': 'info@capitalgrowth.com',
            'phone': '555-333-4444',
            'commission_rate': 9.0,
            'total_sales': 180000,
            'total_commission': 16200,
            'status': 'Active',
            'joined_date': '2024-02-15'
        }
    ],
    'support_tickets': [
        {
            'id': 1,
            'subject': 'Investment Status Inquiry',
            'user_name': 'John Smith',
            'user_email': 'john.smith@email.com',
            'status': 'Open',
            'priority': 'Medium',
            'category': 'Investment Inquiry',
            'created_date': '2024-07-23',
            'message': 'I would like to check the status of my Orlando investment and when I can expect the next update.'
        },
        {
            'id': 2,
            'subject': 'Account Access Issue',
            'user_name': 'Sarah Johnson',
            'user_email': 'sarah.j@email.com',
            'status': 'In Progress',
            'priority': 'High',
            'category': 'Technical Support',
            'created_date': '2024-07-22',
            'message': 'I am unable to log into my account. The password reset is not working.'
        }
    ],
    'claim_progress': [
        {
            'package_id': 1,
            'package_name': 'Orlando Surplus Claims Bundle',
            'current_stage': 2,
            'stages': [
                {'name': 'Transferred Ownership', 'completed': True, 'date': '2024-06-15'},
                {'name': 'Awaiting Disbursement', 'completed': True, 'date': '2024-07-01'},
                {'name': 'Attorney Received Check', 'completed': False, 'date': None},
                {'name': 'Attorney Disbursed Funds', 'completed': False, 'date': None},
                {'name': 'Returns Paid Out', 'completed': False, 'date': None}
            ]
        },
        {
            'package_id': 2,
            'package_name': 'Jacksonville Property Claims',
            'current_stage': 1,
            'stages': [
                {'name': 'Transferred Ownership', 'completed': True, 'date': '2024-07-10'},
                {'name': 'Awaiting Disbursement', 'completed': False, 'date': None},
                {'name': 'Attorney Received Check', 'completed': False, 'date': None},
                {'name': 'Attorney Disbursed Funds', 'completed': False, 'date': None},
                {'name': 'Returns Paid Out', 'completed': False, 'date': None}
            ]
        }
    ]
}

# API Routes for Admin System
@app.route('/api/admin/dashboard', methods=['GET'])
def admin_dashboard():
    total_investors = len(data_store['users'])
    total_packages = len(data_store['investment_packages'])
    total_transactions = len(data_store['transactions'])
    total_partners = len(data_store['partners'])
    
    # Calculate metrics
    total_sales_today = sum(t['amount'] for t in data_store['transactions'] if t['date'] == '2024-07-23')
    total_sales_week = sum(t['amount'] for t in data_store['transactions'])
    total_sales_year = sum(t['amount'] for t in data_store['transactions'])
    
    return jsonify({
        'metrics': {
            'total_investors': total_investors,
            'new_investors_today': 2,
            'new_investors_week': 8,
            'new_investors_month': 34,
            'total_sales_today': total_sales_today,
            'total_sales_week': total_sales_week,
            'total_sales_year': total_sales_year,
            'total_partners': total_partners,
            'new_partners_today': 0,
            'new_partners_week': 1,
            'new_partners_month': 3
        },
        'recent_sales': data_store['transactions'][-5:],
        'top_partners': sorted(data_store['partners'], key=lambda x: x['total_sales'], reverse=True)[:5]
    })

@app.route('/api/admin/transactions', methods=['GET'])
def admin_transactions():
    return jsonify(data_store['transactions'])

@app.route('/api/admin/packages', methods=['GET'])
def admin_packages():
    return jsonify(data_store['investment_packages'])

@app.route('/api/admin/packages', methods=['POST'])
def create_package():
    package_data = request.json
    new_id = max([p['id'] for p in data_store['investment_packages']]) + 1
    package_data['id'] = new_id
    package_data['status'] = 'Active'
    data_store['investment_packages'].append(package_data)
    return jsonify(package_data), 201

@app.route('/api/admin/packages/<int:package_id>', methods=['PUT'])
def update_package(package_id):
    package_data = request.json
    for i, package in enumerate(data_store['investment_packages']):
        if package['id'] == package_id:
            data_store['investment_packages'][i].update(package_data)
            return jsonify(data_store['investment_packages'][i])
    return jsonify({'error': 'Package not found'}), 404

@app.route('/api/admin/partners', methods=['GET'])
def admin_partners():
    return jsonify(data_store['partners'])

@app.route('/api/admin/partners', methods=['POST'])
def create_partner():
    partner_data = request.json
    new_id = f"P{len(data_store['partners']) + 1:03d}"
    partner_data['id'] = new_id
    partner_data['status'] = 'Active'
    partner_data['total_sales'] = 0
    partner_data['total_commission'] = 0
    partner_data['joined_date'] = datetime.now().strftime('%Y-%m-%d')
    data_store['partners'].append(partner_data)
    return jsonify(partner_data), 201

@app.route('/api/admin/support-tickets', methods=['GET'])
def admin_support_tickets():
    return jsonify(data_store['support_tickets'])

@app.route('/api/admin/support-tickets/<int:ticket_id>/reply', methods=['POST'])
def reply_support_ticket(ticket_id):
    reply_data = request.json
    for ticket in data_store['support_tickets']:
        if ticket['id'] == ticket_id:
            ticket['status'] = 'In Progress'
            # In a real system, you'd save the reply
            return jsonify({'success': True, 'message': 'Reply sent successfully'})
    return jsonify({'error': 'Ticket not found'}), 404

@app.route('/api/admin/claim-progress', methods=['GET'])
def admin_claim_progress():
    return jsonify(data_store['claim_progress'])

@app.route('/api/admin/claim-progress/<int:package_id>', methods=['PUT'])
def update_claim_progress(package_id):
    update_data = request.json
    for progress in data_store['claim_progress']:
        if progress['package_id'] == package_id:
            progress['current_stage'] = update_data['current_stage']
            # Update stage completion
            for i, stage in enumerate(progress['stages']):
                if i <= update_data['current_stage']:
                    stage['completed'] = True
                    if not stage['date']:
                        stage['date'] = datetime.now().strftime('%Y-%m-%d')
                else:
                    stage['completed'] = False
                    stage['date'] = None
            return jsonify(progress)
    return jsonify({'error': 'Package not found'}), 404

# API Routes for Investor Platform
@app.route('/api/investor/packages', methods=['GET'])
def investor_packages():
    active_packages = [p for p in data_store['investment_packages'] if p['status'] == 'Active']
    return jsonify(active_packages)

@app.route('/api/investor/packages/<int:package_id>', methods=['GET'])
def investor_package_details(package_id):
    package = next((p for p in data_store['investment_packages'] if p['id'] == package_id), None)
    if package:
        return jsonify(package)
    return jsonify({'error': 'Package not found'}), 404

@app.route('/api/investor/dashboard/<int:user_id>', methods=['GET'])
def investor_dashboard(user_id):
    user = next((u for u in data_store['users'] if u['id'] == user_id), None)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get user's investments
    user_transactions = [t for t in data_store['transactions'] if t['user_id'] == user_id]
    
    # Calculate returns data
    returns_data = {
        'ytd': {
            'dividends': 2184,
            'appreciation': 3250,
            'advisory_fees': -125,
            'total': 5309
        },
        'all_time': {
            'dividends': 8750,
            'appreciation': 5000,
            'advisory_fees': -500,
            'total': 13250
        }
    }
    
    return jsonify({
        'user': user,
        'investments': user_transactions,
        'returns': returns_data,
        'available_packages': [p for p in data_store['investment_packages'] if p['status'] == 'Active']
    })

@app.route('/api/investor/invest', methods=['POST'])
def create_investment():
    investment_data = request.json
    new_id = max([t['id'] for t in data_store['transactions']]) + 1
    
    transaction = {
        'id': new_id,
        'user_id': investment_data['user_id'],
        'user_name': investment_data['user_name'],
        'package_id': investment_data['package_id'],
        'package_name': investment_data['package_name'],
        'amount': investment_data['amount'],
        'status': 'Pending',
        'date': datetime.now().strftime('%Y-%m-%d'),
        'partner_id': investment_data.get('partner_id', 'P001'),
        'partner_name': investment_data.get('partner_name', 'Direct'),
        'commission': investment_data['amount'] * 0.085
    }
    
    data_store['transactions'].append(transaction)
    return jsonify(transaction), 201

@app.route('/api/investor/support-tickets', methods=['POST'])
def create_support_ticket():
    ticket_data = request.json
    new_id = max([t['id'] for t in data_store['support_tickets']]) + 1
    
    ticket = {
        'id': new_id,
        'subject': ticket_data['subject'],
        'user_name': ticket_data['user_name'],
        'user_email': ticket_data['user_email'],
        'status': 'Open',
        'priority': ticket_data.get('priority', 'Medium'),
        'category': ticket_data.get('category', 'General'),
        'created_date': datetime.now().strftime('%Y-%m-%d'),
        'message': ticket_data['message']
    }
    
    data_store['support_tickets'].append(ticket)
    return jsonify(ticket), 201

# Serve static files for both admin and investor interfaces
@app.route('/admin')
@app.route('/admin/<path:path>')
def serve_admin(path=''):
    admin_static_path = os.path.join(app.static_folder, 'admin')
    if os.path.exists(admin_static_path):
        if path and os.path.exists(os.path.join(admin_static_path, path)):
            return send_from_directory(admin_static_path, path)
        else:
            return send_from_directory(admin_static_path, 'index.html')
    return "Admin interface not found", 404

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_investor(path):
    investor_static_path = os.path.join(app.static_folder, 'investor')
    if os.path.exists(investor_static_path):
        if path and os.path.exists(os.path.join(investor_static_path, path)):
            return send_from_directory(investor_static_path, path)
        else:
            return send_from_directory(investor_static_path, 'index.html')
    else:
        # Fallback to root static folder
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            index_path = os.path.join(app.static_folder, 'index.html')
            if os.path.exists(index_path):
                return send_from_directory(app.static_folder, 'index.html')
            else:
                return "index.html not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

