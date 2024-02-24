import React from 'react'
import './Foodshimmer.css'
const ShowFoodShimmer = () => {
    let arr = new Array(12)
    arr.fill(1)
    
  return (
    <div className="categoryFoodContainer">
      {arr.map((Food, idx) => {
        return (
          <div className="shimmer shimmer2" key={Food + idx + "abc"}>
            <div className="imagebyCategory"></div>
            <div className="viewDetails"></div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowFoodShimmer
