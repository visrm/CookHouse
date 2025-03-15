import NavBar from "../NavigationBar";

const SignUp = () => {
  return (
    <>
      <NavBar />
      <section className="grid fixed top-0 left-0 place-content-center max-w-full w-full min-h-svh md:min-h-dvh">
        <article className="p-2 md:p-4 text-left">
          <form method="POST" className="block min-w-72 md:min-h-74 text-base">
            <h2 className="section-title font-bold">Sign Up</h2>
            <label htmlFor="Username">Username :</label>
            <input
              type="text"
              id="Username"
              name="Username"
              maxLength={"20ch"}
              className="border rounded-sm border-black/50 bg-white/50"
            />
            <label htmlFor="Email">Email Address :</label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="border rounded-sm border-black/50 bg-white/50"
            />
            <label htmlFor="PhoneNumber">Phone Number :</label>
            <input
              type="text"
              id="PhoneNumber"
              name="PhoneNumber"
              maxLength={"15ch"}
              className="border rounded-sm border-black/50 bg-white/50"
            />
            <label htmlFor="Password">Password :</label>
            <input
              type="password"
              id="Password"
              name="Password"
              maxLength={"20ch"}
              className="border rounded-sm border-black/50 bg-white/50"
            />
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </article>
      </section>
    </>
  );
};

export default SignUp;
