import React, { useState, useEffect } from "react";
import DialogueLines from "../../constants/dialogueLines";
import "./IntroDialogue.css";

const IntroDialogue = props => {
  const { setShowThoughtBox, toggleMusic } = props;
  const [currentDialogueLineIndex, setCurrentDialogueLineIndex] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = keyDownEvent => {
    if (keyDownEvent.code === "Space") setCurrentDialogueLineIndex(prevIndex => prevIndex + 1);
    if (currentDialogueLineIndex + 1 === DialogueLines.length) setShowThoughtBox(true);
    if (currentDialogueLineIndex === 0) toggleMusic();
  };

  return (
    <div
      className='IntroDialogue-line-container d-flex justify-content-center'
      onKeyDown={handleKeyDown}
    >
      <div className='d-flex flex-column justify-content-center' style={{ width: "1000px" }}>
        {DialogueLines[currentDialogueLineIndex]}
      </div>
    </div>
  );
};

export default IntroDialogue;
