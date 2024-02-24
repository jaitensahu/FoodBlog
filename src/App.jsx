import { lazy, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Component/Food/Layout";
import Food from "./Component/Food/Food";
import ShowFoodByCategory from "./Component/Food/ShowFoodByCategory";
import ShowMealDetails from "./Component/Food/ShowMealDetails";
import Context from "./Component/dataStore/Context";
// import LikedRecipe from "./Component/LikedRecipe/LikedRecipe";
import LikedRecipeComp from "./Component/LikedRecipe/LikedRecipe";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement:<h1>You Got An error</h1>,
      children: [
        {
          path: "/",
          element: <Food />,
        },
        {
          path: "/food/:category/",
          element: <ShowFoodByCategory />,
        },
        {
          path: "/food/:category/:id",
          element: <ShowMealDetails />,
        },
        {
          path: "/liked-recipes",
          element: <LikedRecipeComp />,
        },
      ],
    },
  ]);

  return (
    <>
      <Context>
        <RouterProvider router={router}></RouterProvider>
      </Context>
    </>
  );
}

export default App;
