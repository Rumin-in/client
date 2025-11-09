import { useState, useEffect } from 'react';
import { 
  getAllCoupons, 
  createCoupon, 
  updateCoupon, 
  deleteCoupon 
} from '../services/walletAndCoupans.services';
import { Plus, Trash2, Edit2, X, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  expiry: string;
  active: boolean;
  usageCount?: number;
  maxUsage?: number;
  createdAt: string;
}

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  
  // Form state
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [expiry, setExpiry] = useState('');
  const [maxUsage, setMaxUsage] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await getAllCoupons();
      setCoupons(response.data?.coupons || []);
    } catch (error: any) {
      console.error('Error fetching coupons:', error);
      toast.error('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCode('');
    setDiscount('');
    setDiscountType('percentage');
    setExpiry('');
    setMaxUsage('');
    setEditingCoupon(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setDiscount(coupon.discount.toString());
    setDiscountType(coupon.discountType || 'percentage');
    setExpiry(coupon.expiry.split('T')[0]);
    setMaxUsage(coupon.maxUsage?.toString() || '');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error('Coupon code is required');
      return;
    }
    if (!discount || isNaN(parseFloat(discount)) || parseFloat(discount) <= 0) {
      toast.error('Valid discount amount is required');
      return;
    }
    if (!expiry) {
      toast.error('Expiry date is required');
      return;
    }

    try {
      setFormLoading(true);
      const data = {
        code: code.toUpperCase().trim(),
        discount: parseFloat(discount),
        discountType,
        expiry,
        maxUsage: maxUsage ? parseInt(maxUsage) : undefined,
      };

      if (editingCoupon) {
        await updateCoupon(editingCoupon._id, data);
        toast.success('Coupon updated successfully');
      } else {
        await createCoupon(data);
        toast.success('Coupon created successfully');
      }

      setShowModal(false);
      resetForm();
      fetchCoupons();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to save coupon');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (couponId: string) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) {
      return;
    }

    try {
      await deleteCoupon(couponId);
      toast.success('Coupon deleted successfully');
      fetchCoupons();
    } catch (error: any) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Coupon Management</h2>
          <p className="text-gray-600 mt-1">Create and manage promotional coupons</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      {loading ? (
        <div className="p-12 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0085FE] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading coupons...</p>
          </div>
        </div>
      ) : coupons.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No coupons created yet</p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-[#0085FE] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0074DD] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Your First Coupon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              {/* Coupon Code */}
              <div className="mb-4">
                <div className="inline-block bg-gradient-to-r from-[#0085FE] to-[#0B3463] text-white px-4 py-2 rounded font-bold text-lg">
                  {coupon.code}
                </div>
              </div>

              {/* Discount */}
              <div className="mb-3">
                <p className="text-sm text-gray-600">Discount</p>
                <p className="text-2xl font-bold text-green-600">
                  {coupon.discount}{coupon.discountType === 'percentage' ? '%' : '₹'}
                </p>
              </div>

              {/* Status */}
              <div className="mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  coupon.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {coupon.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Expiry Date */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Expires: {new Date(coupon.expiry).toLocaleDateString()}
                </p>
              </div>

              {/* Usage Info */}
              {(coupon.usageCount || coupon.maxUsage) && (
                <div className="mb-4 text-sm text-gray-600">
                  <p>Usage: {coupon.usageCount || 0}/{coupon.maxUsage || 'Unlimited'}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(coupon)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded transition-colors font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded transition-colors font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g., SUMMER50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                  disabled={formLoading}
                />
              </div>

              {/* Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Amount *
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                    disabled={formLoading}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                    disabled={formLoading}
                  >
                    <option value="percentage">% Percentage</option>
                    <option value="fixed">₹ Fixed</option>
                  </select>
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                  disabled={formLoading}
                />
              </div>

              {/* Max Usage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Usage (Leave empty for unlimited)
                </label>
                <input
                  type="number"
                  value={maxUsage}
                  onChange={(e) => setMaxUsage(e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0085FE] outline-none"
                  disabled={formLoading}
                  min="0"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                disabled={formLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={formLoading}
                className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                  formLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#89B4DB] to-[#0085FE] hover:from-[#7AA3CA] hover:to-[#0074DD]'
                }`}
              >
                {formLoading ? 'Saving...' : (editingCoupon ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">📋 Coupon System Guide:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• <strong>Percentage Discount:</strong> Applies a percentage off the total rent</li>
          <li>• <strong>Fixed Discount:</strong> Applies a fixed amount off the total rent</li>
          <li>• <strong>Max Usage:</strong> Leave empty to allow unlimited uses</li>
          <li>• <strong>Active Status:</strong> Only active coupons can be used by customers</li>
          <li>• <strong>Expiry:</strong> Coupons cannot be used after expiry date</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminCoupons;
