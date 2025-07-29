# API Documentation

The Surplus Claims Investment Platform provides a comprehensive REST API for both investor and administrative operations.

## 🔐 Authentication

### JWT Token Authentication
All API endpoints (except public ones) require JWT authentication via the `Authorization` header:

```http
Authorization: Bearer <jwt_token>
```

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "John Smith",
    "email": "user@example.com",
    "user_type": "Investor"
  }
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "password": "password123"
}
```

#### Token Refresh
```http
POST /api/auth/refresh
Authorization: Bearer <jwt_token>
```

## 📊 Investment Endpoints

### Get Investment Packages
```http
GET /api/investments
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Orlando Surplus Claims Bundle",
      "description": "High-yield surplus claims from Orlando foreclosure auctions",
      "risk_level": "Medium",
      "expected_return": 12.5,
      "duration": "18-24 months",
      "min_investment": 50000,
      "max_investment": 250000,
      "total_target": 1000000,
      "current_funding": 650000,
      "funding_progress": 65,
      "status": "Active"
    }
  ]
}
```

### Get Investment Package Details
```http
GET /api/investments/{id}
Authorization: Bearer <jwt_token>
```

### Create Investment
```http
POST /api/investments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "package_id": 1,
  "amount": 75000,
  "account_type": "Personal",
  "funding_method": "ACH"
}
```

## 👥 User Management Endpoints

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "status": "Active",
    "total_invested": 125000,
    "current_value": 138750,
    "wallet_balance": 5250,
    "created_date": "2024-01-15T00:00:00Z"
  }
}
```

### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "John Smith Jr.",
  "phone": "555-123-4568"
}
```

### Get User Transactions
```http
GET /api/users/transactions
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (pending, completed, failed)
- `type`: Filter by type (investment, withdrawal, return)

## 💰 Wallet Endpoints

### Get Wallet Balance
```http
GET /api/wallet/balance
Authorization: Bearer <jwt_token>
```

### Get Wallet Transactions
```http
GET /api/wallet/transactions
Authorization: Bearer <jwt_token>
```

### Request Payout
```http
POST /api/wallet/payout
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "amount": 5000,
  "method": "ACH",
  "bank_account": "****1234"
}
```

### Reinvest Funds
```http
POST /api/wallet/reinvest
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "amount": 10000,
  "package_id": 1
}
```

## 🎫 Support Endpoints

### Get Support Tickets
```http
GET /api/support/tickets
Authorization: Bearer <jwt_token>
```

### Create Support Ticket
```http
POST /api/support/tickets
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "subject": "Investment Question",
  "message": "I have a question about my recent investment...",
  "category": "Investment Inquiry",
  "priority": "Medium"
}
```

### Update Support Ticket
```http
PUT /api/support/tickets/{id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "Additional information...",
  "status": "Open"
}
```

## 🔧 Admin Endpoints

