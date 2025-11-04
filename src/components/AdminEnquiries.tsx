import { useEffect, useState } from 'react';
import { getAllEnquiries } from '../services/admin.services';
import { Mail, Phone, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await getAllEnquiries();
      // Sort enquiries by createdAt in descending order (latest first)
      const sortedEnquiries = (response.data.enquiries || []).sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setEnquiries(sortedEnquiries);
    } catch (error: any) {
      toast.error('Failed to fetch enquiries');
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
          <h2 className="text-2xl font-bold text-gray-800">Enquiries</h2>
          <p className="text-gray-600 mt-1">Customer enquiries and messages</p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-4 py-2 bg-gradient-to-r from-[#89B4DB] to-[#0085FE] text-white rounded-lg hover:from-[#7AA3CA] hover:to-[#0074DD] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {enquiries.map((enquiry) => (
          <div key={enquiry._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{enquiry.name}</h3>
                {enquiry.subject && (
                  <p className="text-sm text-gray-600 mt-1">{enquiry.subject}</p>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-[#0085FE]" />
                <a href={`mailto:${enquiry.email}`} className="hover:text-[#0085FE]">
                  {enquiry.email}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-[#0085FE]" />
                <a href={`tel:${enquiry.mobileNo}`} className="hover:text-[#0085FE]">
                  {enquiry.mobileNo}
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4">
              <p className="text-gray-700">{enquiry.message}</p>
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No enquiries found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
