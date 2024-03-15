import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
export const myContext = createContext({});
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "../ErrorComponent/Error";

const Context = ({ children }) => {
  const [foodArray, setFoodArray] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState();
  // ---------- state to manage Liked recipe gets current liked data from local storage------------------
  const [likedRecipe, setLikedRecipe] = useState(
    !localStorage.getItem("liked")
      ? []
      : JSON.parse(localStorage.getItem("liked"))
  );

  // -------------Toastify method to show notification--------------
  const notify = (Notification) => {
    if (Notification == "added") {
      toast("🥰 Added to Your Favourites", {
        position: "bottom-center",
      });
    } else if (Notification == "removed") {
      toast("😒 Removed From favourites...", {
        position: "bottom-center",
        className: "foo-bar",
      });
    }
  };

  // function to search recipe on user input
  async function getUserQuery(e) {
    console.log(e.target.value);
    try {
      let res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`
      );
      console.log(res.data.meals);
      if (!res.data.meals) {
        setSearchRecipe([]);
        return 0;
      }
      setSearchRecipe(res.data.meals);
    } catch (error) {
      console.log(error);
    }
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
      notify("removed");
    } else {
      updatedArr = [...likedArr, recipe];
      console.log("calling");
      notify("added");
    }

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
