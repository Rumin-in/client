import { useEffect, useState } from 'react';
import { getAdminAnalytics } from '../services/admin.services';
import { Home, CheckCircle, Clock, Eye, Users } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
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

  const stats = [
    {
      title: 'Total Listings',
      value: analytics?.totalListings || 0,
      icon: Home,
      color: 'bg-gradient-to-br from-[#89B4DB] to-[#0085FE]',
    },
    {
      title: 'Approved Listings',
      value: analytics?.approvedListings || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Listings',
      value: analytics?.pendingListings || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Active Users',
      value: analytics?.activeUsers || 0,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Monitor your platform's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Views Per Listing */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-[#0085FE]" />
          Top Viewed Listings
        </h3>
        <div className="space-y-3">
          {analytics?.viewsPerListing?.slice(0, 10).map((listing: any, index: number) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <span className="text-gray-700">{listing.title || 'Untitled'}</span>
              <span className="text-gray-500 font-medium">{listing.views} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
