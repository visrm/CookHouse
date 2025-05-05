import { useState } from "react";
import axios from "axios";
import { AUTH_API_END_POINT } from "../../utils/constants.js";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log({ ...registerInfo, [event.target.name]: event.target.value });
    setRegisterInfo({
      ...registerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let registration = {
        username: registerInfo.username,
        fullname: registerInfo.fullname,
        email: registerInfo.email,
        password: registerInfo.password,
      };

      const response = await axios.post(
        `${AUTH_API_END_POINT}/register`,
        registration,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
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
            <h2 className="section-title font-bold">Sign Up</h2>
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerInfo.username}
              maxLength={"20ch"}
              className="border rounded-xs btn btn-sm text-base text-left w-full backdrop-blur-sm focus:outline-0 border-black/50 bg-[#fdfdfd]"
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <label htmlFor="fullname">Full Name :</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={registerInfo.fullname}
              maxLength={"30ch"}
              className="border rounded-xs btn btn-sm text-base text-left w-full backdrop-blur-sm focus:outline-0 border-black/50 bg-[#fdfdfd]"
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email Address :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerInfo.email}
              autoComplete="username"
              className="border rounded-xs btn btn-sm text-base text-left w-full backdrop-blur-sm focus:outline-0 border-black/50 bg-[#fdfdfd]"
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerInfo.password}
              autoComplete="current-password"
              maxLength={"20ch"}
              className="border rounded-xs btn btn-sm text-base text-left w-full backdrop-blur-sm focus:outline-0 border-black/50 bg-[#fdfdfd]"
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn max-w-fit">
              Sign Up
            </button>
            <span className="inline-block my-2 text-sm text-neutral-600">
              Already have an account?{" "}
              <span>
                <NavLink
                  to="/login"
                  className="text-blue-700 font-semibold cursor-pointer"
                >
                  Log in
                </NavLink>
              </span>
            </span>
          </form>
        </article>
      </section>
    </>
  );
};

export default SignUp;
