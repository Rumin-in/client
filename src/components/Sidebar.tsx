import { Link } from "react-router-dom";

export default function Sidebar() {
  const nav = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/rooms", label: "Rooms" },
    { to: "/", label: "Tenants" },
    { to: "/", label: "Bookings" },
    { to: "/", label: "Payments" },
    { to: "/", label: "Notices & Complaints" },
    { to: "/", label: "Reports" },
    { to: "/", label: "Administration" },
    { to: "/", label: "Help" },
  ];

  return (
    <aside className="w-64 bg-gray-50 min-h-screen border-r border-gray-200 p-4 hidden md:flex md:flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 px-2">
          <div>
            <img src="/rumin-logo.png" alt="Rumin Logo" className="h-20 w-auto" />
          </div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {nav.map((n) => (
            <li key={n.label}>
              <Link
                to={n.to}
                className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-white hover:shadow"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 text-center text-xs text-gray-400">© Rumin</div>
    </aside>
  );
}
