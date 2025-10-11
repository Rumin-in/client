import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Rooms from "./pages/Rooms";
import ProfileSettingsPage from "./pages/Profile";
import RoomDetails from "./pages/RoomDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path = "/profile" element = {<ProfileSettingsPage/>}/>
        <Route path="/rooms/:id" element={<RoomDetails/>} />
      </Routes>
    </>
  );
}

export default App;
