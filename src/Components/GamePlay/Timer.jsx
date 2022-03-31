import React from "react";

function Timer({
  mineCount,
  timerSeconds,
  timerMinutes,
  isTimed,
  timeBombFound,
}) {
  return (
    <div>
      <div className="flex flex-row pt-4">
        <div className="flex w-24 h-12 bg-black text-red-600 justify-center items-center">
          <h1>{mineCount}</h1>
        </div>
        <button className="flex mx-12 w-16 bg-grey justify-center items-center">
          <h1>🙂</h1>
        </button>
        <div
          className={`flex w-24 bg-black ${
            timeBombFound ? "text-green" : "text-red-600"
          } text-red-600 justify-center items-center`}
        >
          <h1>
            {isTimed
              ? `${timerMinutes}:${timerSeconds.toString().padStart(2, "0")}`
              : "-NA-"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Timer;
