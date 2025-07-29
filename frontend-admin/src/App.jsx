import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// const API_BASE = window.location.origin;
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


// Admin Dashboard Component
function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/dashboard`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!dashboardData) {
    return <div className="p-6">Error loading dashboard data</div>;
  }

  const { metrics, recent_sales, top_partners } = dashboardData;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Number Of Investors</h3>
          <p className="text-2xl font-bold">{metrics.total_investors.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total New Investors Today</h3>
          <p className="text-2xl font-bold">{metrics.new_investors_today}</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Amount Of New Investors This Week</h3>
          <p className="text-2xl font-bold">{metrics.new_investors_week}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Amount Of New Investors This Month</h3>
          <p className="text-2xl font-bold">{metrics.new_investors_month}</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Amount Sold Today</h3>
          <p className="text-2xl font-bold">${(metrics.total_sales_today / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Amount Sold This Week</h3>
          <p className="text-2xl font-bold">${(metrics.total_sales_week / 1000).toFixed(1)}K</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total for current year</h3>
          <p className="text-2xl font-bold">${(metrics.total_sales_year / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <h3 className="font-semibold mb-4">Recent Sales</h3>
          <div className="space-y-2">
            {recent_sales.map(sale => (
              <div key={sale.id} className="flex justify-between">
                <span>{sale.package_name} - ${sale.amount.toLocaleString()}</span>
                <span className={sale.status === 'Approved' ? 'text-brand' : 'text-yellow-600'}>
                  {sale.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Partner Dashboard Component
function PartnerDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Partner Dashboard</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Number Of Partners</h3>
          <p className="text-2xl font-bold">47</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total New Partners Today</h3>
          <p className="text-2xl font-bold">2</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Partners This Week</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Total Partners This Month</h3>
          <p className="text-2xl font-bold">23</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-300 p-4">
          <h3 className="font-semibold mb-4">Recent New Partners</h3>
          <div className="space-y-2">
            <div>Jacob Cruiser - 121212</div>
            <div>Pete Davi - 131313</div>
            <div>Sarah Johnson - 141414</div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <h3 className="font-semibold mb-4">Top Earning Partners</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Mike Thompson</span>
              <span>$45,000</span>
            </div>
            <div className="flex justify-between">
              <span>Lisa Chen</span>
              <span>$38,500</span>
            </div>
            <div className="flex justify-between">
              <span>David Rodriguez</span>
              <span>$32,100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Transactions Component
function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading transactions...</div>;
  }

  const pendingCount = transactions.filter(t => t.status === 'Pending').length;
  const todayCount = transactions.filter(t => t.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">New Today</h3>
          <p className="text-2xl font-bold">{todayCount}</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Pending Approval</h3>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-4 mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Investor Name</th>
              <th className="text-left p-2">Partner #</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Package</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b cursor-pointer hover:bg-gray-50" onClick={() => setSelectedTransaction(txn)}>
                <td className="p-2">{txn.user_name}</td>
                <td className="p-2">{txn.partner_id}</td>
                <td className="p-2">${txn.amount.toLocaleString()}</td>
                <td className="p-2">{txn.date}</td>
                <td className="p-2">{txn.package_name}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-sm ${txn.status === 'Approved' ? 'bg-brand-light text-brand' : 'bg-yellow-100 text-yellow-800'}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 p-4">
        <h3 className="font-semibold mb-2">Alerts (what's started and missing from investors)</h3>
        <div className="text-orange-600">
          Updates in investor and partner system that payment is received/confirmed from the investor
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Transaction Details &gt; ({selectedTransaction.id})</h3>
            <div className="space-y-2 mb-4">
              <div><strong>Transaction Status:</strong> {selectedTransaction.status}</div>
              <div><strong>Transaction Type:</strong> Investment Purchase</div>
              <div><strong>Transaction Amount:</strong> {selectedTransaction.amount}</div>
              <div><strong>Partner Name:</strong> {selectedTransaction.partner}</div>
              <div><strong>Partner #:</strong> 12345</div>
            </div>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <h4 className="font-semibold mb-2">Details</h4>
              <div><strong>Package Name:</strong> {selectedTransaction.package}</div>
              <div><strong>Purchase amount:</strong> {selectedTransaction.amount}</div>
              <div><strong>Timeline:</strong> 18-24 months</div>
              <div><strong>ROI - Discount rate:</strong> 12.5%</div>
            </div>
            <Button onClick={() => setSelectedTransaction(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Tranches Component
function Tranches() {
  const [editingPackage, setEditingPackage] = useState(null)

  const packages = [
    { id: 1, name: 'Package 1', rate: '12.5%', timeline: '18-24 months', minimum: '$50,000' },
    { id: 2, name: 'Package 2', rate: '14.2%', timeline: '12-18 months', minimum: '$75,000' },
    { id: 3, name: 'Package 3', rate: '16.8%', timeline: '24-36 months', minimum: '$100,000' }
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tranches</h2>
      
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Guaranteed Rate</th>
              <th className="text-left p-2">Timeline</th>
              <th className="text-left p-2">Minimum</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-b">
                <td className="p-2">{pkg.name}</td>
                <td className="p-2">{pkg.rate}</td>
                <td className="p-2">{pkg.timeline}</td>
                <td className="p-2">{pkg.minimum}</td>
                <td className="p-2">
                  <Button size="sm" onClick={() => setEditingPackage(pkg)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 p-4">
        <Button>Add New Package</Button>
      </div>

      {/* Package Edit Modal */}
      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Create/Edit Package</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Package Name</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue={editingPackage.name} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea className="w-full border border-gray-300 p-2 rounded" rows="3"></textarea>
              </div>
              <div>
                <label className="block font-semibold mb-1">Guaranteed ROI Range (ex. 14-23%)</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue={editingPackage.rate} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Discount Rate (ex. 11.5-20.1%)</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">7, 8, 9, 10, 11, 12 Timeline (weeks)</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue={editingPackage.timeline} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Transaction Amount</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Total Package value</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">States</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Type of Claims (Mortgage, Tax, Mortgage and Tax)</label>
                <select className="w-full border border-gray-300 p-2 rounded">
                  <option>Mortgage</option>
                  <option>Tax</option>
                  <option>Mortgage and Tax</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Minimum Amount</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue={editingPackage.minimum} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Maximum Amount</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Available Commission Percentage</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save</Button>
              <Button variant="outline">Edit Page</Button>
              <Button variant="outline" onClick={() => setEditingPackage(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Package Info Page Component
function PackageInfoPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Package Info Page</h2>
      <p className="text-gray-600 mb-6">Create/Edit Package Info Page - Sales Page in investor system</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Main Image</h3>
          <div className="border-2 border-dashed border-gray-300 p-8 text-center">
            <p>Upload main package image</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Highlights</h3>
          <textarea className="w-full border border-gray-300 p-4 rounded" rows="4" placeholder="Enter package highlights..."></textarea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Bullet Points</h3>
          <textarea className="w-full border border-gray-300 p-4 rounded" rows="6" placeholder="Enter bullet points..."></textarea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Breakdown video (vimeo)</h3>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" placeholder="Enter Vimeo embed code..." />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Investment Summary (PDF)</h3>
          <div className="border-2 border-dashed border-gray-300 p-8 text-center">
            <p>Upload PDF document</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Testimonials (vimeo)</h3>
          <input type="text" className="w-full border border-gray-300 p-2 rounded" placeholder="Enter Vimeo embed code..." />
        </div>

        <Button>Save</Button>
      </div>
    </div>
  )
}

// Payouts Component
function Payouts() {
  const payouts = [
    { id: 'PAY001', investor: 'John Smith', amount: '$8,750', status: 'Pending' },
    { id: 'PAY002', investor: 'Sarah Johnson', amount: '$12,500', status: 'Processed' },
    { id: 'PAY003', investor: 'Robert Davis', amount: '$6,250', status: 'Paid out' }
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Payouts</h2>
      <p className="text-gray-600 mb-6">Payments Disbursement Tracker</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Number of Requested Payouts</h3>
          <p className="text-2xl font-bold">23</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Amount of Requested Payouts</h3>
          <p className="text-2xl font-bold">$487,500</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-4 mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Payout ID</th>
              <th className="text-left p-2">Investor</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-b">
                <td className="p-2">{payout.id}</td>
                <td className="p-2">{payout.investor}</td>
                <td className="p-2">{payout.amount}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    payout.status === 'Paid out' ? 'bg-brand-light text-brand' : 
                    payout.status === 'Processed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 p-4">
        <Button>Complete Payouts</Button>
      </div>
    </div>
  )
}

// Partners Component
function Partners() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Partners</h2>
      
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <h3 className="font-semibold mb-4">Partner List</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Partner Name</th>
              <th className="text-left p-2">Partner Number</th>
              <th className="text-left p-2">Commission Rate</th>
              <th className="text-left p-2">Total Earnings</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Mike Thompson</td>
              <td className="p-2">12345</td>
              <td className="p-2">5%</td>
              <td className="p-2">$45,000</td>
              <td className="p-2"><Button size="sm">Edit</Button></td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Lisa Chen</td>
              <td className="p-2">12346</td>
              <td className="p-2">4.5%</td>
              <td className="p-2">$38,500</td>
              <td className="p-2"><Button size="sm">Edit</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

// New Partners Component
function NewPartners() {
  const [showAddForm, setShowAddForm] = useState(false)

  const newPartners = [
    { name: 'Jacob Cruiser', dateAdded: '11/22/2025', partnerNumber: '121212' },
    { name: 'Pete Davi', dateAdded: '11/23/2025', partnerNumber: '131313' }
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">New Partners</h2>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">New Partners</h3>
        <Button onClick={() => setShowAddForm(true)}>Add New Partner</Button>
      </div>

      <div className="bg-white border border-gray-300 p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Partner Name</th>
              <th className="text-left p-2">Date Added</th>
              <th className="text-left p-2">Partner Number</th>
            </tr>
          </thead>
          <tbody>
            {newPartners.map((partner, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{partner.name}</td>
                <td className="p-2">{partner.dateAdded}</td>
                <td className="p-2">{partner.partnerNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Partner Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">New Partner</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">First Name</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Last Name</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Phone</label>
                <input type="tel" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Partner Commission Percentage</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Partner Number</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Create Password</label>
                <input type="password" className="w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button>Save</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
            <div className="mt-4 p-3 bg-orange-100 rounded">
              <p className="text-sm">Email Special Partner Code To Partner to Login to Partner System</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Commission Payouts Component
function CommissionPayouts() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Partner Commission Payouts</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Amount of Commissions Paid out Last Month</h3>
          <p className="text-2xl font-bold">$24,750</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Amount of Commissions Paid out Last Week</h3>
          <p className="text-2xl font-bold">$6,850</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 text-center">
          <h3 className="font-semibold mb-2">Amount of Commissions Due This Week</h3>
          <p className="text-2xl font-bold">$8,200</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-4 mb-4">
        <h3 className="font-semibold mb-4">List of Partners that are owed a commission</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Partner Name</th>
              <th className="text-left p-2">Amount Due</th>
              <th className="text-left p-2">Commission Rate</th>
              <th className="text-left p-2">Sales Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Mike Thompson</td>
              <td className="p-2">$3,750</td>
              <td className="p-2">5%</td>
              <td className="p-2">$75,000</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Lisa Chen</td>
              <td className="p-2">$4,500</td>
              <td className="p-2">4.5%</td>
              <td className="p-2">$100,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-300 p-4">
        <Button>Complete Payouts</Button>
        <div className="mt-2 p-3 bg-orange-100 rounded">
          <p className="text-sm">This is done through the API integrations</p>
        </div>
      </div>
    </div>
  )
}

// Claim Progress Manager Component
function ClaimProgressManager() {
  const [selectedClaim, setSelectedClaim] = useState(null)

  const claims = [
    { id: 'CLM001', package: 'Orlando Bundle', stage: 'Transferred Ownership', action: 'Update Stage' },
    { id: 'CLM002', package: 'Miami Package', stage: 'Awaiting Disbursement', action: 'Update Stage' },
    { id: 'CLM003', package: 'Tampa Claims', stage: 'Attorney received check', action: 'Update Stage' }
  ]

  const stages = [
    '1. Transferred Ownership',
    '2. Awaiting Disbursement', 
    '3. Attorney received check',
    '4. Attorney disbursed funds',
    '5. Returns Paid Out'
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Claim progress manager</h2>
      
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <div className="mb-4">
          <select className="border border-gray-300 p-2 rounded">
            <option>Package</option>
            <option>Orlando Bundle</option>
            <option>Miami Package</option>
            <option>Tampa Claims</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Claim ID</th>
              <th className="text-left p-2">Package</th>
              <th className="text-left p-2">Stage</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id} className="border-b">
                <td className="p-2">{claim.id}</td>
                <td className="p-2">{claim.package}</td>
                <td className="p-2">{claim.stage}</td>
                <td className="p-2">
                  <Button size="sm" onClick={() => setSelectedClaim(claim)}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <Button>Save</Button>
        <Button variant="outline">Edit Page</Button>
      </div>

      {/* Stage Update Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Update Claim Stage</h3>
            <div className="mb-4">
              <p><strong>Claim ID:</strong> {selectedClaim.id}</p>
              <p><strong>Package:</strong> {selectedClaim.package}</p>
              <p><strong>Current Stage:</strong> {selectedClaim.stage}</p>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Select New Stage:</label>
              <div className="space-y-2">
                {stages.map((stage, index) => (
                  <div key={index} className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    {stage}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button>Update Stage</Button>
              <Button variant="outline" onClick={() => setSelectedClaim(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Settings Component
function Settings() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="bg-white border border-gray-300 p-4">
        <h3 className="font-semibold mb-4">System Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Platform Commission Rate (%)</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue="2.5" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Default Investment Timeline (months)</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue="18-24" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Minimum Investment Amount</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue="50000" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Maximum Investment Amount</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" defaultValue="250000" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Support Email</label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" defaultValue="support@surplusclaims.com" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Admin Notification Email</label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" defaultValue="admin@surplusclaims.com" />
          </div>
        </div>
        <Button className="mt-4">Save Settings</Button>
      </div>
    </div>
  )
}

// Support Tickets Component
function SupportTickets() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyText, setReplyText] = useState('')

  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Unable to access investment details',
      user: 'John Smith',
      email: 'john.smith@email.com',
      status: 'Open',
      priority: 'High',
      created: '2024-07-25 10:30 AM',
      lastUpdate: '2024-07-25 10:30 AM',
      message: 'I am unable to view my investment details in the dashboard. The page keeps loading but never shows my portfolio information. Please help.',
      category: 'Technical Support'
    },
    {
      id: 'TKT-002',
      subject: 'Question about payout timeline',
      user: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      status: 'In Progress',
      priority: 'Medium',
      created: '2024-07-24 2:15 PM',
      lastUpdate: '2024-07-25 9:00 AM',
      message: 'When can I expect to receive my payout for the Miami Foreclosure Package A? The status shows "Payout" but I haven\'t received any communication about timing.',
      category: 'Investment Inquiry'
    },
    {
      id: 'TKT-003',
      subject: 'Document verification needed',
      user: 'Michael Brown',
      email: 'mbrown@email.com',
      status: 'Resolved',
      priority: 'Low',
      created: '2024-07-23 11:45 AM',
      lastUpdate: '2024-07-24 3:30 PM',
      message: 'I need to update my accredited investor documentation. What documents do you need and where should I send them?',
      category: 'Account Management'
    },
    {
      id: 'TKT-004',
      subject: 'Investment minimum clarification',
      user: 'Lisa Davis',
      email: 'lisa.davis@email.com',
      status: 'Open',
      priority: 'Medium',
      created: '2024-07-25 8:20 AM',
      lastUpdate: '2024-07-25 8:20 AM',
      message: 'I see different minimum investment amounts on different packages. Can you clarify the minimum for the Jacksonville Property Claims package?',
      category: 'Investment Inquiry'
    }
  ]

  const handleReply = (ticket) => {
    setSelectedTicket(ticket)
    setShowReplyModal(true)
  }

  const handleSendReply = () => {
    // Handle reply logic here
    setShowReplyModal(false)
    setReplyText('')
    setSelectedTicket(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Resolved': return 'bg-brand-light text-brand'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <div className="flex gap-4">
          <select className="border border-gray-300 p-2 rounded">
            <option>All Statuses</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className="border border-gray-300 p-2 rounded">
            <option>All Categories</option>
            <option>Technical Support</option>
            <option>Investment Inquiry</option>
            <option>Account Management</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white border border-gray-300 rounded">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-semibold">Ticket ID</th>
              <th className="p-3 text-left font-semibold">Subject</th>
              <th className="p-3 text-left font-semibold">User</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Priority</th>
              <th className="p-3 text-left font-semibold">Created</th>
              <th className="p-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t border-gray-200">
                <td className="p-3 font-mono text-sm">{ticket.id}</td>
                <td className="p-3">
                  <div className="font-medium">{ticket.subject}</div>
                  <div className="text-sm text-gray-600">{ticket.category}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium">{ticket.user}</div>
                  <div className="text-sm text-gray-600">{ticket.email}</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-3 text-sm">{ticket.created}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleReply(ticket)}
                      className="bg-brand text-white px-3 py-1 rounded text-sm hover:bg-brand-light hover:text-brand"
                    >
                      Reply
                    </button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Reply to Ticket {selectedTicket.id}</h3>
            
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <div className="font-semibold">{selectedTicket.subject}</div>
              <div className="text-sm text-gray-600 mb-2">From: {selectedTicket.user} ({selectedTicket.email})</div>
              <div className="text-sm">{selectedTicket.message}</div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Your Reply</label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded h-32"
                placeholder="Type your reply here..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-light hover:text-brand"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Main App Component
function App() {
  const [currentSection, setCurrentSection] = useState('dashboard')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'tranches', label: 'Tranches' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'partners', label: 'Partners' },
    { id: 'newPartners', label: 'New Partners' },
    { id: 'commissionPayouts', label: 'Commission Payouts' },
    { id: 'claimProgress', label: 'Claim Progress' },
    { id: 'packageInfo', label: 'Package Info' },
    { id: 'support', label: 'Support Tickets' },
    { id: 'settings', label: 'System Settings' }
  ]

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AdminDashboard />
      case 'partnerDashboard':
        return <PartnerDashboard />
      case 'transactions':
        return <Transactions />
      case 'tranches':
        return <Tranches />
      case 'payouts':
        return <Payouts />
      case 'partners':
        return <Partners />
      case 'newPartners':
        return <NewPartners />
      case 'commissionPayouts':
        return <CommissionPayouts />
      case 'claimProgress':
        return <ClaimProgressManager />
      case 'packageInfo':
        return <PackageInfoPage />
      case 'support':
        return <SupportTickets />
      case 'settings':
        return <Settings />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-300">
        <div className="p-4 border-b border-gray-300">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full text-left p-3 rounded border border-gray-300 hover:bg-brand-light ${
                  currentSection === item.id ? 'bg-brand-light text-brand border-brand-light font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setCurrentSection('partnerDashboard')}
              className={`w-full text-left p-3 rounded border border-gray-300 hover:bg-brand-light ${
                currentSection === 'partnerDashboard' ? 'bg-brand-light text-brand border-brand-light font-semibold' : ''
              }`}
            >
              Partner Dashboard
            </button>
          </div>
          <div className="mt-8">
            <button className="w-full text-left p-3 rounded border border-gray-300 hover:bg-gray-50">
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b border-gray-300 p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentSection === 'dashboard' && 'Admin Client Dashboard'}
            {currentSection === 'partnerDashboard' && 'Admin Partner Dashboard'}
            {currentSection === 'transactions' && 'Transactions List'}
            {currentSection === 'tranches' && 'Tranches'}
            {currentSection === 'payouts' && 'Payouts'}
            {currentSection === 'partners' && 'Partners'}
            {currentSection === 'newPartners' && 'New Partners'}
            {currentSection === 'commissionPayouts' && 'Partner Commission Payouts'}
            {currentSection === 'claimProgress' && 'Claim progress manager'}
            {currentSection === 'packageInfo' && 'Create/Edit Package Info Page - Sales Page in investor system'}
            {currentSection === 'support' && 'Support Tickets Management'}
            {currentSection === 'settings' && 'Settings'}
          </h1>
        </header>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App

