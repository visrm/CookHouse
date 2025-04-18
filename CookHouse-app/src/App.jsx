import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/userModule/Home";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import Profile from "./components/userModule/Profile";
import Notifications from "./components/userModule/Notifications";
import Community from "./components/userModule/Community";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavigationBar />
      <div className="flex p-0 m-0 max-w-6xl md:max-w-full h-full mx-auto scroll-auto">
        <SideBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
