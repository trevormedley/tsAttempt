import React from "react";
import GameSetup from "../Components/GameSetup/GameSetup";

function GameSetupPage({ userId, userName }) {
  return <GameSetup userId={userId} userName={userName} />;
}

export default GameSetupPage;
