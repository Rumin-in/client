import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import DashboardMain from "../components/DashboardMain";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ProfileHeader />
        <DashboardMain />
      </div>
    </div>
  );
}
