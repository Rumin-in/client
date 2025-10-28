import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Rooms from "./pages/Rooms";
import ProfileSettingsPage from "./pages/Profile";
import RoomDetails from "./pages/RoomDetails";
import Dashboard from "./pages/Dashboard";
import LandlordRegistration from "./pages/LandlordRegistration";
import SubmitRoom from "./pages/SubmitRoom";
import AdminPanel from "./pages/AdminPanel";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landlord" element={<LandlordRegistration />} />
        <Route path="/submit-room" element={<SubmitRoom />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path = "/profile" element = {<ProfileSettingsPage/>}/>
        <Route path="/room/:id" element={<RoomDetails/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
      </Routes>
    </>
  );
}

export default App;
