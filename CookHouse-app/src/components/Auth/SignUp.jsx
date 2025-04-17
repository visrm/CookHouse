import { useState } from "react";
import axios from "axios";
import { AUTH_API_END_POINT } from "../../utils/constants.js";
import { NavLink, useNavigate } from "react-router-dom";

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
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <section className="grid fixed top-0 left-0 place-content-center max-w-full w-full min-h-svh md:min-h-dvh">
        <article className="p-3 bg-[#fdfdfd] rounded-xl md:px-6 lg:px-8 text-left">
          <form
            method="POST"
            className="block min-w-72 md:min-h-74 text-base"
            onSubmit={handleSubmit}>
            <h2 className="section-title font-bold">Sign Up</h2>
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerInfo.username}
              maxLength={"20ch"}
              className="border rounded-sm border-black/50 bg-white/50"
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
              className="border rounded-sm border-black/50 bg-white/50"
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
              className="border rounded-sm border-black/50 bg-white/50"
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
              className="border rounded-sm border-black/50 bg-white/50"
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn max-w-fit">
              Sign Up
            </button>
            <span className="inline-block my-2 text-sm text-neutral-600">
              Already have an account?{" "}
              <span>
                <NavLink to="/login" className="text-blue-700 font-semibold cursor-pointer">Log in</NavLink>
              </span>
            </span>
          </form>
        </article>
      </section>
    </>
  );
};

export default SignUp;
