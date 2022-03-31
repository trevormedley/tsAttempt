import React from "react";

function GameOver({
  resetGame,
  backToMenu,
  setDisplayMineCount,
  setWidth,
  setHeight,
  mineCount,
  gameResult,
}) {
  const mainMenuHandler = () => {
    setDisplayMineCount();
    backToMenu();
    setWidth();
    setHeight();
  };

  const resetHandler = () => {
    setDisplayMineCount(mineCount);
    resetGame();
  };

  const rightClickHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div onContextMenu={rightClickHandler} className="backdrop-blur-md bg-white/70 absolute w-3/4 h-3/4 flex flex-col justify-center items-center shadow-xl">
      <h1 className="text-4xl text-red-600 mb-4">😢 Game Over 😞</h1>
      <h1>{gameResult}</h1>
      <div className="mt-8">
        <button
          onClick={mainMenuHandler}
          className="p-4 border-2 border-black mr-4 hover:bg-gray-100 focus:z-10 focus:bg-black focus:text-white"
        >
          Main Menu
        </button>
        <button
          onClick={resetHandler}
          className="p-4 border-2 border-black ml-4 hover:bg-gray-100 focus:z-10 focus:bg-black focus:text-white"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOver;
