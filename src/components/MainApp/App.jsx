import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import ThoughtBox from "../ThoughtBox/ThoughtBox";
import IntroDialogue from "../IntroDialogue/IntroDialogue";
import soundtrack from "../../assets/quietPlaceProjectSoundtrack.mp3";
import MusicMuteButton from "../MusicMuteButton/MusicMuteButton";
import { CSSTransition } from "react-transition-group";
import ToggleDialogueButton from "../ToggleDialogueButton/ToggleDialogueButton";

const audio = new Audio(soundtrack);
audio.loop = true;
audio.volume = 0.4;
audio.muted = true;

function App() {
  const [showThoughtBox, setShowThoughtBox] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [audioIsOn, setAudioIsOn] = useState(false);
  const [focusThoughtBox, setFocusThoughtBox] = useState(false);

  useEffect(() => {
    // Make sure that the audio is playing. Sometimes it doesn't play automatically
    // even though autoplay is enabled. Sometimes play() can fail if the user
    // didn't interact with the document so placing it here will ensure that they
    // did by pressing the volume button.

    if (audio.paused && audioIsOn) audio.play();
  }, [audioIsOn]);

  const toggleMusic = useCallback(() => {
    setAudioIsOn(prevVal => !prevVal);
  }, []);

  const toggleThoughtBox = useCallback(() => {
    setShowThoughtBox(preVal => !preVal);
  }, []);

  const toggleFocusThoughtBox = useCallback(() => {
    setFocusThoughtBox(prevVal => !prevVal);
  }, []);

  const toggleDialogue = useCallback(() => {
    if (showDialogue) {
      setShowDialogue(false);
      setShowThoughtBox(true);
    } else {
      setShowDialogue(true);
      setShowThoughtBox(false);
    }
  }, [showDialogue]);

  return (
    <div className='container-fluid App-main-container p-0'>
      <CSSTransition
        appear
        in={showThoughtBox}
        timeout={500}
        classNames='App-ThoughtBox'
        unmountOnExit
      >
        <ThoughtBox focusThoughtBox={focusThoughtBox} />
      </CSSTransition>
      {showDialogue && (
        <IntroDialogue
          setAudioIsOn={setAudioIsOn}
          toggleDialogue={toggleDialogue}
          toggleThoughtBox={toggleThoughtBox}
          toggleFocusThoughtBox={toggleFocusThoughtBox}
        />
      )}
      <div className='App-footer d-flex flex-row'>
        <ToggleDialogueButton toggleDialogue={toggleDialogue} showDialogue={showDialogue} />
        <MusicMuteButton audio={audio} audioIsOn={audioIsOn} toggleMusic={toggleMusic} />
      </div>
    </div>
  );
}

export default App;
