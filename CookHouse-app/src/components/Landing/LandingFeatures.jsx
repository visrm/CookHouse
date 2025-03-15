const LandingFeatures = () => {
  return (
    <>
      <section className="p-4 md:p-8 lg:p-12 xl:p-16">
        <h1 className="section-title">Features</h1>
        <article className="grid gap-2 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 p-1 my-4 lg:my-8">
          <article className="feature-grid">
            <span className="block feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21.3333V16M16 10.6667H16.0134M29.3334 16C29.3334 23.3638 23.3638 29.3333 16 29.3333C8.63622 29.3333 2.66669 23.3638 2.66669 16C2.66669 8.63621 8.63622 2.66667 16 2.66667C23.3638 2.66667 29.3334 8.63621 29.3334 16Z"
                  stroke="#1E1E1E"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
          <article className="feature-grid">
            <span className="block feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21.3333V16M16 10.6667H16.0134M29.3334 16C29.3334 23.3638 23.3638 29.3333 16 29.3333C8.63622 29.3333 2.66669 23.3638 2.66669 16C2.66669 8.63621 8.63622 2.66667 16 2.66667C23.3638 2.66667 29.3334 8.63621 29.3334 16Z"
                  stroke="#1E1E1E"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
          <article className="feature-grid">
            <span className="block feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21.3333V16M16 10.6667H16.0134M29.3334 16C29.3334 23.3638 23.3638 29.3333 16 29.3333C8.63622 29.3333 2.66669 23.3638 2.66669 16C2.66669 8.63621 8.63622 2.66667 16 2.66667C23.3638 2.66667 29.3334 8.63621 29.3334 16Z"
                  stroke="#1E1E1E"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <article>
              <h3 className="feature-title font-semibold">
                Order Placement & Fulfillment
              </h3>
              <p className="feature-description text-neutral-600">
                Secure online ordering system with flexible payment options and
                order tracking & delivery/pickup options.
              </p>
            </article>
          </article>
          <article className="feature-grid">
            <span className="block feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21.3333V16M16 10.6667H16.0134M29.3334 16C29.3334 23.3638 23.3638 29.3333 16 29.3333C8.63622 29.3333 2.66669 23.3638 2.66669 16C2.66669 8.63621 8.63622 2.66667 16 2.66667C23.3638 2.66667 29.3334 8.63621 29.3334 16Z"
                  stroke="#1E1E1E"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
          <article className="feature-grid">
            <span className="block feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 21.3333V16M16 10.6667H16.0134M29.3334 16C29.3334 23.3638 23.3638 29.3333 16 29.3333C8.63622 29.3333 2.66669 23.3638 2.66669 16C2.66669 8.63621 8.63622 2.66667 16 2.66667C23.3638 2.66667 29.3334 8.63621 29.3334 16Z"
                  stroke="#1E1E1E"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
        </article>
      </section>
    </>
  );
};

export default LandingFeatures;
