import React from "react";

const RecipeSkeleton = () => {
  return (
    <>
      <article className="w-[90%] sm:w-[80%] max-w-4xl mx-auto  overflow-hidden">
        <div className="flex gap-2 items-start p-4 ">
          <div className="skeleton w-10 rounded-full h-10"></div>
          <div className="flex flex-col flex-1">
            <div className="flex gap-2 items-center"></div>

            <div className="flex flex-col gap-3 w-full max-w-[93%]">
              <div>
                <hgroup className="flex flex-row flex-wrap w-full max-w-full gap-2 sm:gap-3 mb-2">
                  <h1 className="h-3 w-[40%] skeleton"></h1>
                  <h3 className="h-3 w-14 skeleton"></h3>
                </hgroup>

                <div className="flex flex-col flex-nowrap gap-1 mb-4">
                  <span className="block skeleton h-3 w-[90%]"></span>
                  <span className="block skeleton h-3 w-[80%]"></span>
                </div>

                <div className="flex flex-row flex-wrap gap-2 items-center w-full max-w-full h-full mb-2 sm:mb-4">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="skeleton h-3 w-28 mx-2" />
                  ))}
                </div>

                <figure className="skeleton  w-[90%] h-80 mr-auto"></figure>

                <article className="flex flex-col flex-wrap gap-2 mt-2 sm:mt-4">
                  <div className="block rounded-md w-full max-w-[66%] h-full">
                    <span className="block skeleton h-3 w-[33%] mb-2"></span>
                    <div className="flex flex-col flex-nowrap gap-1 w-full">
                      <span className="block skeleton h-3 w-[55%]"></span>
                      <span className="block skeleton h-3 w-[50%]"></span>
                    </div>
                  </div>

                  <div className="block p-1 h-full w-full">
                    <span className="block skeleton h-3 w-[25%] mb-2"></span>
                    <div className="flex flex-col flex-nowrap gap-1">
                      <span className="block skeleton h-3 w-[80%]"></span>
                      <span className="block skeleton h-3 w-[65%]"></span>
                      <span className="block skeleton h-3 w-[70%]"></span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default RecipeSkeleton;
