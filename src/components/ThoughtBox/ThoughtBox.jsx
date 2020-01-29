import React, { useState, useRef, useEffect } from "react";

import crumble1 from "../../assets/crumble1.mp3";
import crumble2 from "../../assets/crumble2.mp3";
import crumble3 from "../../assets/crumble3.mp3";
import FallingWord from "../FallingWord/FallingWord";
import { randomNumberInRange } from "../../util/generalUtils";

import "./ThoughtBox.css";

const crumbleAudioList = [new Audio(crumble1), new Audio(crumble2), new Audio(crumble3)];

crumbleAudioList.forEach(audioFile => {
  audioFile.volume = 0.5;
});

const ThoughtBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [fallingWords, setFallingWords] = useState([]);
  const measuringContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    addFallingWord(getCurrentWord());
  };

  const addFallingWord = word => {
    const id = `${word}-${new Date().getTime()}`;
    // This determines where the word will start falling
    const offsetWidth = measuringContainerRef.current.offsetWidth;

    setFallingWords([...fallingWords, { word: word, id: id, offsetWidth: offsetWidth }]);
  };

  const deleteFallingWord = fallingWordId => {
    setFallingWords(
      fallingWords.filter(fallingWord => {
        const { id } = fallingWord;
        return fallingWordId !== id;
      })
    );
  };

  const getCurrentWord = () => {
    const currentWordList = inputValue.split(" ");
    return currentWordList[currentWordList.length - 1];
  };

  return (
    <div className='ThoughtBox-container mx-auto'>
      <div className='ThoughtBox-falling-word-anchor'>
        {fallingWords.map(fallingWord => {
          const { word, id, offsetWidth } = fallingWord;
          return (
            <FallingWord
              word={word}
              id={id}
              key={id}
              offsetWidth={offsetWidth}
              deleteFallingWord={deleteFallingWord}
            />
          );
        })}
      </div>
      <input
        ref={inputRef}
        className='ThoughtBox-textbox'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div ref={measuringContainerRef} className='ThoughtBox-input-measuring-container'>
        {inputValue}
      </div>
    </div>
  );
};

export default ThoughtBox;
