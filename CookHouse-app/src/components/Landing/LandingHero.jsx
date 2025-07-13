import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingHero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".stagger-box",
      { opacity: 0, scale: 0.9, x: 100 },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        ease: "power1.inOut",
        duration: 0.75,
        yoyo: true,
        stagger: {
          amount: 0.5,
        },
      }
    );
  }, []);
  return (
    <>
      <section
        className="relative block hero h-[80svh] sm:h-[90vh] w-full max-w-full mb-6 sm:mb-12 overflow-hidden"
        style={{
          backgroundImage: "url('../assets/hero-bg.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute hero-overlay block h-full w-full max-w-full"></div>
        <article className="hero-content min-h-[90svh] sm:h-[90vh] h-full w-full max-w-full z-20">
          <hgroup className="flex flex-col flex-nowrap text-amber-200 w-full max-w-full items-center">
            <h1
              id="hero-title"
              className="stagger-box text-5xl sm:text-7xl lg:text-8xl text-shadow-2xs"
            >
              CookHouse
            </h1>
            <h3 className="stagger-box hero-subtitle text-xl sm:text-3xl lg:text-4xl text-shadow-2xs overflow-hidden">
              Social App For Food Enthusiasts
            </h3>
          </hgroup>
        </article>
      </section>
    </>
  );
};

export default LandingHero;
