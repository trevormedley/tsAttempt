import React from "react";
import { useState } from "react";
import BoardIcon from "../../assets/BoardIcon.png";
import Bomb from "../../assets/bomb.png";
import { generateBoard } from "../../testUtils/generateBoard";
import Board from "../GamePlay/Board";
import axios from "axios";

function GameSetup({ userId, userName }) {
  const [difficulty, setDifficulty] = useState();
  const [mineCount, setMineCount] = useState();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [board, setBoard] = useState([]);
  const [boardSettings, setBoardSettings] = useState({
    mineCount: 0,
    boardWidth: 0,
    boardHeight: 0,
    difficulty: difficulty,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimed, setIsTimed] = useState(true);
  const [displayMineCount, setDisplayMineCount] = useState();
  const [bestTime, setBestTime] = useState()
  const [difficultError, setDifficultyError] = useState(false)

  const checkBoxHandler = () => {
    setIsTimed(!isTimed);
  };

  const baseUrl = "http://localhost:5397";
  const boardEndpoint = "/board";

  // Game settings for each difficulty housed in one object
  const difficultySettings = {
    easy: {
      mines: 10,
      width: 10,
      height: 10,
    },
    medium: {
      mines: 40,
      width: 16,
      height: 16,
    },
    hard: {
      mines: 99,
      width: 30,
      height: 16,
    },
  };

  // Object passed to generateBoard function to create a blank board
  const emptyBoardSettings = {
    click: {
      x: 1,
      y: 2,
    },
    options: {
      timed: false,
      difficulty: difficulty,
      mineCount: 0,
      boardWidth: width,
      boardHeight: height,
      customTime: "",
    },
  };

  // Function ran to submit game settings
  const onSubmit = () => {
    if (!difficulty) {
      setDifficultyError(true)
      return
    } else {
      const emptyBoard = generateBoard(emptyBoardSettings);
    setBoard(emptyBoard.board);
    setBoardSettings({
      mineCount: mineCount,
      boardWidth: width,
      boardHeight: height,
      difficulty: difficulty,
    });
    setIsPlaying(true);
    axios.post(`${baseUrl}${boardEndpoint}`, {userId, difficulty}).then((res) => {
      setBestTime(res.data.time);
    });
    }
    
  };

  const handleMineChange = (e) => {
    setMineCount(e.target.value);
    setDisplayMineCount(e.target.value);
  };

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const buttonClickHandler = (e) => {
    setDifficultyError(false)
    setDifficulty(e.target.value);
    setDisplayMineCount(difficultySettings[e.target.value].mines);
    setMineCount(difficultySettings[e.target.value].mines);
    setWidth(difficultySettings[e.target.value].width);
    setHeight(difficultySettings[e.target.value].height);
    setIsTimed(true);
  };

  return (
    <div className="font-press-start">
      {isPlaying ? (
        <div>
          <Board
            boardData={board}
            height={height}
            width={width}
            mineCount={mineCount}
            setMineCount={setMineCount}
            difficulty={difficulty}
            boardSettings={boardSettings}
            boardSettingsHeight={boardSettings.boardHeight}
            boardSettingsWidth={boardSettings.boardWidth}
            boardSettingsMineCount={boardSettings.mineCount}
            setBoard={setBoard}
            setIsPlaying={setIsPlaying}
            isTimed={isTimed}
            displayMineCount={displayMineCount}
            setDisplayMineCount={setDisplayMineCount}
            setWidth={setWidth}
            setHeight={setHeight}
            userId={userId}
            bestTime={bestTime}
            userName={userName}
            setBestTime={setBestTime}
          />
        </div>
      ) : (
        <div>
          <h1 className="text-center text-4xl text-blue">TimeSweeper</h1>
          <div className="flex flex-row justify-center py-8">
            <div
              className="flex flex-row justify-between w-fit"
              role="group"
            ></div>
            <button
              type="button"
              onClick={buttonClickHandler}
              value="easy"
              className="p-4 border-2 border-black hover:bg-gray-100 focus:z-10 focus:bg-black focus:text-white"
            >
              Easy
            </button>
            <button
              type="button"
              onClick={buttonClickHandler}
              value="medium"
              className="p-4 border-2 border-black ml-4 mr-2 hover:bg-gray-100 focus:z-10 focus:bg-black focus:text-white"
            >
              Medium
            </button>
            <button
              type="button"
              onClick={buttonClickHandler}
              value="hard"
              className="p-4 border-2 border-black ml-2 mr-4 hover:bg-gray-100 focus:z-10 focus:bg-black focus:text-white"
            >
              Hard
            </button>
            <button
              type="button"
              onClick={(e) => {
                setDifficulty(e.target.value);
                setDisplayMineCount(
                  <input
                    onBlur={handleMineChange}
                    className="p-4 w-24 text-xs"
                    type="number"
                  />
                );
                setWidth(
                  <input
                    onBlur={handleWidthChange}
                    className="p-4 w-24 text-xs"
                    type="number"
                  />
                );
                setHeight(
                  <input
                    onBlur={handleHeightChange}
                    className="p-4 w-24 text-xs"
                    type="number"
                  />
                );
                setIsTimed(false);
              }}
              value="custom"
              className="p-4 border-2 border-black hover:bg-gray-100 focus:z-10 focus:bg-black focus:text-white"
            >
              Custom
            </button>
          </div>
          <div className="flex flex-row justify-center p-4">
            <div className="flex flex-row items-center">
              <img className="h-8 mr-2" src={BoardIcon} alt="Board Icon" />
              <div>{width}</div>
              <p className="px-2">x</p>
              <div>{height}</div>
            </div>
            <div className="flex flex-row items-center px-8">
              <img className="h-8 mr-2" src={Bomb} alt="Board Icon" />
              <h1>{displayMineCount}</h1>
            </div>
          </div>
          {difficulty !== "custom" ? (
            <div className="flex flex-row justify-center items-center my-6">
              <input
                className="mr-2 checked:bg-blue form-check-input h-5 w-5 rounded-none"
                type="checkbox"
                name="timed"
                id="timed"
                checked={isTimed}
                onChange={checkBoxHandler}
              />
              <label htmlFor="timed">Timed</label>
            </div>
          ) : null}

          <div className="flex flex-row justify-center p-8">
            <button
              onClick={onSubmit}
              className="bg-green p-4 font-press-start text-white hover:text-opacity-75"
            >
              Lets Go
            </button>
          </div>
          <h1>{difficultError ? <p className="text-xs text-center text-red-600">Please Select a Difficulty</p> : null}</h1>
        </div>
      )}
    </div>
  );
}

export default GameSetup;
