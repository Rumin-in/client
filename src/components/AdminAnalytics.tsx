import { useEffect, useState } from 'react';
import { getAdminAnalytics } from '../services/admin.services';
import { BarChart3, TrendingUp, Eye } from 'lucide-react';
import { toast } from 'sonner';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getAdminAnalytics();
      setAnalytics(response.data);
    } catch (error: any) {
      toast.error('Failed to fetch analytics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
          <p className="text-gray-600 mt-1">Detailed platform insights</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#89B4DB] to-[#0085FE] rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Listings</h3>
            <BarChart3 className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{analytics?.totalListings || 0}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Approved</h3>
            <TrendingUp className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{analytics?.approvedListings || 0}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Pending</h3>
            <BarChart3 className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-4xl font-bold">{analytics?.pendingListings || 0}</p>
        </div>
      </div>

      {/* Views Per Listing */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-[#0085FE]" />
          All Listings Performance
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analytics?.viewsPerListing?.map((listing: any, index: number) => {
                const maxViews = Math.max(...analytics.viewsPerListing.map((l: any) => l.views));
                const percentage = maxViews > 0 ? (listing.views / maxViews) * 100 : 0;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {listing.title || 'Untitled'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {listing.views}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-gradient-to-r from-[#89B4DB] to-[#0085FE] h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {(!analytics?.viewsPerListing || analytics.viewsPerListing.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No analytics data available
            </div>
          )}
        </div>
      </div>

      {/* Active Users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">User Engagement</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Active Users</p>
            <p className="text-3xl font-bold text-[#0085FE] mt-2">{analytics?.activeUsers || 0}</p>
          </div>
          <div className="text-gray-400">
            <TrendingUp className="w-16 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
