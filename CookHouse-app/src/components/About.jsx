import { LuUsers, LuUtensils, LuBookOpen, LuGlobe } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="relative flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 w-[90%]">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              About CookHouse
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing together passionate cooks, from beginners to
              professionals, in the world's most flavorful social network.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
            <div className="bg-amber-50 p-8 rounded-lg shadow-md">
              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <img
                    src="/api/placeholder/500/400"
                    alt="CookHouse team cooking together"
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="text-base mb-4">
                    CookHouse was born in 2025 when Rahul Murali, a software
                    engineer, shared a meal and a vision: to create a space
                    where cooking knowledge could be democratized and shared
                    across borders.
                  </p>
                  <p className="text-base mb-4">
                    What began as a small recipe-sharing forum quickly evolved
                    into a global platform where culinary traditions blend with
                    innovation, and where both amateur cooks and seasoned
                    professionals can grow together.
                  </p>
                  <p className="text-base">
                    Today, CookHouse is more than just a social media
                    platform—it's a movement that celebrates the universal
                    language of food and the connections it creates between
                    cultures and people.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Empowering Culinary Creativity Worldwide
              </h3>
              <p className="text-lg mb-6">
                We're on a mission to democratize cooking knowledge, preserve
                culinary traditions, and spark innovation in kitchens around the
                world. By connecting passionate cooks across geographical and
                cultural boundaries, we aim to create a global community where
                food brings people together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
                  Inclusivity
                </div>
                <div className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
                  Sustainability
                </div>
                <div className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
                  Education
                </div>
                <div className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
                  Cultural Appreciation
                </div>
                <div className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
                  Innovation
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-8">
              What Our Community Says
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md italic">
                <p className="mb-4 text-gray-600">
                  "CookHouse transformed my home cooking. I've learned
                  techniques from chefs around the world that I'd never have
                  discovered otherwise. The community is so supportive and
                  inspiring!"
                </p>
                <div className="flex items-center">
                  <img
                    src="/api/placeholder/50/50"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold not-italic">Sarah J.</p>
                    <p className="text-sm text-gray-500 not-italic">
                      Home Cook, London
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md italic">
                <p className="mb-4 text-gray-600">
                  "As a professional chef, I was skeptical about yet another
                  food platform. But CookHouse is different—it's authentic,
                  educational, and has connected me with ingredients and
                  techniques that have elevated my restaurant's menu."
                </p>
                <div className="flex items-center">
                  <img
                    src="/api/placeholder/50/50"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold not-italic">Miguel R.</p>
                    <p className="text-sm text-gray-500 not-italic">
                      Executive Chef, Barcelona
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us */}
          <div className="block text-center text-amber-700 bg-amber-100 border border-amber-700 py-12 px-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Culinary Community Today
            </h2>
            <p className="text-xl mb-8 max-w-3xl w-full mx-auto">
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
