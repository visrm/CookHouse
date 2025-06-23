const EventSkeleton = () => {
  return (
    <>
      <article className="w-[90%] sm:w-[80%] max-w-3xl mx-auto">
        <div className="relative flex flex-col gap-2 items-start p-4 sm:p-6 md:p-8 rounded">
          {/* Event contents */}
          <div className="flex flex-col flex-nowrap w-full max-w-full h-full gap-1 mt-2 sm:mt-4">
            <h2 className="skeleton h-8 w-[95%] mb-2 rounded"></h2>
            <div className="block h-3 w-[90%] skeleton rounded" />
            <div className="block h-3 w-[80%] skeleton rounded" />
            <div className="block h-3 w-[75%] skeleton rounded" />
            <div className="block h-3 w-[80%] skeleton rounded" />
            <div className="block h-3 w-[75%] skeleton rounded" />
            <div className="block h-3 w-[25%] skeleton rounded" />
          </div>
          <div className="flex flex-col gap-2 h-full w-full max-w-[90%] p-2 mt-2">
            <span className="flex skeleton h-3 items-center w-[65%] rounded"></span>
            <span className="flex skeleton h-3 items-center w-[65%] rounded"></span>
          </div>
        </div>
      </article>
    </>
  );
};

export default EventSkeleton;
