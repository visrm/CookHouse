import InfoSvgIcon from "../InfoSvgIcon";

const LandingFeatures = () => {
  return (
    <>
      <section className="p-4 mb-20 transition-all duration-300">
        <h1 className="section-title font-medium mb-2 md:mb-4">Features</h1>
        <article className="grid gap-2 sm:gap-4 md:gap-x-12 grid-cols-1 sm:grid-cols-2 p-2 md:px-4">
          <article className="feature-grid shadow-lg bg-[#fff] p-2 sm:p-4 rounded-md">
            <span className="block feature-icon">
              <InfoSvgIcon />
            </span>
            <article>
              <h3 className="feature-title font-semibold">
                User Registration & Profiles
              </h3>
              <p className="feature-description text-neutral-600">
                Seamless registration for both home cooks & food enthusiasts,
                specifying dietary preferences, culinary expertise and more.
              </p>
            </article>
          </article>
          <article className="feature-grid shadow-lg bg-[#fff] p-2 sm:p-4 rounded-md">
            <span className="block feature-icon">
              <InfoSvgIcon />
            </span>
            <article>
              <h3 className="feature-title font-semibold">
                Menu Creation & Management
              </h3>
              <p className="feature-description text-neutral-600">
                Intuitive interfaces to create and manage their menus, including
                detailed dishes, setting availability dates and time for meals.
              </p>
            </article>
          </article>
          <article className="feature-grid shadow-lg bg-[#fff] p-2 sm:p-4 rounded-md">
            <span className="block feature-icon">
              <InfoSvgIcon />
            </span>
            <article>
              <h3 className="feature-title font-semibold">
                Search & Filtering
              </h3>
              <p className="feature-description text-neutral-600">
                Advanced search functionalities to find meals based on criteria
                such as dietary restrictions; filters to refine search results.
              </p>
            </article>
          </article>
          <article className="feature-grid shadow-lg bg-[#fff] p-2 sm:p-4 rounded-md">
            <span className="block feature-icon">
              <InfoSvgIcon />
            </span>
            <article>
              <h3 className="feature-title font-semibold">
                Community Building
              </h3>
              <p className="feature-description text-neutral-600">
                Integrated messaging system for communicating alongside
                community forums or blogs for food-related discussions.
              </p>
            </article>
          </article>
          <article className="feature-grid shadow-lg bg-[#fff] p-2 sm:p-4 rounded-md">
            <span className="block feature-icon">
              <InfoSvgIcon />
            </span>
            <article>
              <h3 className="feature-title font-semibold">
                AI Culinary Assistant
              </h3>
              <p className="feature-description text-neutral-600">
                Cooking smarter, not harder. Our AI chatbot is here to answer
                your culinary questions, inspire new creations and much more.
              </p>
            </article>
          </article>
          <article className="feature-grid shadow-lg bg-[#fff] p-2 sm:p-4 rounded-md">
            <span className="block feature-icon">
              <InfoSvgIcon />
            </span>
            <article>
              <h3 className="feature-title font-semibold">Seamless & Intuitive UI</h3>
              <p className="feature-description text-neutral-600">
                Experience cooking and connecting like never before with our
                beautifully designed and intuitive interface. 
              </p>
            </article>
          </article>
        </article>
      </section>
    </>
  );
};

export default LandingFeatures;
