import React, { useState } from "react";

const VideoButton = ({ clickCallback }) => {
  const [stashed, setStashed] = useState(false);
  const [icon, setIcon] = useState("video-camera.png");

  const toggleBtn = () => {
    if (!stashed) {
      setIcon("video-camera-slash.png");
    } else {
      setIcon("video-camera.png");
    }
    setStashed(!stashed);
    clickCallback();
  };

  return (
    <button onClick={toggleBtn} className="btn btn-lg btn-primary rounded-circle mx-1">
      <img src={"/front/img/"+icon} width="40px"></img>

    </button>
  );
};

export default VideoButton;
