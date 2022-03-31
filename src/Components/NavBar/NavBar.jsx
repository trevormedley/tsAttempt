import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase-config";

function NavBar({ toggleLeaderBoardView, viewingHighScores, toggleRulesView, viewingRules }) {
  const highScoresHandler = () => {
    toggleLeaderBoardView(!viewingHighScores);
    toggleRulesView(false)
  };

  const rulesHandler = () => {
    toggleRulesView(!viewingRules)
    toggleLeaderBoardView(false)
  }

  const signoutHandler = () => {
    toggleLeaderBoardView(false)
    toggleRulesView(false)
    signOut(auth)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-end bg-white/40 font-press-start text-xs py-4 px-8">
      <button
        onClick={highScoresHandler}
        className="border-2 border-black/10 p-4 hover:border-black hover:bg-white/50"
      >
        Leader Board
      </button>
      <button onClick={rulesHandler} className="border-2 ml-4 border-black/10 p-4 hover:border-black hover:bg-white/50">Rules</button>
      <button onClick={signoutHandler} className="border-2 border-black/10 p-4 ml-4 hover:border-red-600 hover:text-red-600 hover:bg-white/50">
        Sign Out
      </button>
    </div>
  );
}

export default NavBar;
