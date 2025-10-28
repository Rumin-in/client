import { useState } from 'react';
import { addUserBalance } from '../services/admin.services';
import { DollarSign, Mail } from 'lucide-react';
import { toast } from 'sonner';

const AdminUserManagement = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-600 mt-1">Manage user accounts and balances</p>
      </div>

      {/* Add Balance Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add User Balance</h3>
        
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
            <h4 className="font-semibold text-green-900 mb-2">Balance Updated Successfully!</h4>
            <div className="space-y-1 text-sm text-green-800">
              <p><strong>User Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>User ID:</strong> {userInfo.userId}</p>
              <p><strong>New Balance:</strong> ₹{userInfo.balance?.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Note:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Enter the user's email address to add balance</li>
          <li>• Amount will be added to the user's existing wallet balance</li>
          <li>• The system will display user information after successful update</li>
          <li>• This action cannot be undone</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminUserManagement;
