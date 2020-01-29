import React, { useState } from "react";

import crumble1 from "../../assets/crumble1.mp3";
import crumble2 from "../../assets/crumble2.mp3";
import crumble3 from "../../assets/crumble3.mp3";
import FallingWord from "../FallingWord/FallingWord";

import "./ThoughtBox.css";

const crumbleAudioList = [new Audio(crumble1), new Audio(crumble2), new Audio(crumble3)];

crumbleAudioList.forEach(audioFile => {
  audioFile.volume = 0.5;
});

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const ThoughtBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [fallingWords, setFallingWords] = useState([]);

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
    setFallingWords([...fallingWords, { word: word, id: `${word}-${new Date().getTime()}` }]);
  };

  const deleteFallingWord = fallingWordId => {
    setFallingWords(
      fallingWords.filter(fallingWordObj => {
        const { id } = fallingWordObj;
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
      <input
        className='ThoughtBox-textbox'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {fallingWords.map(fallingWordObj => {
        const { word, id } = fallingWordObj;
        return <FallingWord word={word} key={id} id={id} deleteFallingWord={deleteFallingWord} />;
      })}
    </div>
  );
};

export default ThoughtBox;
