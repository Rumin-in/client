import React, { useState, useEffect } from 'react';
import { addUserBalance, getAllUsers } from '../services/admin.services';
import { DollarSign, Mail, Plus, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  mobileNo?: string;
  createdAt: string;
  balance?: number;
  status: string;
}

const AdminUserManagement = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'date' | 'role'>('date');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // Fetch all users on mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setUsersLoading(true);
      const response = await getAllUsers();
      setUsers(response.data?.users || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleAddBalance = async () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error('Valid amount is required');
      return;
    }

    try {
      setLoading(true);
      const response = await addUserBalance({ email: email.trim(), amount: parseFloat(amount) });
      toast.success('User balance updated successfully');
      setUserInfo(response.data);
      setEmail('');
      setAmount('');
      // Refresh users list
      fetchAllUsers();
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('User not found with this email');
      } else {
        toast.error('Failed to update user balance');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'role':
        return a.role.localeCompare(b.role);
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-600 mt-1">Manage user accounts, balances, and view all user data</p>
      </div>

      {/* Add Balance Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add User Balance
        </h3>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] focus:border-[#0085FE] outline-none transition-colors pr-10"
                disabled={loading}
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] focus:border-[#0085FE] outline-none transition-colors pr-10"
                disabled={loading}
                min="0"
              />
              <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <button
            onClick={handleAddBalance}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD] text-white'
            }`}
          >
            {loading ? 'Updating...' : 'Add Balance'}
          </button>
        </div>

        {/* User Info Display */}
        {userInfo && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">✓ Balance Updated Successfully!</h4>
            <div className="space-y-1 text-sm text-green-800">
              <p><strong>User Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>User ID:</strong> {userInfo.userId}</p>
              <p><strong>New Balance:</strong> ₹{userInfo.balance?.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Users Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
            <p className="text-sm text-gray-600 mt-1">Total: {users.length} users</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
            >
              <option value="date">Date (Latest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="email">Email (A-Z)</option>
              <option value="role">Role</option>
            </select>
          </div>
        </div>

        {usersLoading ? (
          <div className="p-12 flex justify-center items-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0085FE] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p>No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user) => (
                  <React.Fragment key={user._id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0085FE] to-[#0B3463] flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'landlord' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.mobileNo || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-green-600">₹{(user.balance || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setExpandedUser(expandedUser === user._id ? null : user._id)}
                          className="text-[#0085FE] hover:text-[#0074DD] transition-colors"
                        >
                          <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedUser === user._id ? 'rotate-180' : ''}`} />
                        </button>
                      </td>
                    </tr>
                    {expandedUser === user._id && (
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-600 uppercase font-semibold">User ID</p>
                              <p className="text-sm text-gray-900 mt-1 break-all">{user._id}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 uppercase font-semibold">Full Email</p>
                              <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 uppercase font-semibold">Account Status</p>
                              <p className="text-sm text-gray-900 mt-1 capitalize">{user.status || 'Active'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 uppercase font-semibold">Joined Date</p>
                              <p className="text-sm text-gray-900 mt-1">{new Date(user.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 uppercase font-semibold">Current Balance</p>
                              <p className="text-sm font-semibold text-green-600 mt-1">₹{(user.balance || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 uppercase font-semibold">Mobile</p>
                              <p className="text-sm text-gray-900 mt-1">{user.mobileNo || 'Not provided'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">📋 Notes:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Click the chevron icon to expand and view complete user details</li>
          <li>• Enter user email to add balance to their wallet</li>
          <li>• Balance will be added to the user's existing wallet balance</li>
          <li>• Sort users by name, email, role, or join date</li>
          <li>• All changes are logged and cannot be undone</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminUserManagement;
