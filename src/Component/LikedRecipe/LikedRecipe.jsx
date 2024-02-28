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
          <img
            effect="blur"
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDcwMnl0YXB2YXNwZmE1amZzN3ZmODVpZGpqb2ZoM2FuODBuczN6aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qQdL532ZANbjy/giphy.gif"
            className="mix-blend-multiply"
            alt=""
          />
        </div>
      ) : (
        <ShowSearchedFood />
      )}
    </div>
  );
};

export default LikedRecipeComp;
