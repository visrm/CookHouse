import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../RecipeCard";
import useGetAllRecipes from "../Hooks/useGetAllRecipes";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { MdOutlineRefresh } from "react-icons/md";
import FilterRecipe from "../FilterRecipe";
import { setSearchedRecipeQuery } from "../../redux/slices/recipe.slice.js";
import RecipeSkeleton from "../Skeleton/RecipeSkeleton.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ExplorePage = () => {
  const [item, setItem] = useState("");
  const [homeRefresh, setHomeRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      yoyo: true,
    });

    tl.from(".animate-img", {
      duration: 1,
      xPercent: -150,
      opacity: 0,
      scale: 0.5,
      ease: "expo.inOut",
    });
  }, []);

  useGetAllRecipes("", homeRefresh);
  const { loadingRecipe, allRecipes, searchedRecipeQuery } = useSelector(
    (store) => store.recipes
  );
  const [filterRecipes, setFilterRecipes] = useState(allRecipes);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchedRecipeQuery(item.trim()));
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    setHomeRefresh({});
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const refreshAnimate = isRefreshing ? "loading loading-md" : "";

  useEffect(() => {
    if (searchedRecipeQuery) {
      const filteredRecipes = allRecipes.filter((recipe) => {
        return (
          recipe?.title
            .toLowerCase()
            .includes(searchedRecipeQuery.toLowerCase()) ||
          recipe?.ingredients
            .toString()
            .toLowerCase()
            .includes(searchedRecipeQuery.toLowerCase()) ||
          recipe?.category
            .toLowerCase()
            .includes(searchedRecipeQuery.toLowerCase()) ||
          recipe?.cuisine_type
            .toLowerCase()
            .includes(searchedRecipeQuery.toLowerCase())
        );
      });
      setFilterRecipes(filteredRecipes);
    } else {
      setFilterRecipes(allRecipes);
    }
  }, [allRecipes, searchedRecipeQuery]);

  return (
    <>
      <main className="flex flex-col flex-nowrap max-w-6xl sm:max-w-full h-full w-full min-h-[90svh] md:min-h-screen mx-auto">
        <section className="relative flex flex-col flex-nowrap w-full h-full backdrop-blur">
          <div className="relative block h-full min-h-full w-full max-w-full">
            <div className="absolute top-[20%] right-[68%] hidden lg:block h-42 w-42 bg-amber-500 rounded-full blur-2xl"></div>
            <article className="relative flex flex-row flex-wrap lg:flex-nowrap h-full w-full max-w-full backdrop-blur">
              <figure
                id="bowl-img"
                className="hidden lg:block w-[33%] min-w-fit md:max-w-[33%] h-auto rounded-full z-50"
              >
                <img
                  src={"/assets/strawberry-bowl.webp"}
                  alt="bowl img"
                  className="animate-img h-full w-full max-w-full"
                  loading="eager"
                />
              </figure>

              <div
                id="explore-recipe-hero"
                className="block p-1 sm:p-2 text-left w-full h-full lg:my-auto ml-2"
              >
                <div className="z-50 block h-full w-full">
                  <p className="animate-class flex max-w-[32rem] text-xs text-amber-500 font-mono font-bold tracking-wide">
                    Delicious..
                  </p>
                  <hgroup>
                    <h1 className="animate-class md:text-7xl sm:text-5xl text-3xl font-semibold">
                      Recipe for Happiness
                    </h1>
                    <h4 className="animate-class md:text-5xl sm:text-3xl text-2xl mb-4 font-semibold text-amber-500">
                      Unlock Flavor. Explore Recipes.
                    </h4>
                  </hgroup>
                  <p className="animate-class flex sm:py-2 max-w-[32rem] text-sm font-light tracking-wide">
                    Ready to cook something amazing? Dive into our recipe
                    library and find your next culinary adventure.
                  </p>
                </div>
              </div>
            </article>
          </div>
          <article className="block w-full max-w-full p-2 sm:px-4">
            <div className="flex flex-nowrap flex-col sm:flex-row  gap-y-2 w-full max-w-full">
              <form
                onSubmit={handleSearch}
                className="flex flex-row flex-nowrap gap-2 items-center justify-center h-full w-full sm:w-[75%]"
                id="search-bar-form1"
              >
                <input
                  type="text"
                  name="q"
                  value={item}
                  onChange={(e) => {
                    setItem(e.target.value);
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
              <FilterRecipe />
            </div>
            <div>
              <div className="relative flex flex-row flex-nowrap w-full max-w-full">
                {loadingRecipe && (
                  <span className="block w-36 h-3 ml-2 mt-4 skeleton rounded-sm"></span>
                )}
                {!loadingRecipe && (
                  <span className="block w-full p-2 sm:px-3 my-2 md:my-3 font-bold font-mono text-xs text-left">
                    {`Search results (${filterRecipes.length})`}
                  </span>
                )}
                <div
                  className="absolute top-2 right-2 bg-[#fafafa] my-auto tooltip tooltip-left"
                  data-tip="Refresh"
                >
                  <button
                    className="flex items-center rounded-full w-fit hover:text-indigo-600 p-1.5 sm:mr-2"
                    onClick={handleRefresh}
                  >
                    <MdOutlineRefresh
                      className={`h-5 w-5 ${refreshAnimate} transition-all duration-300`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </article>
          <section>
            <article
              id="search-results"
              className="flex flex-col gap-2 sm:gap-3 lg:gap-4 h-full w-full mt-2 sm:mt-3 py-2"
            >
              {loadingRecipe && (
                <div className="flex flex-col flex-nowrap text-center gap-2 sm:gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <RecipeSkeleton key={idx} />
                  ))}
                </div>
              )}
              {!loadingRecipe && filterRecipes.length === 0 && (
                <div className="block text-center text-sm p-2 sm:p-4">
                  No recipes found.
                </div>
              )}
              {!loadingRecipe &&
                filterRecipes.length > 0 &&
                filterRecipes.map((recipe) => {
                  return <RecipeCard recipe={recipe} key={recipe?._id} />;
                })}
            </article>
          </section>
        </section>
      </main>
    </>
  );
};

export default ExplorePage;
