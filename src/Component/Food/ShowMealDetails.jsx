import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Error from "../ErrorComponent/Error";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Loader from "./Loader";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { myContext } from "../dataStore/Context";
import { IconContext } from "react-icons";
import { ToastContainer } from "react-toastify";
import { fadeIn } from "../Transitions/AllTransitions";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShowMealDetails = () => {
  let [meal, setmeal] = useState();
  let { addToLikedRecipe, likedRecipe } = useContext(myContext);
  let param = useParams();

  useEffect(() => {
    getMealDetailById(param.id);
  }, [param.id]);
  
  // Show detail of the meal after fetching data from API ----------------
  async function getMealDetailById(mealID) {
    try {
      let response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
      );
      setmeal(response.data.meals[0]);
    } catch (error) {
      setmeal(1);
      console.error(error);
    }
  }
  const tempArr = Array.from({ length: 20 }, () => null);

  if (!meal) {
    return <Loader />;
  } else if (meal == 1) {
    return <Error message={"Invalid Route"} />;
  }
  return (
    <div className="mealDetails  w-[100%] mx-auto bg-orange-200">
      <div className="w-[60%] mx-auto flex flex-col items-center">
        <h3 className="text-3xl text-center font-semibold underline py-6">
          {meal.strMeal}
        </h3>
        <div className="h-[60vh] w-full overflow-hidden detailpageImage">
          <LazyLoadImage
            effect="blur"
            src={meal.strMealThumb}
            alt=""
            className=" w-full object-cover mx-auto"
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            className=" flex items-center text-xl"
            onClick={() => addToLikedRecipe(meal, meal.idMeal)}
          >
            <IconContext.Provider value={{ size: "24px", color: "red" }}>
              {" "}
              {likedRecipe.some((ele) => meal.idMeal == ele.idMeal) ? (
                <FaHeart />
              ) : (
                <CiHeart />
              )}
            </IconContext.Provider>
            Add to Favourite
          </button>
        </div>
        <div className="w-full">
          <div>
            <h1 className="text-xl font-semibold underline py-3">
              INGREDIENTS:
            </h1>
            <table className="border border-collapse border-black w-full">
              <tbody className="border border-black">
                <tr>
                  <th>S.No.</th>
                  <th>Ingredients</th>
                  <th>Quantity</th>
                </tr>
                {tempArr.map((ele, idx) => {
                  if (meal["strIngredient" + (idx + 1)] != "")
                    return (
                      <tr className="border border-black ">
                        <td className="w-[10%] text-center">{idx + 1}</td>
                        <td className="border border-black px-2">
                          {meal["strIngredient" + (idx + 1)]}
                        </td>
                        <td className="border border-black px-2">
                          {meal["strMeasure" + (idx + 1)]}
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
          <div className="py-10">
            <h1 className="text-xl font-semibold underline py-3">
              INSTRUCTION:
            </h1>
            <p>{meal.strInstructions}</p>
          </div>
          <iframe
            className="mb-10"
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${
              meal.strYoutube.split("=")[1]
            }`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <ToastContainer hideProgressBar transition={fadeIn} autoClose={500} />
    </div>
  );
};

export default ShowMealDetails;
