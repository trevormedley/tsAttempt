import React from "react";

function Record({ userName, time, index }) {
  const displayTime = (data) => {
    const minutes = Math.floor(data / 60);
    const seconds = (data - minutes * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="text-xs flex flex-row justify-between py-4">
      <div className="flex flex-row items-center">
        <h1 className="mr-4">{index + 1}</h1>
        <h1>{userName}</h1>
      </div>
      <div>
        <h1>{displayTime(time)}</h1>
      </div>
    </div>
  );
}

export default Record;
