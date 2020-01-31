import React, { useRef, useState, useEffect, useCallback } from "react";
import "./FallingWord.css";
import { randomNumberInRange, randomUniqueNumbersInRange } from "../../util/general";

const fallingWordAnimationClassNames = ["FallingWord-word-falling1", "FallingWord-word-falling2"];
const fallingCrumbleAnimationClassNames = [
  "FallingWord-crumble-falling3",
  "FallingWord-crumble-falling4",
  "FallingWord-crumble-falling5",
  "FallingWord-crumble-falling6"
];
const MIN_NUM_OF_CRUMBLES = 1;
const MAX_NUM_OF_CRUMBLES = 3;

const FallingWord = props => {
  const { word, id, offsetWidth, deleteFallingWord } = props;

  const [animationClass, setAnimationClass] = useState(null);
  const [crumblesAnimationClasses, setCrumblesAnimationClasses] = useState([]);
  const [startingPosition, setStartingPosition] = useState(null);
  const measuringContainerRef = useRef(null);

  // Calculates the starting position for the falling nodes
  const calculateOffset = useCallback(() => {
    return measuringContainerRef.current
      ? offsetWidth - measuringContainerRef.current.offsetWidth
      : null;
  }, [offsetWidth]);

  // Creates a list of crumble nodes to render
  // Note: Had to generate the list of components before render because when I was
  // trying to map the components in render, the crumbles would constantly re-render when
  // the user typed a character. This may be a fundamental issue with how a character
  // being typed causes a re-render
  const generateCrumbleNodes = useCallback(
    crumbleAnimations => {
      return crumbleAnimations.map((animationClass, index) => (
        <span
          className={`FallingWord-falling ${animationClass}`}
          key={`${animationClass}-${index}`}
          style={{ left: startingPosition }}
        >
          .
        </span>
      ));
    },
    [startingPosition]
  );

  // Generates a random number of unique crumble animations between 2-3
  const generateRandomCrumbleAnimationClasses = useCallback(() => {
    // generate MIN_NUM_OF_CRUMBLES to MAX_NUM_OF_CRUMBLES unique animation indicies
    const crumbleAnimationIndicies = randomUniqueNumbersInRange(
      0,
      fallingCrumbleAnimationClassNames.length - 1,
      MIN_NUM_OF_CRUMBLES,
      MAX_NUM_OF_CRUMBLES
    );

    // Get the corresponding animations
    const crumbleAnimations = crumbleAnimationIndicies.map(
      crumbleAnimationIndex => fallingCrumbleAnimationClassNames[crumbleAnimationIndex]
    );

    return generateCrumbleNodes(crumbleAnimations);
  }, [generateCrumbleNodes]);

  // When the user types, it causes a rerender of all of the currently falling words.
  // The code inside here is only meant to be executed once.
  useEffect(() => {
    setStartingPosition(calculateOffset());
    setCrumblesAnimationClasses(generateRandomCrumbleAnimationClasses());
    setAnimationClass(getRandomFallingAnimationClass());
  }, [calculateOffset, generateRandomCrumbleAnimationClasses]);

  const handleAnimationEnd = () => {
    deleteFallingWord(id);
  };

  const getRandomFallingAnimationClass = () => {
    return fallingWordAnimationClassNames[
      randomNumberInRange(0, fallingWordAnimationClassNames.length - 1)
    ];
  };

  return (
    <>
      <div ref={measuringContainerRef} className='FallingWord-word-measuring-container'>
        {word}
      </div>
      <span
        className={`FallingWord-falling ${animationClass}`}
        style={{ left: startingPosition }}
        onAnimationEnd={() => handleAnimationEnd()}
      >
        {word}
      </span>
      {crumblesAnimationClasses}
    </>
  );
};

export default FallingWord;
