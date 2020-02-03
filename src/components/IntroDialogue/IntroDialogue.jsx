import React, { useState, useEffect } from "react";
import DialogueLines from "../../constants/dialogueLines";
import { CSSTransition } from "react-transition-group";
import "./IntroDialogue.css";

const IntroDialogue = props => {
  const { setShowThoughtBox, toggleMusic } = props;
  const [currentDialogueLineIndex, setCurrentDialogueLineIndex] = useState(0);

  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    // Triggers the entering animation
    setShowLine(true);
  }, [currentDialogueLineIndex]);

  const handleKeyDown = keyDownEvent => {
    // Hide the line to trigger exit animation
    if (keyDownEvent.code === "Space") setShowLine(false);

    if (currentDialogueLineIndex === 0) toggleMusic();
  };

  const handleLineExitedTransitionFinished = () => {
    // Activate next line
    setCurrentDialogueLineIndex(prevIndex => prevIndex + 1);

    if (currentDialogueLineIndex + 1 === DialogueLines.length) setShowThoughtBox(true);
  };

  return (
    <div
      className='IntroDialogue-line-container d-flex justify-content-center'
      onKeyDown={handleKeyDown}
    >
      <div className='d-flex flex-column justify-content-center' style={{ width: "1000px" }}>
        <CSSTransition
          in={showLine}
          timeout={300}
          classNames='IntroDialogue-line'
          onExited={handleLineExitedTransitionFinished}
        >
          <div>{DialogueLines[currentDialogueLineIndex]}</div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default IntroDialogue;
