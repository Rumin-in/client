import { useEffect, useState } from 'react';
import { getAllIssues } from '../services/admin.services';
import { AlertCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const AdminIssues = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await getAllIssues();
      setIssues(response.data.issues || []);
    } catch (error: any) {
      toast.error('Failed to fetch issues');
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
          <h2 className="text-2xl font-bold text-gray-800">Issues</h2>
          <p className="text-gray-600 mt-1">Reported issues from users</p>
        </div>
        <button
          onClick={fetchIssues}
          className="px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {issues.map((issue) => (
          <div key={issue._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Issue Report</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-4 mb-3">
                  <p className="text-gray-700">{issue.issueDescription}</p>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">User ID:</span> {issue.userId}
                  </div>
                  <div>
                    <span className="font-medium">Room ID:</span> {issue.roomId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {issues.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No issues reported
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIssues;
