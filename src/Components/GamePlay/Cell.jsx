import Bomb from "../../assets/bomb.png";
import Flag from "../../assets/flag.png";
import flagGreen from "../../assets/flagGreen.png";
import {
  playCellClick,
  playFlagClick,
  playTimeBomb,
} from "../../assets/Sound/Howler";

function Cell({
  isMine,
  neighbors,
  cellLocationX,
  cellLocationY,
  updateBoard,
  isClicked,
  isFlagged,
  setIsFlagged,
  flagChecker,
  autoClick,
  stopTimer,
  isTimed,
  setTimeBombFound,
}) {
  const clickHandler = (e) => {
    if (isFlagged) {
      playCellClick();
      return;
    }
    if (e.detail === 1) {
      updateBoard(cellLocationX, cellLocationY);
    } else {
      if (neighbors === 0) {
        return;
      }
      if (flagChecker(cellLocationX, cellLocationY) !== neighbors) {
        return;
      }
      autoClick(cellLocationX, cellLocationY);
    }
  };

  const rightClickHandler = (e) => {
    e.preventDefault();
    if (isClicked) {
      return;
    }
    if (isTimed) {
      setTimeBombFound(true);
      stopTimer();
      playTimeBomb();
    }
    setIsFlagged(cellLocationX, cellLocationY);
    playFlagClick();
  };

  return (
    <div
      onClick={clickHandler}
      onContextMenu={rightClickHandler}
      className={`box-border select-none flex flex-row justify-center items-center h-9 w-9 active:bg-border ${
        isFlagged
          ? "bg-grey border shadow-inner"
          : isClicked && isMine
          ? "bg-red-600 border-2 border-borderGrey"
          : isClicked
          ? "bg-[#AEADAD] border-2 border-borderGrey"
          : "bg-grey border shadow-inner text-invisible"
      }`}
    >
      {" "}
      <h1
        className={`${
          isClicked && neighbors === 1
            ? "visible text-[#0000FE]"
            : isClicked && neighbors === 2
            ? "visible text-[#008100]"
            : isClicked && neighbors === 3
            ? "visible text-[#FE0000]"
            : isClicked && neighbors === 4
            ? "visible text-[#000084]"
            : isClicked && neighbors === 5
            ? "visible text-[#840000]"
            : isClicked && neighbors === 6
            ? "visible text-[#008284]"
            : isClicked && neighbors === 7
            ? "visible text-[#840185]"
            : isClicked && neighbors === 8
            ? "visible text-[#757575]"
            : isFlagged
            ? "visible"
            : isClicked && isMine
            ? "visible"
            : "invisible"
        }`}
      >
        {isFlagged && !isTimed ? (
          <img src={Flag} alt="bomb" className="h-6"></img>
        ) : isFlagged && isTimed ? (
          <img src={flagGreen} alt="bomb" className="h-6"></img>
        ) : isMine ? (
          <img src={Bomb} alt="bomb" className="h-6" />
        ) : (
          `${neighbors ? neighbors : ""}`
        )}
      </h1>
    </div>
  );
}

export default Cell;
