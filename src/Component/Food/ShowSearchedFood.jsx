import React, { lazy, useContext, useEffect } from "react";
import { myContext } from "../dataStore/Context";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import { fadeIn } from "../Transitions/AllTransitions";

const ShowSearchedFood = () => {
  let { searchRecipe, likedRecipe, addToLikedRecipe, setSearchRecipe } =
    useContext(myContext);
  let params = useLocation();
  useEffect(() => {
    if (params.pathname == "/liked-recipes") {
      setSearchRecipe([...likedRecipe]);
    } else if (searchRecipe.length == 0) {
      setSearchRecipe();
    }
  }, [likedRecipe, params.pathname]);

  console.log(searchRecipe);
  if (!searchRecipe) {
    return <h1>Please Wait...</h1>;
  }

  return (
    <div className="w-screen max-w-[1280px] mx-auto flex flex-col gap-4">
      {searchRecipe.length != 0 ? (
        searchRecipe.map((ele, idx) => {
          return (
            <div
              className="flex rounded-2xl  bg-orange-400 border h-[120px]  pr-5"
              key={idx + "absd"}
            >
              <div>
                <img
                  src={ele.strMealThumb}
                  alt=""
                  className="w-[100px] h-[100px] object-cover rounded-lg"
                  style={{ width: "200px" }}
                />
              </div>
              <div className="w-[90%] pl-5 py-2">
                <h3 className="text-3xl font-semibold">{ele.strMeal}</h3>
                <div className="flex justify-between">
                  <div className="text-xl font-semibold">
                    <p>{ele.strArea}</p>
                    <p>{ele.strCategory}</p>
                  </div>
                  <div className="flex flex-col item-end  gap-1 text-md text-white font-semibold">
                    <div className="flex gap-1 items-center">
                      <a
                        className="bg-blue-700 text-center px-[14px] py-1 rounded-md"
                        href={ele.strSource}
                      >
                        Read
                      </a>
                      <a
                        className="bg-blue-700 text-center px-[14px] py-1 rounded-md"
                        href={ele.strYoutube}
                      >
                        Watch
                      </a>
                      <button className="bg-blue-700 py-1 px-3 rounded-md">
                        <Link to={`/food/${ele.strCategory}/` + ele.idMeal}>
                          View Details
                        </Link>
                      </button>
                    </div>
                    <div
                      className="flex justify-end"
                      onClick={() => addToLikedRecipe(ele, ele.idMeal)}
                    >
                      {likedRecipe.some((item) => ele.idMeal == item.idMeal) ? (
                        <FaHeart
                          style={{
                            color: "red",
                            fontSize: "28px",
                          }}
                        />
                      ) : (
                        <CiHeart style={{ color: "black", fontSize: "32px" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center flex-col items-center ">
          <h1 className="text-3xl">No Food Found</h1>
          <p>Try Searching :- Pizza, Burger, pasta</p>
        </div>
      )}
      <ToastContainer hideProgressBar transition={fadeIn} autoClose={500} />
    </div>
  );
};

export default ShowSearchedFood;
