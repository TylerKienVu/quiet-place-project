import React, { useState } from "react";
import FallingWord from "../FallingWord/FallingWord";

const fallingWordAnchorStyle = {
  position: "relative",
  display: "inline-block"
};

const EXACT_START_POS_PIXELS = 381;

const IntroDialogueFallingWord = () => {
  const [showFallingWord, setShowFallingWord] = useState(true);

  return (
    <>
      <div style={fallingWordAnchorStyle}>
        {showFallingWord && (
          <FallingWord
            word='overloading'
            exactStartPos={EXACT_START_POS_PIXELS}
            deleteFallingWord={() => setShowFallingWord(true)}
          />
        )}
      </div>
      <div>...overloading your brain</div>
    </>
  );
};

export default IntroDialogueFallingWord;
