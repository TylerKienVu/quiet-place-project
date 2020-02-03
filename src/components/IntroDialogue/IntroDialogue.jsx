import React, { useState, useEffect } from "react";
import DialogueLines from "../../constants/dialogueLines";
import { CSSTransition } from "react-transition-group";
import "./IntroDialogue.css";

const LINE_INDEX_TO_SHOW_THOUGHTBOX = 8;
const LINE_INDEX_USER_IS_TYPING_INTO_THOUGHTBOX = 10;
const LINE_INDEX_TO_HIDE_THOUGHTBOX = 11;
const LINE_INDEX_TO_HIDE_DIALOGUE = DialogueLines.length;

const IntroDialogue = props => {
  const { toggleThoughtBox, setAudioIsOn, toggleDialogue, toggleFocusThoughtBox } = props;
  const [currentDialogueLineIndex, setCurrentDialogueLineIndex] = useState(0);
  const [showLine, setShowLine] = useState(false);
  const [userTypedSomethingIntoThoughtBox, setUserTypedSomethingIntoThoughtBox] = useState(false);

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
    // Dont show next line until user types something in thoughtbox and presses enter here
    if (currentDialogueLineIndex === LINE_INDEX_USER_IS_TYPING_INTO_THOUGHTBOX) {
      if (keyDownEvent.code !== "Enter" && keyDownEvent.code !== "Space")
        setUserTypedSomethingIntoThoughtBox(true);
      if (keyDownEvent.code === "Enter" && userTypedSomethingIntoThoughtBox) setShowLine(false);
      return;
    }

    // Hide the line to trigger exit animation
    if (keyDownEvent.code === "Space") {
      setShowLine(false);
      if (currentDialogueLineIndex === 0) setAudioIsOn(true);
    }
  };

  const handleLineExitedTransitionFinished = () => {
    const nextLineIndex = currentDialogueLineIndex + 1;

    // Activate next line
    setCurrentDialogueLineIndex(prevIndex => prevIndex + 1);

    if (nextLineIndex === LINE_INDEX_TO_SHOW_THOUGHTBOX || nextLineIndex === DialogueLines.length)
      toggleThoughtBox();
    else if (nextLineIndex === LINE_INDEX_TO_HIDE_THOUGHTBOX) toggleThoughtBox();

    if (nextLineIndex === LINE_INDEX_USER_IS_TYPING_INTO_THOUGHTBOX) toggleFocusThoughtBox();
    if (nextLineIndex === LINE_INDEX_TO_HIDE_DIALOGUE) toggleDialogue();
  };

  return (
    <div
      className='IntroDialogue-line-container d-flex justify-content-center'
      onKeyDown={handleKeyDown}
    >
      <div className='d-flex flex-column justify-content-center' style={{ width: "1000px" }}>
        <CSSTransition
          in={showLine}
          timeout={500}
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
