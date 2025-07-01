const CommunityCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center p-2 sm:p-3 mx-auto md:p-6 lg:p-8 w-full max-w-[95%] overflow-hidden">
        <div className="flex flex-nowrap gap-2 sm:gap-3 w-full max-w-full h-full min-h-fit">
          <div className="avatar h-24 inline-flex">
            <div className="skeleton w-24 rounded-full "></div>
          </div>

          <div className="flex flex-col flex-nowrap h-full w-full max-w-[75%] gap-1 my-auto">
            <p className="skeleton h-3 w-[33%]"></p>

            <p className="skeleton h-3 w-[95%]"></p>

            <div className="flex flex-col flex-nowrap gap-0.5">
              <p className="skeleton h-3 w-28"></p>
              <p className="skeleton h-3 w-22"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityCardSkeleton;
