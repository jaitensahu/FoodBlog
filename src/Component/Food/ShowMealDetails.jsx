import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ShowMealDetails = () => {
  let [meal, setmeal] = useState();
  let param = useParams();
  console.log(param.id);
  useEffect(() => {
    getMealDetailById(param.id);
  }, [param.id]);
  async function getMealDetailById(mealID) {
    // console.log(mealID.data);
    let response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    console.log(response.data.meals[0]);
    setmeal(response.data.meals[0]);
  }
  const tempArr = Array.from({ length: 20 }, () => null);
  console.log(tempArr[0]);
  console.log(meal);
  if (!meal) {
    return <h1>Please wait...</h1>
  }
  return (
    <div className="mealDetails mt-[70px] w-[100%] mx-auto bg-orange-200">
      <div className="w-[60%] mx-auto flex flex-col items-center">
        <h3 className="text-3xl text-center font-semibold underline py-6">
          {meal.strMeal}
        </h3>
        <div className="h-[60vh] w-full overflow-hidden">
          <LazyLoadImage
            src={meal.strMealThumb}
            alt=""
            className=" w-full object-cover"
          />
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
    </div>
  );
};

export default ShowMealDetails;
