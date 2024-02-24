import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
export const myContext = createContext({});

const Context = ({ children }) => {
  console.log("in context");
  const [foodArray, setFoodArray] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState();
  const [likedRecipe, setLikedRecipe] = useState(
    !localStorage.getItem("liked")
      ? []
      : JSON.parse(localStorage.getItem("liked"))
  );

 
  // function to search recipe on user input
  async function getUserQuery(e) {
    // if (e.key == "Enter") {
      try {
        let res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`
        );

        // setFoodArray(res.data.meals);
        setSearchRecipe(res.data.meals);
      } catch (error) {}
     if (e.target.value == "") {
      getDataFromApi();
      setSearchRecipe();
    }
  }

  useEffect(() => {
    getDataFromApi();
  }, []);
  async function getDataFromApi() {
    let response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    setFoodArray(response.data.categories);
  }

  function addToLikedRecipe(recipe, id) {
    if (!localStorage.getItem("liked")) {
      localStorage.setItem("liked", JSON.stringify([]));
    }
    let likedArr = JSON.parse(localStorage.getItem("liked"));
    let updatedArr;

    if (likedArr.some((item) => item.idMeal == id)) {
      console.log("contains");
      updatedArr = likedArr.filter((ele) => {
        return ele.idMeal != id;
      });
    } else {
      updatedArr = [...likedArr, recipe];
    }
    // console.log(updatedArr);

    localStorage.setItem("liked", JSON.stringify(updatedArr));
    setLikedRecipe((prev) => updatedArr);
  }

  return (
    <div>
      <myContext.Provider
        value={{
          getUserQuery,
          foodArray,
          searchRecipe,
          likedRecipe,
          addToLikedRecipe,
          setLikedRecipe,
          setSearchRecipe,
        }}
      >
        {children}
      </myContext.Provider>
    </div>
  );
};

export default Context;
