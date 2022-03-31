import React from "react";
import Record from "./Record";

function DifficultyScores({ difficulty, leaderBoard }) {
  return (
    <div className="bg-white border-4 border-black/1 hover:border-black h-full p-8">
      <h1 className="mb-4">{difficulty}</h1>
      {leaderBoard.map((item, index) => (
        <Record userName={item.userName} time={item.time} index={index}/>
      ))}
    </div>
  );
}

export default DifficultyScores;
