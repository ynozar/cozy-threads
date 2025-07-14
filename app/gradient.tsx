import React from "react";

function Gradient({
  darkGradient,
  lightGradient,
}: {
  darkGradient: string;
  lightGradient: string;
}) {
  return (
    <>
      <div
        className={`absolute w-full h-full dark:opacity-0 opacity-100 ${lightGradient}`}
        style={{ transition: "opacity .5s ease-in-out" }}
      ></div>
      <div
        className={`absolute w-full h-full opacity-0 dark:opacity-100 ${darkGradient}`}
        style={{ transition: "opacity .5s ease-in-out" }}
      ></div>
    </>
  );
}

export default Gradient;
