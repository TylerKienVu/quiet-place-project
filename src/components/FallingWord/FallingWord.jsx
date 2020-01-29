import React, { useRef, useState, useEffect, useCallback } from "react";
import "./FallingWord.css";
import { randomNumberInRange } from "../../util/generalUtils";

const fallingAnimationClassNames = ["FallingWord-falling1", "FallingWord-falling2"];

const FallingWord = props => {
  const [startingPosition, setStartingPosition] = useState(null);
  const [animationClass, setAnimationClass] = useState(null);
  const measuringContainerRef = useRef(null);
  const { word, id, offsetWidth, deleteFallingWord } = props;

  const calculateOffset = useCallback(() => {
    const wordWidth = measuringContainerRef.current.offsetWidth;

    return offsetWidth - wordWidth;
  }, [offsetWidth]);

  // When the user types, it causes a rerener of all of the currently falling words.
  // The code inside here is only meant to be executed once.
  useEffect(() => {
    setStartingPosition(calculateOffset());
    setAnimationClass(getRandomFallingAnimationClass());
  }, [calculateOffset]);

  const handleAnimationEnd = () => {
    deleteFallingWord(id);
  };

  const getRandomFallingAnimationClass = () => {
    return fallingAnimationClassNames[
      randomNumberInRange(0, fallingAnimationClassNames.length - 1)
    ];
  };

  return (
    <>
      <div ref={measuringContainerRef} className='FallingWord-word-measuring-container'>
        {word}
      </div>
      <span
        className={`FallingWord-falling-word ${animationClass}`}
        style={{ left: startingPosition }}
        onAnimationEnd={() => handleAnimationEnd()}
      >
        {word}
      </span>
    </>
  );
};

export default FallingWord;
