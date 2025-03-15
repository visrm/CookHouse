import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing/LandingPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signin" element={<SignIn/>}/>
        <Route path="/auth/register" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
