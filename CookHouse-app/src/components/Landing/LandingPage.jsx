import Hero from "./LandingHero";
import Features from "./LandingFeatures";

const LandingPage = () => {
  return (
    <>
      <main className="flex flex-col flex-nowrap w-full h-full max-w-full min-h-screen">
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default LandingPage;
