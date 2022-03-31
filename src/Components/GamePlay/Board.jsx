import React, { useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { generateBoard } from "../../testUtils/generateBoard";
import { floodFill, findByXY, isAdjacent } from "../../testUtils/floodFill";
import Timer from "./Timer";
import TopBar from "./TopBar";
import { useStopwatch, useTimer } from "react-timer-hook";
import GameOver from "./GameOver";
import GameWon from "./GameWon";
import axios from "axios";
import { playExplosion, playWinChime } from "../../assets/Sound/Howler";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.boardWidth}, 1fr);
  grid-template-rows: (${(props) => props.boardHeight}, 1fr);
`;

function Board({
  boardData,
  boardSettings,
  height,
  width,
  difficulty,
  mineCount,
  setBoard,
  setIsPlaying,
  isTimed,
  displayMineCount,
  setDisplayMineCount,
  setWidth,
  setHeight,
  userId,
  bestTime,
  userName,
  setBestTime,
}) {
  const [firstClick, setFirstClick] = useState(true);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [gameWonModal, setGameWonModal] = useState(false);
  const [gameResult, setGameResult] = useState();
  const [timeBombFound, setTimeBombFound] = useState(false);
  const [resultData, setResultData] = useState({
    bestTime: bestTime,
    difficulty: "",
    userId: "",
    userName: "",
    winPercent: 0,
  });
  const [restrictClick, setRestrictClick] = useState(false)

  const baseUrl = "https://timesweeper-api-v1.azurewebsites.net";
  const recordsEndpoint = "/records";
  const resultEndpoint = "/result";

  const resetGame = () => {
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
    const emptyBoard = generateBoard(emptyBoardSettings);
    setBoard(emptyBoard.board);
    setFirstClick(true);
    setGameOverModal(false);
    setGameWonModal(false);
    setTimeBombFound(false);
    setBestTime(bestTime);
    setRestrictClick(false)
    resetUp();
  };

  const backToMenu = () => {
    setGameOverModal(false);
    setGameWonModal(false);
    setIsPlaying(false);
    setRestrictClick(false)
  };

  const timeExpire = () => {
    setGameResult("Time's Up!!!");
    gameOver(false);
  };

  const { seconds, minutes, pause, restart } = useTimer({
    autoStart: true,
    onExpire: () => timeExpire(),
  });

  const {
    seconds: secondsUp,
    minutes: minutesUp,
    start: startUp,
    pause: pauseUp,
    reset: resetUp
  } = useStopwatch({ autoStart: false });

  const flagChecker = (x, y) => {
    const clickedCell = findByXY({ x, y }, boardData);
    return boardData.reduce(
      (count, cell) =>
        isAdjacent(cell, clickedCell) && cell.isFlagged ? ++count : count,
      0
    );
  };

  const autoClick = (x, y) => {
    const clickedCell = findByXY({ x, y }, boardData);
    const toBeClicked = boardData.filter(
      (cell) =>
        !cell.isClicked && !cell.isFlagged && isAdjacent(cell, clickedCell)
    );
    toBeClicked.forEach((cell) => updateBoard(cell.x, cell.y));
  };

  const updateBoard = (x, y) => {
    const gameSettings = {
      userId: userId,
      click: {
        x: x,
        y: y,
      },
      options: {
        timed: isTimed,
        difficulty: difficulty,
        mineCount: mineCount,
        boardWidth: width,
        boardHeight: height,
        customTime: "",
      },
    };
    let changedBoard = boardData;
    if (firstClick) {
      const gameData = generateBoard(gameSettings);
      changedBoard = gameData.board;
      // setBoard(changedBoard.board);
      setFirstClick(false);
      //gameData.time instert in start function
      if (isTimed) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + bestTime);
        restart(time);
      }
      startUp();
    }
    const floodBoard = floodFill({ x, y }, [...changedBoard]);
    setBoard(floodBoard);

    const clickedOnMine = floodBoard.reduce(
      (lose, current) => (current.isClicked && current.isMine ? true : lose),
      false
    );
    const unclickedCells = floodBoard.reduce(
      (count, current) => (!current.isClicked ? ++count : count),
      0
    );

    if (clickedOnMine) {
      playExplosion()
      setGameResult("You Clicked On A Mine");
      gameOver(false);
    } else if (unclickedCells == mineCount) {
      playWinChime()
      gameOver(true);
    }
  };

  const updateFlag = (x, y) => {
    const clickedCell = boardData.reduce(
      (clicked, current) =>
        current.x === x && current.y === y ? current : clicked,
      null
    );
    clickedCell.isFlagged = !clickedCell.isFlagged;
    if (clickedCell.isFlagged) {
      setDisplayMineCount(displayMineCount - 1);
    } else {
      setDisplayMineCount(displayMineCount + 1);
    }
  };

  const gameOver = (win) => {
    pause();
    pauseUp();
    setRestrictClick(true)

    axios
      .post(`${baseUrl}${recordsEndpoint}${resultEndpoint}`, {
        userId: userId,
        userName: userName,
        difficulty: difficulty,
        time: minutesUp * 60 + secondsUp,
        isWin: win,
      })
      .then((res) => {
        console.log(res.data);
        setResultData({
          bestTime: res.data.bestTime,
          difficulty: res.data.difficulty,
          userId: res.data.userId,
          userName: res.data.userName,
          winPercent: res.data.winPercent,
        });
      });

    if (win) {
      if (minutesUp * 60 + secondsUp < resultData.bestTime) {
        setBestTime(minutesUp * 60 + secondsUp);
      }
      setTimeout(() => {
        setGameWonModal(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setGameOverModal(true);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      {gameWonModal ? (
        <GameWon
          setWidth={setWidth}
          setHeight={setHeight}
          resetGame={resetGame}
          backToMenu={backToMenu}
          setDisplayMineCount={setDisplayMineCount}
          mineCount={mineCount}
          seconds={secondsUp}
          minutes={minutesUp}
          resultData={resultData}
          difficulty={difficulty}
        />
      ) : gameOverModal ? (
        <GameOver
          gameResult={gameResult}
          setWidth={setWidth}
          setHeight={setHeight}
          resetGame={resetGame}
          backToMenu={backToMenu}
          setDisplayMineCount={setDisplayMineCount}
          mineCount={mineCount}
          resultData={resultData}
        />
      ) : null}
      <div>
        <TopBar
          setIsPlaying={setIsPlaying}
          setDisplayMineCount={setDisplayMineCount}
          setWidth={setWidth}
          setHeight={setHeight}
        />
        <div className="flex flex-col items-center border-4 border-blue">
          <Timer
            mineCount={displayMineCount}
            timerSeconds={seconds}
            timerMinutes={minutes}
            timerPause={pause}
            timerRestart={restart}
            isTimed={isTimed}
            timeBombFound={timeBombFound}
          />
          <Grid
            boardHeight={boardSettings.boardHeight}
            boardWidth={boardSettings.boardWidth}
            className={`p-4 ${restrictClick ? 'pointer-events-none' : null}`}
          >
            {boardData.map((item) => (
              <Cell
                key={`${item.x}-${item.y}`}
                cellLocationX={item.x}
                cellLocationY={item.y}
                isMine={item.isMine}
                neighbors={item.neighbors}
                updateBoard={updateBoard}
                isClicked={item.isClicked}
                setIsFlagged={updateFlag}
                isFlagged={item.isFlagged}
                boardData={boardData}
                flagChecker={flagChecker}
                autoClick={autoClick}
                stopTimer={pause}
                isTimed={item.isTimed}
                setTimeBombFound={setTimeBombFound}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Board;
