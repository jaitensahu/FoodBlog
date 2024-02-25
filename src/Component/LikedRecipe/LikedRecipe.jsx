import React, { useContext } from "react";
import ShowSearchedFood from "../Food/ShowSearchedFood";
import { myContext } from "../dataStore/Context";

const LikedRecipeComp = () => {
  let { likedRecipe } = useContext(myContext);
  console.log(likedRecipe.length);
  return (
    <div className="mt-[100px]">
      {likedRecipe.length == 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold">You Haven't Liked Anything...</h1>
        </div>
      ) : (
        <ShowSearchedFood />
      )}
    </div>
  );
};

export default LikedRecipeComp;
