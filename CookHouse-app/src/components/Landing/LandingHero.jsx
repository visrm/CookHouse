const LandingHero = () => {
  return (
    <>
      <section className="relative block hero h-[90vh] mb-12" style={{backgroundImage: "url('../assets/hero-bg.jpg')", backgroundAttachment: "fixed"}}>
        <div className="absolute hero-overlay block h-full w-full max-w-full"></div>
        <article className="hero-content min-h-[90vh] h-full w-full max-w-full z-20">
          <hgroup className="flex flex-col flex-nowrap text-amber-200">
            <h1 className="hero-title text-shadow-2xs">CookHouse</h1>
            <h3 className="hero-subtitle text-shadow-2xs">
              Social App For Food Enthusiasts
            </h3>
          </hgroup>
        </article>
      </section>
    </>
  );
};

export default LandingHero;
