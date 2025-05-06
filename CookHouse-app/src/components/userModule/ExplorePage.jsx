import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard";
import useGetAllRecipes from "../Hooks/useGetAllRecipes";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const ExplorePage = () => {
  const [keyword, setKeyword] = useState("");

  useGetAllRecipes(keyword);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("keyword", keyword);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const keywordFromUrl = urlParams.get("keyword");
    if (keywordFromUrl) setKeyword(keywordFromUrl);
  }, [location.search]);

  const { loadingRecipe, allRecipes } = useSelector((store) => store.recipes);

  return (
    <>
      <main className="flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto transition-all duration-300">
        <section className="relative flex flex-col flex-nowrap w-full h-full backdrop-blur">
          <div className="absolute top-[14%] right-[68%] block h-42 w-42 bg-amber-500 rounded-full blur-2xl"></div>
          <article className="relative flex flex-row flex-wrap lg:flex-nowrap h-full w-full max-w-full backdrop-blur">
            <figure className="hidden lg:block w-[33%] min-w-[75%] md:min-w-fit md:max-w-[33%] h-auto z-50">
              <img
                src={"/assets/strawberry-bowl.webp"}
                alt="bowl img"
                className="h-full w-full"
                loading="eager"
              />
            </figure>

            <div className="p-1 sm:p-2 text-left w-full h-full lg:my-auto">
              <div className="z-50 block h-full w-full">
                <p className="flex max-w-[32rem] text-xs text-amber-500 font-mono font-bold tracking-wide">
                  Delicious..
                </p>
                <hgroup>
                  <h1 className="sm:text-7xl text-2xl font-semibold">
                    Recipe for Happiness
                  </h1>
                  <h4 className="sm:text-5xl text-xl mb-4 font-semibold text-amber-500">
                    Unlock Flavor. Explore Recipes.
                  </h4>
                </hgroup>
                <p className="flex sm:py-2 max-w-[32rem] text-sm font-light tracking-wide">
                  Ready to cook something amazing? Dive into our recipe library
                  and find your next culinary adventure.
                </p>
              </div>
            </div>
          </article>
          <article className="block">
            <div>
              <form
                onSubmit={handleSearch}
                className="flex flex-row flex-nowrap gap-2 items-center justify-center w-full"
                id="search-bar-form1"
              >
                <input
                  type="text"
                  name="q"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                  placeholder="Search"
                  className="input input-sm bg-[#fff] focus:outline-none rounded-full"
                />
                <button
                  className="btn btn-sm bg-slate-300 border-none rounded-full"
                  type="submit"
                >
                  <LuSearch className="h-5 w-4" />
                </button>
              </form>
            </div>
            <div>
              {!loadingRecipe && (
                <span className="block w-full p-2 sm:px-3 my-2 md:my-3 font-bold font-mono text-xs text-left">
                  {`Search results (${allRecipes.length})`}
                </span>
              )}
            </div>
          </article>
          <article id="search-results" className="block h-full mt-2 sm:mt-3">
            {loadingRecipe && (
              <div className="block text-center">
                <LoadingSpinner size="lg" />
              </div>
            )}
            {!loadingRecipe && allRecipes.length === 0 && (
              <div className="block text-center text-sm p-2 sm:p-4">
                No recipes found.
              </div>
            )}
            {!loadingRecipe &&
              allRecipes.length > 0 &&
              allRecipes.map((recipe) => {
                return <RecipeCard recipe={recipe} key={recipe?._id} />;
              })}
          </article>
        </section>
      </main>
    </>
  );
};

export default ExplorePage;
