import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myContext } from "../dataStore/Context";

const Header = () => {
  let { likedRecipe } = useContext(myContext);
  return (
    <div className="flex justify-between mx-auto py-2 items-center  z-10 w-full bg-orange-200 shadow-xl px-4 top-0">
      <Link to="/">
        {" "}
        <img src={logo} alt="" className="w-14" />
      </Link>
      <h1 className="text-4xl font-bold">Recipe Finder Application</h1>
      <div className="relative">
        <Link
          to="/liked-recipes"
          className="flex items-center gap-3 bg-orange-700 text-white px-4 py-2 rounded-md"
        >
          Liked
          <FaHeart />
        </Link>
        <p className="absolute top-[-13px] bg-orange-300 px-2 rounded-full right-[-10px] text-xl font-bold text-black">
          {likedRecipe.length}
        </p>
      </div>
    </div>
  );
};

export default Header;
