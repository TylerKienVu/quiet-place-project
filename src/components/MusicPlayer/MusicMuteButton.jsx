import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import "./MusicMuteButton.css";

const MusicMuteButton = props => {
  const { audio } = props;
  const [audioIsOn, setAudioIsOn] = useState(false);

  useEffect(() => {
    audio.muted = audioIsOn ? false : true;
  }, [audioIsOn, audio]);

  const toggleMusic = () => {
    // Make sure that the audio is playing. Sometimes it doesn't play automatically
    // even though autoplay is enabled. Sometimes play() can fail if the user
    // didn't interact with the document so placing it here will ensure that they
    // did by pressing the volume button.
    if (audio.paused) audio.play();

    setAudioIsOn(!audioIsOn);
  };

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
