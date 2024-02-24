import React, { useContext } from "react";
import ShowSearchedFood from "../Food/ShowSearchedFood";
import { myContext } from "../dataStore/Context";

const LikedRecipeComp = () => {
  let { likedRecipe } = useContext(myContext);
  console.log(likedRecipe.length);
  return (
    <div className="mt-[100px]">
          {likedRecipe.length == 0?
              <h1>You Haven't Liked Anything</h1>:< ShowSearchedFood />
      }
    </div>
  );
};

export default LikedRecipeComp;
