import React from "react";

function Rules() {
  return (
    <div className="absolute overflow-y-scroll scroll-p-8 font-press-start flex flex-col items-center backdrop-blur-lg bg-white/80 h-3/4 w-5/6 p-12">
      <h1 className="text-blue text-4xl">Rules</h1>
      <p className="text-xs leading-6 py-8">
        Timesweeper is a variant on the classic computer game Minesweeper, with
        a twist! In the timed game mode, one of the hidden mines is also a
        timebomb! At the start of the game the timer on the bomb is set to your
        previous best time for that level of difficulty. You must either mark
        the hidden timebomb with a flag (stopping the timer) or beat the level
        faster than you ever have before… OR YOU LOSE!
      </p>
      <div className="my-8">
        <h1 className="text-blue mb-4">Game Selection Screen</h1>
        <p className="text-xs leading-6">
          Here is where you choose your level of difficulty (including timed
          option) for your game. Once you have made your selections, you can
          press “Let’s Go!” to start the game.
        </p>
      </div>
      <div className="my-8">
        <h1 className="text-blue mb-4">Game Basics and Terminology</h1>
        <p className="text-xs leading-6">
          The various difficulties of game play create differently sized boards
          with different quantities of mines. (easy: 10x10, 10 mines / medium:
          16x16, 40 mines / hard: 16x30, 99 mines). All of the cells on the
          board start of “hidden” and must be clicked to reveal what is hidden
          there. Once a cells is revealed, it will show one of three things: a
          blank (meaning there are no mines adjacent to that cell), a number
          (indicating how many mines are adjacent to that cell), or a mine
          (meaning you clicked where you shouldn’t have… game over!).
        </p>
      </div>
      <div className="my-8">
        <h1 className="text-blue mb-4">Optional Controls</h1>
        <p className="text-xs leading-6">
          You may right click on a “hidden” cell to mark it with a flag. This
          serves two purposes. First, in the timed game mode, if the mine at
          that position is the timebomb, it stops the timer and play continues
          without the added pressure of racing the clock. Second, all squares
          marked with flags can not be clicked on. This helps prevent accidental
          game loss! A counter in the upper left corner of the game will show
          the count of mines minus the number of flags you’ve placed. Of course,
          if you place more flags than there are mines, the number will go into
          the negatives, indicating you have (at least) one misplaced flag. If
          you believe you have correctly flagged all the mines adjacent to a
          revealed cell, you may double click it and the game will automatically
          “click” any unflagged and “hidden” cells adjacent to it. This helps
          speed up game play but be warned! If you incorrectly placed the flags,
          this will surely cause you to lose the game!
        </p>
      </div>
      <div className="my-8">
        <h1 className="text-blue mb-4">Winning The Game</h1>
        <p className="text-xs leading-6">
          The game is won when all the hidden cells that do not contain a mine
          have been clicked. Simply flagging all the mine is not sufficient.
        </p>
      </div>
    </div>
  );
}

export default Rules;
