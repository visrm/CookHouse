import Hero from "./LandingHero";
import About from "./About"

const LandingPage = () => {
  return (
    <>
      <main className="flex flex-col flex-nowrap w-full h-full max-w-full min-h-screen">
        <Hero />
        <About />
      </main>
    </>
  );
};

export default LandingPage;
