import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import "./MusicMuteButton.css";

const MusicMuteButton = props => {
  const { audio, audioIsOn, toggleMusic } = props;

  useEffect(() => {
    audio.muted = audioIsOn ? false : true;
  }, [audioIsOn, audio]);

  return (
    <div
      className='MusicMuteButton-container d-flex justify-content-center align-items-center'
      onClick={toggleMusic}
    >
      <FontAwesomeIcon icon={audioIsOn ? faVolumeUp : faVolumeMute} />
    </div>
  );
};

export default MusicMuteButton;
