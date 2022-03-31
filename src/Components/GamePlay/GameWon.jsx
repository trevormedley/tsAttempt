import React from "react";

function GameWon({
  backToMenu,
  resetGame,
  setDisplayMineCount,
  setWidth,
  setHeight,
  mineCount,
  seconds,
  minutes,
  resultData,
  difficulty
}) {
  const mainMenuHandler = () => {
    setDisplayMineCount();
    backToMenu();
    setWidth();
    setHeight();
  };

  const resetHandler = () => {
    resetGame();
    setDisplayMineCount(mineCount);
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
  };

  const displayTime = (data) => {
    const minutes = Math.floor(data / 60);
    const seconds = (data - minutes * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  

  return (
    <div
      onContextMenu={rightClickHandler}
      className="backdrop-blur-md bg-white/70 absolute w-3/4 h-3/4 flex flex-col justify-center items-center shadow-xl"
    >
      <h1 className="text-4xl text-green mb-5">You Win!!!</h1>
      <h2 className="text-s mb-4 text-black/50">Difficulty: {difficulty.toUpperCase()}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/75 w-32 h-24 flex flex-col justify-center items-center">
          <p className="text-xs mb-2">Time</p>
          <p>{`${minutes}:${seconds.toString().padStart(2, "0")}`}</p>
        </div>
        <div className="bg-white/75 w-32 h-24 flex flex-col justify-center items-center">
          <p className="text-xs mb-2">Best</p>
          <p>{displayTime(resultData.bestTime)}</p>
        </div>
        <div className="bg-white/75 w-32 h-24 flex flex-col justify-center items-center">
          <p className="text-xs mb-2">Win Pct</p>
          <p>{`${Math.floor(resultData.winPercent * 100)}%`}</p>
        </div>
      </div>
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

export default GameWon;
