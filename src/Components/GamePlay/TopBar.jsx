import React from "react";

function TopBar({ setIsPlaying, setDisplayMineCount, setWidth, setHeight }) {

  const exitHandler = () => {
    setDisplayMineCount()
    setWidth()
    setHeight()
    setIsPlaying(false)
  }
  return (
    <div className="flex flex-row items-center py-4 bg-blue text-xs text-white text-center rounded-t-lg">
      <button onClick={exitHandler} className="flex flex-row justify-center items-center py-2 px-3 mx-4 bg-red-600 rounded-md">
        <h1 className="w-full text-center">X</h1>
      </button>
      <h1>TimeSweeper</h1>
    </div>
  );
}

export default TopBar;
