import React, { useState, useRef, useEffect } from "react";
import DifficultyScores from "./DifficultyScores";
import axios from "axios";

function HighScores({ userId }) {
  const [isActive, setIsActive] = useState("user");
  const isMounted = useRef(true);
  const [leaderBoard, setLeaderBoard] = useState({
    easy: [],
    medium: [],
    hard: [],
  });

  const baseUrl = "https://timesweeper-api-v1.azurewebsites.net"
  const recordsEndpoint = "/records";

  useEffect(() => {
    axios
      .post(`${baseUrl}${recordsEndpoint}`, {
        userId: userId,
        difficulty: "easy",
      })
      .then((res) => {
        if (isMounted.current) {
          console.log(res);
          setLeaderBoard({
            easy: res.data.user.easy,
            medium: res.data.user.medium,
            hard: res.data.user.hard,
          });
        }
      });
    return () => (isMounted.current = false);
  }, []);

  const userClickHandler = () => {
    setIsActive("user");
    axios
      .post(`${baseUrl}${recordsEndpoint}`, {
        userId: userId,
        difficulty: "easy",
      })
      .then((res) => {
        setLeaderBoard({
          easy: res.data.user.easy,
          medium: res.data.user.medium,
          hard: res.data.user.hard,
        });
      });
  };

  const globalClickHandler = () => {
    setIsActive("global");
    axios
      .post(`${baseUrl}${recordsEndpoint}`, {
        userId: userId,
        difficulty: "easy",
      })
      .then((res) => {
        setLeaderBoard({
          easy: res.data.global.easy,
          medium: res.data.global.medium,
          hard: res.data.global.hard,
        });
      });
  };

  return (
    <div className="absolute font-press-start flex flex-col justify-center items-center backdrop-blur-lg bg-white/80 h-3/4 w-5/6 p-12">
      <h1 className="text-blue text-4xl">Leader Board</h1>
      <div className="my-8 text-xs">
        <button
          onClick={userClickHandler}
          className={`p-4 ${
            isActive === "user" ? "bg-blue text-white" : "bg-grey/50"
          }  mr-2 hover:bg-blue hover:text-white`}
        >
          User
        </button>
        <button
          onClick={globalClickHandler}
          className={`p-4 ${
            isActive === "global" ? "bg-blue text-white" : "bg-grey/50"
          }  mr-2 hover:bg-blue hover:text-white`}
        >
          Global
        </button>
      </div>
      <div className="grid grid-cols-3 gap-8 h-full w-full">
        <DifficultyScores difficulty={"Easy"} leaderBoard={leaderBoard.easy} />
        <DifficultyScores
          difficulty={"Medium"}
          leaderBoard={leaderBoard.medium}
        />
        <DifficultyScores difficulty={"Hard"} leaderBoard={leaderBoard.hard} />
      </div>
    </div>
  );
}

export default HighScores;
