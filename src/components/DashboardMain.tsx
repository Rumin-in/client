import React from "react";

export default function DashboardMain() {
  return (
    <main className="p-6 flex-1 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-white rounded shadow p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Occupancy Trends</h3>
            <div className="h-44 bg-gradient-to-r from-green-100 to-orange-100 rounded" />
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Bookings by Status</h3>
            <div className="h-44 flex items-center justify-center text-gray-400">Chart</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded shadow p-6 min-h-[180px]">
            <h4 className="text-gray-700 font-medium mb-2">Pending Complaints</h4>
            <div className="text-sm text-gray-400">There are no pending complaints.</div>
          </div>

          <div className="bg-white rounded shadow p-6 min-h-[180px]">
            <h4 className="text-gray-700 font-medium mb-2">Upcoming Check-outs</h4>
            <div className="text-sm text-gray-400">There are no upcoming checkouts.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
