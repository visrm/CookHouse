import { useNavigate } from "react-router-dom";
import Features from "./LandingFeatures";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const About = () => {
  const scrollRef1 = useRef();
  const scrollRef2 = useRef();
  const scrollRef3 = useRef();
  const navigate = useNavigate();

  useGSAP(
    () => {
      const firstBoxes = gsap.utils.toArray(scrollRef1.current.children);
      const secondBoxes = gsap.utils.toArray(scrollRef2.current.children);
      const thirdBoxes = gsap.utils.toArray(scrollRef3.current.children);

      firstBoxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            ease: "power1.inOut",
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: box,
              start: "top, bottom", // when the bottom of the trigger hits the bottom of the viewport
              end: "top 60%", // end after viewport reaches 60% from top
              scrub: true,
            },
          }
        );
      });

      secondBoxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            ease: "power1.inOut",
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: box,
              start: "top, bottom", // when the bottom of the trigger hits the bottom of the viewport
              end: "top 66%", // end after viewport reaches 60% from top
              scrub: true,
            },
          }
        );
      });

      thirdBoxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            ease: "power1.inOut",
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: box,
              start: "top, bottom", // when the bottom of the trigger hits the bottom of the viewport
              end: "top 66%", // end after viewport reaches 60% from top
              scrub: true,
            },
          }
        );
      });
    },
    { scope: { scrollRef1, scrollRef2, scrollRef3 } }
  );

  return (
    <>
      <main className="relative flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 w-full sm:w-[90%]">
          <div className="text-center mb-15">
            <h1 className="text-3xl sm:text-5xl gradient-text text-shadow font-bold mb-3">
              About CookHouse
            </h1>
            <p className="text-lg sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Bringing together passionate cooks, from beginners to
              professionals, in the world's most flavorful social network.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-fredericka font-bold text-center mb-5 sm:mb-8">
              Our Story
            </h2>
            <div className="bg-amber-100 p-5 sm:p-8 rounded-lg shadow-md">
              <div className="md:flex items-center">
                <div className="flex justify-center md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <img
                    src="/assets/cookhouse-about.webp"
                    alt="CookHouse team cooking together"
                    className="rounded-lg shadow-md w-full max-w-full"
                  />
                </div>
                <div ref={scrollRef1} className="scroll-animate-box md:w-1/2">
                  <p className=" text-sm sm:text-base mb-4">
                    CookHouse was born in 2025 when Rahul Murali, a software
                    engineer, shared a meal and a vision: to create a space
                    where cooking knowledge could be democratized and shared
                    across borders.
                  </p>
                  <p className=" text-sm sm:text-base mb-4">
                    What began as a small recipe-sharing forum quickly evolved
                    into a global platform where culinary traditions blend with
                    innovation, and where both amateur cooks and seasoned
                    professionals can grow together.
                  </p>
                  <p className=" text-sm sm:text-base">
                    CookHouse is more than just a social media platform—it's a
                    movement that celebrates the universal language of food and
                    the connections it creates between cultures and people.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mb-20">
            <div className="text-center mb-1 sm:mb-3">
              <h2 className="text-3xl md:text-4xl font-fredericka font-bold">Our Mission</h2>
            </div>
            <div
              ref={scrollRef2}
              className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl sm:text-2xl font-medium mb-4">
                Empowering Culinary Creativity Worldwide
              </h3>
              <p className=" text-sm sm:text-lg mb-6">
                We're on a mission to democratize cooking knowledge, preserve
                culinary traditions, and spark innovation in kitchens around the
                world. By connecting passionate cooks across geographical and
                cultural boundaries, we aim to create a global community where
                food brings people together.
              </p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-4 text-xs sm:text-sm">
                <div className="bg-amber-100 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-amber-800 font-medium">
                  Inclusivity
                </div>
                <div className="bg-amber-100 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-amber-800 font-medium">
                  Sustainability
                </div>
                <div className="bg-amber-100 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-amber-800 font-medium">
                  Education
                </div>
                <div className="bg-amber-100 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-amber-800 font-medium">
                  Cultural Appreciation
                </div>
                <div className="bg-amber-100 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-amber-800 font-medium">
                  Innovation
                </div>
              </div>
            </div>
          </div>

          {/* Features  */}
          <Features />

          {/* Testimonials */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-fredericka font-bold text-center mb-5 sm:mb-8">
              What Our Community Says
            </h2>
            <div ref={scrollRef3} className="grid md:grid-cols-2 gap-6">
              <div className=" bg-white p-6 rounded-lg shadow-md italic">
                <p className="mb-4 text-xs sm:text-sm text-gray-600">
                  "CookHouse transformed my home cooking. I've learned
                  techniques from chefs around the world that I'd never have
                  discovered otherwise. The community is so supportive and
                  inspiring!"
                </p>
                <div className="flex items-center gap-2 max-w-full">
                  <figure className="block w-12 my-auto">
                    <img
                      src={"/assets/sarah-j-profile.webp"}
                      alt="User avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4"
                    />
                  </figure>

                  <div>
                    <p className="font-semibold not-italic">Sarah J.</p>
                    <p className="text-xs sm:text-sm text-gray-500 not-italic">
                      Home Cook, London
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-white p-6 rounded-lg shadow-md italic">
                <p className="mb-4 text-xs sm:text-sm text-gray-600">
                  "As a professional chef, I was skeptical about yet another
                  food platform. But CookHouse is different—it's authentic,
                  educational, and has connected me with ingredients and
                  techniques that have elevated my restaurant's menu."
                </p>
                <div className="flex items-center gap-2 max-w-full">
                  <figure className="block w-12 my-auto">
                    <img
                      src={"/assets/miguel-r-profile.webp"}
                      alt="User avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4"
                    />
                  </figure>

                  <div>
                    <p className="font-semibold not-italic">Miguel R.</p>
                    <p className="text-xs sm:text-sm text-gray-500 not-italic">
                      Executive Chef, Barcelona
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us */}
          <div className="block text-center text-amber-700 bg-amber-100 border border-amber-700 p-6 sm:py-12 sm:px-6 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
              Join Our Culinary Community Today
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl w-full mx-auto">
              Whether you're just starting your cooking journey or you're a
              seasoned professional, ChefConnect has something to offer you.
            </p>
            <div className="flex w-full place-content-center">
              <button
                className="amber-gradient font-bold btn btn-lg text-amber-900 border border-amber-700 rounded-full hover:scale-105 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
