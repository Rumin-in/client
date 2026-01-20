import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Rooms from "./pages/Rooms";
import Hostels from "./pages/Hostels";
import ProfileSettingsPage from "./pages/Profile";
import RoomDetails from "./pages/RoomDetails";
import HostelDetails from "./pages/HostelDetails";
import Dashboard from "./pages/Dashboard";
import LandlordRegistration from "./pages/LandlordRegistration";
import LandlordDashboard from "./pages/LandlordDashboard";
import AdminPanel from "./pages/AdminPanel";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";
import SubmitHostel from "./pages/SubmitHostel";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ScrollToTopOnNavigation } from "./components/ScrollToTopOnNavigation";

function App() {
  return (
    <>
      <ScrollToTopOnNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landlord" element={<LandlordRegistration />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path = "/profile" element = {<ProfileSettingsPage/>}/>
        <Route path="/room/:id" element={<RoomDetails/>} />
        <Route path="/hostels/:id" element={<HostelDetails/>} />
        <Route path="/submit-hostel" element={<SubmitHostel/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      </Routes>
    </>
  );
}

export default App;
