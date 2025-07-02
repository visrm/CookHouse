import { Navigate, Route, Routes } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import LandingPage from "./components/Landing/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/userModule/Home";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import Profile from "./components/userModule/Profile";
import Notifications from "./components/userModule/Notifications";
import ExplorePage from "./components/userModule/ExplorePage";
import ChatsHome from "./components/userModule/Chats/ChatsHome";
import Communities from "./components/userModule/Community/Communities";
import CreateCommunity from "./components/userModule/Community/CreateCommunity";
import ManageCommunity from "./components/userModule/Community/ManageCommunity";
import CommunityProfile from "./components/CommunityProfile";
import CommunityHome from "./components/userModule/Community/CommunityHome";
import AdminHome from "./components/adminModule/AdminHome";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./components/PageNotFound";
import Contacts from "./components/Contacts";
import ProtectedRoute from "./components/adminModule/ProtectedRoute";
import { useSelector } from "react-redux";
import SingleRecipe from "./components/SingleRecipe";
import SingleFeedback from "./components/SingleFeedback";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavigationBar />
      <div className="flex p-0 m-0 max-w-full h-full mx-auto scroll-smooth transition-all">
        <SideBar />
        <Routes>
          <Route
            path="/"
            element={!user ? <LandingPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <SignIn /> : <Navigate to="/home" />}
          />
          <Route
            path="/register"
            element={!user ? <SignUp /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipes"
            element={user ? <ExplorePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipe/:id"
            element={user ? <SingleRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:userName"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={user ? <Notifications /> : <Navigate to="/login" />}
          />
          <Route
            path="/community"
            element={user ? <CommunityHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/explore-community"
            element={user ? <Communities /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-community"
            element={user ? <CreateCommunity /> : <Navigate to="/login" />}
          />
          <Route
            path="/manage-community"
            element={user ? <ManageCommunity /> : <Navigate to="/login" />}
          />
          <Route
            path="community/:communityId"
            element={user ? <CommunityProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/conversations"
            element={user ? <ChatsHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              user ? (
                <ProtectedRoute>
                  <AdminHome />{" "}
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/feedback/:id"
            element={
              user ? (
                <ProtectedRoute>
                  <SingleFeedback />{" "}
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/contact" element={<Contacts />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
