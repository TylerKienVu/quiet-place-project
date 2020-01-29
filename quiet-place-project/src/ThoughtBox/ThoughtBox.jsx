import React, { useState } from "react";
import "./ThoughtBox.css";
import crumble1 from "./crumble1.mp3";
import crumble2 from "./crumble2.mp3";
import crumble3 from "./crumble3.mp3";

const crumbleAudioList = [new Audio(crumble1), new Audio(crumble2), new Audio(crumble3)];

crumbleAudioList.forEach(audioFile => {
  audioFile.volume = 0.5;
});

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ThoughtBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentWord, setCurrentWord] = useState("");

  const handleKeyDown = keyDownEvent => {
    if (keyDownEvent.key === "Enter") {
      triggerFallingWord();
      setInputValue("");
    } else if (keyDownEvent.key === " ") triggerFallingWord();
  };

  const handleChange = changeEvent => {
    setInputValue(changeEvent.target.value);
  };

  const triggerFallingWord = () => {
    crumbleAudioList[randomNumberInRange(0, crumbleAudioList.length - 1)].play();
    setCurrentWord(getCurrentWord());
    animateFallingWord();
  };

  const animateFallingWord = () => {};

  const getCurrentWord = () => {
    const currentWordList = inputValue.split(" ");
    return currentWordList[currentWordList.length - 1];
  };

  // const handleAnimationEnd = animationEndEvent => {
  //   console.log("hit");
  //   debugger;
  // };

  return (
    <div className='ThoughtBox-container mx-auto'>
      <input
        className='ThoughtBox-textbox'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {/* <span className='ThoughtBox-falling-word' onAnimationEnd={handleAnimationEnd}>
        {currentWord}
      </span> */}
    </div>
  );
};

export default ThoughtBox;
