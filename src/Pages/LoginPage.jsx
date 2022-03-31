import React, { useState } from "react";
import Login from "../Components/Login/Login";
import SignUp from "../Components/Login/SignUp";

function LoginPage() {
  const [hasAccount, setHasAccount] = useState(true);

  const handleClick = () => {
    setHasAccount(!hasAccount);
  };

  return (
    <div>
      <h1 className="text-center font-press-start text-4xl text-blue mb-8">TimeSweeper</h1>
      {hasAccount ? (
        <Login handleClick={handleClick} />
      ) : (
        <SignUp handleClick={handleClick} />
      )}
    </div>
  );
}

export default LoginPage;
