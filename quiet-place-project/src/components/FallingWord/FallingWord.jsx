import React from "react";
import "./FallingWord.css";

const FallingWord = props => {
  const { word, id, deleteFallingWord } = props;

  const handleAnimationEnd = () => {
    deleteFallingWord(id);
  };

  return (
    <span className='FallingWord-falling-word' onAnimationEnd={() => handleAnimationEnd()}>
      {word}
    </span>
  );
};

export default FallingWord;
