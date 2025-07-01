const PostSkeleton = () => {
  return (
    <>
      <article className="w-[90%] sm:w-[80%] mx-auto overflow-hidden">
        <div className="flex gap-2 items-start p-4">
          <div className="skeleton rounded-full w-10 h-10"></div>
          <div className="flex flex-col flex-nowrap gap-0.5 w-full max-w-full">
            <div className="skeleton w-[18%] h-3"></div>
            <div className="skeleton w-[12%] h-3"></div>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap w-full h-full gap-0.5 ml-4 mb-2 sm:mb-4">
            <div className="skeleton w-[80%] h-3"></div>
            <div className="skeleton w-[75%] h-3"></div>
            <div className="skeleton w-[60%] h-3"></div>
        </div>
        <div className="skeleton w-[90%] h-90 ml-4"></div>
      </article>
    </>
  );
};

export default PostSkeleton;
