import React, { useState, useEffect } from "react";
// import { Store } from "../DataStore/Datastore";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ShowFoodShimmer from "./ShowFoodShimmer";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ShowFoodByCategory = () => {
  window.scroll(0, 0);
  let [category, setCategory] = useState([]);
  let params = useParams();
  console.log(params);
  useEffect(() => {
    getFoodCategory(params.category);
  }, []);
  let categoryName = "";
  async function getFoodCategory(category) {
    console.log(category);
    categoryName = category;
    let res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    setCategory(res.data.meals);
  }

  return (
    <>
      {category.length == 0 && <ShowFoodShimmer />}
      <div className="categoryFoodContainer">
        {category.map((Food, idx) => {
          return (
            <div key={Food + idx + "xyhk"}>
              <div className="imagebyCategory">
                <LazyLoadImage
                  className="foodIMg"
                  src={Food.strMealThumb}
                  alt=""
                />
              </div>
              <div className="viewDetails">
                <h2>{Food.strMeal}</h2>
                {/* */}
                <button className="viewDetailsBtn">
                  {" "}
                  <Link to={`/food/${params.category}/` + Food.idMeal}>
                    View Details
                  </Link>
                </button>
                {/*  */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowFoodByCategory;
