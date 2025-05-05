import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AUTH_API_END_POINT } from "../../utils/constants.js";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/slices/auth.slice.js";
import toast from "react-hot-toast";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log({ ...userInfo, [event.target.name]: event.target.value });
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      dispatch(setLoading(true));
      let loginInfo = {
        email: userInfo.email,
        password: userInfo.password,
      };

      const response = await axios.post(
        `${AUTH_API_END_POINT}/login`,
        loginInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        navigate("/home");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <main>
        <section className="grid fixed top-0 left-0 place-content-center max-w-full w-full min-h-svh md:min-h-dvh bg-[#f0f0f0]">
          <div className="absolute -top-[25%] left-[50%]  amber-gradient rounded-full h-[90%] w-[45%]"></div>
          <div className="absolute top-[15%] left-[25%]  amber-gradient rounded-full h-[21%] w-[10%]"></div>
          <div className="absolute top-[70%] left-[17%]  amber-gradient rounded-full h-[75%] w-[33%]"></div>
          <article className="p-3 glass-morph rounded-xl md:px-6 lg:px-8 text-left">
            <form
              method="POST"
              className="block min-w-72 md:min-h-74 text-base"
              onSubmit={handleSubmit}
            >
              <h2 className="section-title font-bold">Sign In</h2>
              <label htmlFor="email">Email Address :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                className="border rounded-xs btn btn-sm text-base text-left focus:outline-0 w-full backdrop-blur-sm border-black/50 bg-[#fdfdfd]"
                autoComplete="username"
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userInfo.password}
                maxLength={"20ch"}
                className="border rounded-xs btn btn-sm text-base text-left focus:outline-0 w-full backdrop-blur-sm border-black/50 bg-[#fdfdfd]"
                autoComplete="current-password"
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-btn">
                Sign In
              </button>
              <span className="inline-block my-2 text-sm text-neutral-600">
                Create a new account?{" "}
                <span>
                  <NavLink
                    to="/register"
                    className="text-blue-700 font-semibold cursor-pointer"
                  >
                    Register
                  </NavLink>
                </span>
              </span>
            </form>
          </article>
        </section>
      </main>
    </>
  );
};

export default SignIn;
