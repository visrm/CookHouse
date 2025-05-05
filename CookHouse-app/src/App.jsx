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
import ExplorePage from "./components/userModule/ExplorePage";
import ChatsHome from "./components/userModule/ChatsHome";
import Communities from "./components/Communities";
import CreateCommunity from "./components/CreateCommunity";
import CommunityProfile from "./components/CommunityProfile";
import CommunityHome from "./components/userModule/CommunityHome";
import ManageCommunity from "./components/ManageCommunity";
import AdminHome from "./components/adminModule/AdminHome";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavigationBar />
      <div className="flex p-0 m-0 max-w-full h-full mx-auto scroll-smooth transition-all">
        <SideBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<ExplorePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userName" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/community" element={<CommunityHome />} />
          <Route path="/explore-community" element={<Communities />} />
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path="/manage-community" element={<ManageCommunity />} />
          <Route path="community/:communityId" element={<CommunityProfile />} />
          <Route path="/conversations" element={<ChatsHome />} />
          <Route path="/admin" element={<AdminHome />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
