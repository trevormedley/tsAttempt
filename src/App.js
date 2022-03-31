// React Imports
import { React, useState } from "react";

// User Auth Imports
import { auth } from "./utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

// Pages
import LoginPage from "./Pages/LoginPage";
import GameSetupPage from "./Pages/GameSetupPage";
import NavBar from "./Components/NavBar/NavBar";
import HighScores from "./Components/HighScores/HighScores";
import Rules from "./Components/GameSetup/Rules";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [viewingHighScores, setViewingHighScores] = useState(false);
  const [viewingRules, setViewingRules] = useState(false);
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      setUserId(user.uid)
      let userNameString = (user.email.split("@")[0])
      setUserName(userNameString)
    } else {
      setLoggedIn(false);
    }
  });


  return (
    <div>
      {loggedIn ? (
        <NavBar
          className="absolute"
          viewingHighScores={viewingHighScores}
          toggleLeaderBoardView={setViewingHighScores}
          toggleRulesView={setViewingRules}
          viewingRules={viewingRules}
        />
      ) : null}
      <div className="flex h-screen justify-center items-center -mt-10">
        {viewingHighScores ? (
          <HighScores userId={userId} toggleView={setViewingHighScores} />
        ) : null}
        {viewingRules ? (
          <Rules toggleView={setViewingRules} />
        ) : null}
        <div>{loggedIn ? <GameSetupPage userId={userId} userName={userName} /> : <LoginPage />}</div>
      </div>
    </div>
  );
}

export default App;
