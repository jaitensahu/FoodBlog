import React from "react";
import { Link } from "react-router-dom";

const Error = (props) => {
  console.log(props.message);
  return (
    <div className="flex justify-center items-center h-[80vh] flex-col gap-2">
      <h1 className="text-2xl">Error Occured... {props.message}</h1>
      <Link to="/" className="bg-blue-500 text-white px-4 py-1 rounded-md">
        Go Back
      </Link>
    </div>
  );
};

export default Error;
