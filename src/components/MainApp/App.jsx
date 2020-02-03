import React, { useState, useEffect } from "react";
import "./App.css";
import ThoughtBox from "../ThoughtBox/ThoughtBox";
import IntroDialogue from "../IntroDialogue/IntroDialogue";
import soundtrack from "../../assets/quietPlaceProjectSoundtrack.mp3";
import MusicMuteButton from "../MusicMuteButton/MusicMuteButton";
import { CSSTransition } from "react-transition-group";

const audio = new Audio(soundtrack);
audio.loop = true;
audio.volume = 0.4;
audio.muted = true;

function App() {
  const [showThoughtBox, setShowThoughtBox] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [audioIsOn, setAudioIsOn] = useState(false);

  const toggleMusic = () => {
    // Make sure that the audio is playing. Sometimes it doesn't play automatically
    // even though autoplay is enabled. Sometimes play() can fail if the user
    // didn't interact with the document so placing it here will ensure that they
    // did by pressing the volume button.
    if (audio.paused) audio.play();

    setAudioIsOn(!audioIsOn);
  };

  const toggleThoughtBox = () => {
    setShowThoughtBox(!showThoughtBox);
  };

  return (
    <div className='container-fluid App-main-container p-0'>
      <CSSTransition
        appear
        in={showThoughtBox}
        timeout={500}
        classNames='App-ThoughtBox'
        unmountOnExit
      >
        <ThoughtBox />
      </CSSTransition>
      {showDialogue && (
        <IntroDialogue
          setShowThoughtBox={setShowThoughtBox}
          toggleMusic={toggleMusic}
          toggleThoughtBox={toggleThoughtBox}
        />
      )}
      <MusicMuteButton audio={audio} audioIsOn={audioIsOn} toggleMusic={toggleMusic} />
    </div>
  );
}

export default App;
