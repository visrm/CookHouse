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
      <main className="flex flex-col flex-nowrap max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto">
        <section className="flex flex-col flex-nowrap gap-2 w-full h-full">
          <article className="block mt-2 md:mt-3">
            <div>
              <form
                onSubmit={handleSearch}
                className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full"
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
                  className="input input-sm bg-[#fdfdfd] focus:outline-none rounded-full"
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
                <span className="block w-full p-2 sm:px-3 font-bold font-mono text-xs text-left">
                  {`Search results ( ${allRecipes.length} )`}
                </span>
              )}
            </div>
          </article>
          <article id="search-results" className="block">
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
