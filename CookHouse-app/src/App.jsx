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
import Communities from "./components/Communities";
import CreateCommunity from "./components/CreateCommunity";
import CommunityProfile from "./components/CommunityProfile";
import CommunityHome from "./components/userModule/CommunityHome";

import { Toaster } from "react-hot-toast";
import ManageCommunity from "./components/ManageCommunity";
import ChatsHome from "./components/userModule/ChatsHome";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavigationBar />
      <div className="flex p-0 m-0 max-w-full h-full mx-auto scroll-auto">
        <SideBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/community" element={<CommunityHome />} />
          <Route path="/explore-community" element={<Communities />} />
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path="/manage-community" element={<ManageCommunity />} />
          <Route path="community/:communityId" element={<CommunityProfile />} />
          <Route path="/conversations" element={<ChatsHome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
