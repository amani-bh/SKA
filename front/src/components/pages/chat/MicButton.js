import React, { useState } from "react";

const MicButton = ({ clickCallback }) => {
  const [stashed, setStashed] = useState(false);
  const [icon, setIcon] = useState("mic.png");

  const toggleLocalAudio = () => {
    if (!stashed) {
      setIcon("mute.png");
    } else {
      setIcon("mic.png");
    }
    setStashed(!stashed);
    clickCallback();
  };

  return (
    <button onClick={toggleLocalAudio} className="btn btn-lg btn-secondary rounded-circle mx-1">
      <img src={"/front/img/"+icon} width="40px"></img>
    </button>
  );
};

export default MicButton;
