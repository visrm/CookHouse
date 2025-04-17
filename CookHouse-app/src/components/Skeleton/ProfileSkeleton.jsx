const ProfileSkeleton = () => {
  return (
    <>
      <section className="flex flex-col flex-nowrap flex-[4_4_0] gap-1 max-w-6xl md:max-w-full bg-transparent md:max-h-[50%] transition-all duration-300">
        <div className="relative block h-fit">
          <div className="skeleton h-36 sm:h-40 md:h-56 w-full rounded-none"></div>
          {/* User Avatar */}
          <div className="avatar skeleton rounded-full absolute block left-4 -bottom-16 bg-blend-luminosity">
            <div className="relative w-28 sm:w-28 md:w-36"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-4 w-full">
          <span className="grid gap-y-1 mt-1 col-start-2 sm:col-start-2 col-span-2">
            <span className="skeleton w-[50%] md:w-[45%] h-5 rounded-none"></span>
            <h1 className="flex skeleton w-[33%] h-3 rounded-sm"></h1>{" "}
            <ul className="flex mt-1 sm:mt-2 md:mt-3 list-none gap-2 md:gap-3 ">
              <li className="skeleton w-[15%] lg:w-20 h-3 "></li>
              <li className="skeleton w-[15%] lg:w-20 h-3 "></li>
            </ul>
          </span>
        </div>{" "}
      </section>
    </>
  );
};

export default ProfileSkeleton;
