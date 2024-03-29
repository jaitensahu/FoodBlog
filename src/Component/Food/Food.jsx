import React, { useContext } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Food.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodShimmer from "./FoodShimmer";
import { myContext } from "../dataStore/Context";
import ShowMealDetails from "./ShowMealDetails";
import ShowSearchedFood from "./ShowSearchedFood";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Restaurants = () => {
  let { getUserQuery, foodArray, searchRecipe } = useContext(myContext);

  // if (foodArray.length == 0) {
  //   // return <FoodShimmer />;
  // }
 

  return (
    <>
      <div className="foodCardContainer bg-orange-200 pb-10">
        <div className="heroContainer">
          <div className="heroImage">
            <LazyLoadImage
              effect="blur"
              src="https://www.fabhotels.com/blog/wp-content/uploads/2022/07/1400x600-Food-Banner.jpg"
              alt=""
            />
          </div>
          <div className="searchFood  rounded-[50px] px-4 py-2">
            <input
              type="text"
              placeholder="Search Recipe..."
              className=""
              onKeyDown={getUserQuery}
            />
            <FaSearch />
          </div>
        </div>{" "}
        <div className="w-full">
          <h1 className="text-3xl max-w-[1280px] mx-auto font-bold py-2">
            {!searchRecipe ? "Categories" : "Search Result"}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 max-w-[1280px] mx-auto">
            {searchRecipe ? (
              <ShowSearchedFood />
            ) : (
              foodArray.map((food) => {
                return (
                  <Link to={"/food/" + food.strCategory} key={food.idCategory}>
                    <div className="foodCard" id={food.idCategory}>
                      <div className="image">
                        <LazyLoadImage
                          effect="blur"
                          src={food.strCategoryThumb}
                          alt=""
                        />
                      </div>
                      <h6 className="categories">{food.strCategory}</h6>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
