import React from "react";
import "./Foodshimmer.css";

const FoodShimmer = () => {
  let arr = new Array(14);
  arr.fill(1);

  return (
    <div>
      <div className="foodCardContainer">
        <div className="heroContainer shimmer">
          <div className="heroImage shimmer"></div>
          <div className="searchFood shimmer"></div>
        </div>{" "}
        {arr.map((food,idx) => {
          return (
            <div key={food + idx + "abac"}>
              <div className="image shimmer"></div>
              <h6></h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodShimmer;