### Get All Users (Admin Only)
```http
GET /api/admin/users
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `status`: Filter by status
- `search`: Search by name or email

### Get All Transactions (Admin Only)
```http
GET /api/admin/transactions
Authorization: Bearer <admin_jwt_token>
```

### Update Transaction Status (Admin Only)
```http
PUT /api/admin/transactions/{id}
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "status": "Approved",
  "notes": "Transaction approved after verification"
}
```

### Create Investment Package (Admin Only)
```http
POST /api/admin/packages
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "title": "Miami Property Claims",
  "description": "Premium surplus claims from Miami-Dade County",
  "risk_level": "Medium-High",
  "expected_return": 15.0,
  "duration": "12-18 months",
  "min_investment": 100000,
  "max_investment": 500000,
  "total_target": 2000000,
  "state": "Florida",
  "claim_type": "Property Claims"
}
```

### Update Investment Package (Admin Only)
```http
PUT /api/admin/packages/{id}
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "status": "Active",
  "current_funding": 750000,
  "funding_progress": 37.5
}
```

### Get Partners (Admin Only)
```http
GET /api/admin/partners
Authorization: Bearer <admin_jwt_token>
```

### Create Partner (Admin Only)
```http
POST /api/admin/partners
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "partner_code": "P003",
  "name": "David Wilson",
  "email": "david@partners.com",
  "phone": "555-555-5555",
  "company": "Wilson Capital",
  "commission_rate": 0.090
}
```

### Update Claim Progress (Admin Only)
```http
PUT /api/admin/claims/{package_id}/progress
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "current_stage": 2,
  "stage_2_completed": true,
  "stage_2_date": "2024-01-15T10:30:00Z",
  "notes": "Attorney received check from court"
}
```

## 📈 Analytics Endpoints (Admin Only)

### Get Dashboard Metrics
```http
GET /api/admin/analytics/dashboard
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_investors": 1247,
    "new_investors_today": 23,
    "new_investors_week": 156,
    "new_investors_month": 678,
    "sales_today": 2400000,
    "sales_week": 18700000,
    "sales_year": 247800000,
    "total_partners": 47,
    "new_partners_month": 8,
    "recent_sales": [...]
  }
}
```

### Get Transaction Analytics
```http
GET /api/admin/analytics/transactions
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)
- `group_by`: Group by period (day, week, month)

## 🔍 Search and Filtering

### Search Users
```http
GET /api/admin/users/search?q=john&status=Active
Authorization: Bearer <admin_jwt_token>
```

### Filter Transactions
```http
GET /api/admin/transactions?status=Pending&partner_id=P001&start_date=2024-01-01
Authorization: Bearer <admin_jwt_token>
```

## 📄 File Upload Endpoints

### Upload Document
```http
POST /api/upload/document
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

file: <binary_data>
type: "investment_summary"
```

### Get Document
```http
GET /api/documents/{id}
Authorization: Bearer <jwt_token>
```

## 🔔 Notification Endpoints

### Get Notifications
```http
GET /api/notifications
Authorization: Bearer <jwt_token>
```

### Mark Notification as Read
```http
PUT /api/notifications/{id}/read
Authorization: Bearer <jwt_token>
```

## ⚡ Real-time Endpoints

### WebSocket Connection
```javascript
const ws = new WebSocket('wss://yourdomain.com/ws');
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  // Handle real-time updates
};
```

## 🚨 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": ["Email is required"],
      "amount": ["Amount must be greater than minimum investment"]
    }
  }
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `429`: Rate Limited
- `500`: Internal Server Error

### Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_ERROR`: Invalid credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `INSUFFICIENT_FUNDS`: Not enough balance
- `INVESTMENT_CLOSED`: Investment opportunity closed

## 🔒 Rate Limiting

### Rate Limits
- **General API**: 100 requests per minute per IP
- **Authentication**: 5 login attempts per minute per IP
- **File Upload**: 10 uploads per minute per user
- **Admin API**: 200 requests per minute per admin user

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 🧪 Testing

### API Testing with curl
```bash
# Login
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get investments
curl -X GET https://yourdomain.com/api/investments \
  -H "Authorization: Bearer <token>"
```

### API Testing with Postman
Import the Postman collection available at `/docs/postman_collection.json`

## 📝 API Versioning

### Current Version
- **Version**: v1
- **Base URL**: `https://yourdomain.com/api/v1/`
- **Deprecation Policy**: 6 months notice for breaking changes

### Version Headers
```http
Accept: application/vnd.surplus-claims.v1+json
API-Version: 1.0
```

## 🔧 Development and Testing

### Local Development
```bash
# Start development server
cd backend
python main.py

# API available at: http://localhost:5000/api/
```

### API Documentation
- **Interactive Docs**: Available at `/api/docs` (Swagger UI)
- **OpenAPI Spec**: Available at `/api/openapi.json`

---

This API documentation covers all available endpoints and their usage. For additional support or questions about specific endpoints, please contact the development team.

