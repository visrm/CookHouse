import { useEffect, useState } from "react";
import useGetAllRecipes from "../Hooks/useGetAllRecipes";
import axios from "axios";
import { RECIPES_API_END_POINT } from "../../utils/constants.js";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { LuSearch } from "react-icons/lu";
import { setSearchedRecipeQuery } from "../../redux/slices/recipe.slice.js";
import { useNavigate } from "react-router-dom";

const RecipesTable = (refreshVar) => {
  const [keyword, setKeyword] = useState("");

  useGetAllRecipes(keyword, refreshVar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loadingRecipe, allRecipes } = useSelector((store) => store.recipes);

  useEffect(() => {
    dispatch(setSearchedRecipeQuery(""));
    const urlParams = new URLSearchParams(location.search);
    const keywordFromUrl = urlParams.get("keyword");
    if (keywordFromUrl) setKeyword(keywordFromUrl);
  }, [location.search]);

  const handleSearch = (e) => {
    e.prrecipeDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("keyword", keyword);
  };

  let i = 0;

  const handleDeletion = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to delete the recipe?")) {
        // User clicked OK, proceed with deletion
        const response = await axios.delete(
          `${RECIPES_API_END_POINT}/${recipeId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } else {
        // User clicked Cancel
        toast.error("Deletion cancelled.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="px-2 py-1 h-full w-full max-w-full">
        <article className="block my-2 md:mt-3">
          <div>
            <form
              onSubmit={handleSearch}
              className="flex flex-row flex-nowrap gap-1 items-center justify-center w-full"
              id="evnt-search-bar-form"
            >
              <input
                type="text"
                name="q"
                value={keyword}
                onChange={(e) => {
                  dispatch(setSearchedRecipeQuery(e.target.value.trim()));
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
        <div className="rounded-box border border-base-content/5 bg-base-200 h-full max-w-full">
          <table className="table table-xs text-xs">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>ID</th>
                <th>Community</th>
                <th>Title</th>
                <th>Publisher</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            {loadingRecipe && (
              <tbody className="block text-center">
                <tr>
                  <LoadingSpinner size="lg" />
                </tr>
              </tbody>
            )}
            {!loadingRecipe && allRecipes.length === 0 && (
              <tbody className="flex place-content-center">
                <tr>
                  <td>No recipes found.</td>
                </tr>
              </tbody>
            )}
            <tbody>
              {!loadingRecipe &&
                allRecipes.length > 0 &&
                allRecipes.map((recipe) => {
                  i++;
                  return (
                    <tr key={recipe?._id} className="text-center">
                      <th>{i}</th>
                      <td>{recipe?._id}</td>
                      <td>{recipe?.community?._id || "null"}</td>
                      <td>{recipe?.title}</td>
                      <td>{recipe?.user?.username}</td>
                      <td>{recipe?.createdAt.split("T")[0].trim()}</td>
                      <td>{recipe?.updatedAt.split("T")[0].trim()}</td>
                      <td>
                        <div className="flex justify-end dropdown dropdown-start dropdown-hover mx-2">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm border-0 rounded-full"
                          >
                            <MdMoreVert className="w-fit" />
                          </div>
                          <ul
                            tabIndex={0}
                            className="menu dropdown-content gap-0.5 border-1 border-slate-200 bg-[#fdfdfd] rounded-box z-1 mt-9 w-38 p-0.5 shadow-sm text-xs font-medium"
                          >
                            <li>
                              <button
                                className="btn hover:text-indigo-400 border btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`/recipe/${recipe?._id}`);
                                }}
                              >
                                View Recipe
                              </button>
                            </li>
                            <li>
                              <button
                                className="btn hover:text-red-400 border btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeletion(recipe?._id);
                                }}
                              >
                                Delete Recipe
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default RecipesTable;
