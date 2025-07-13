import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedRecipeQuery } from "../redux/slices/recipe.slice.js";

const FilterRecipe = () => {
  const [recipe, setRecipe] = useState({ cuisine_type: "", category: "" });

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchedRecipeQuery(""));
    setRecipe({ cuisine_type: "", category: "" });
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex w-full">
        <form
          id="FilterForm"
          className="flex flex-nowrap w-full max-w-full sm:px-4 md:px-6 items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-sm sm:text-base font-semibold text-nowrap sm:px-2">
            Filter Recipes
          </h1>
          <div className="flex flex-row flex-nowrap w-full max-w-full px-2 gap-2 sm:gap-4">
            <div className="flex flex-row flex-nowrap w-full">
              <label htmlFor="cuisine_type" className="text-nowrap">
                Cuisine type:
              </label>
              <select
                className="rounded-md inline-block h-8 min-h-8 w-full px-1 sm:px-2 border focus:outline-none bg-[#fdfdfd] border-slate-300 overflow-hidden"
                name="cuisine_type"
                id="cuisine_type"
                value={recipe.cuisine_type}
                onChange={(e) => {
                  dispatch(setSearchedRecipeQuery(e.target.value));
                  setRecipe({ ...recipe, [e.target.name]: e.target.value });
                }}
              >
                <option value="">None</option>
                <option value="indian">Indian Cuisine</option>
                <option value="italian">Italian Cuisine</option>
                <option value="chinese">Chinese Cuisine</option>
                <option value="french">French Cuisine</option>
                <option value="spanish">Spanish Cuisine</option>
                <option value="middle-eastern">Middle Eastern Cuisine</option>
                <option value="mexican">Mexican Cuisine</option>
                <option value="japanese">Japanese Cuisine</option>
                <option value="korean">Korean Cuisine</option>
                <option value="fusion">Fusion Cuisine</option>
                <option value="haute">Haute Cuisine</option>
                <option value="religious">Religious Cuisine</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-row flex-nowrap w-full">
              <label htmlFor="category">Category:</label>
              <select
                className="rounded-md inline-block h-8 min-h-8 w-full px-1 sm:px-2 border focus:outline-none bg-[#fdfdfd] border-slate-300 overflow-hidden"
                name="category"
                id="category"
                value={recipe.category}
                onChange={(e) => {
                  dispatch(setSearchedRecipeQuery(e.target.value));
                  setRecipe({ ...recipe, [e.target.name]: e.target.value });
                }}
              >
                <option value="">None</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="appetiser">Appetiser</option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="snack">Snack</option>
                <option value="main-course">Main course</option>
                <option value="side-dish">Side dish</option>
                <option value="drinks-beverages">Drinks/Beverages</option>
                <option value="baked-good">Baked goods</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="meat">Meat</option>
                <option value="sea-food">Seafood</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterRecipe;
