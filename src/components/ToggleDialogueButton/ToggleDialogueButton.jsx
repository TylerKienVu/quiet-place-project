import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import "./ToggleDialogueButton.css";

const ToggleDialogueButton = props => {
  const { toggleDialogue, showDialogue } = props;

  return (
    <div
      className='ToggleDialogueButton-container d-flex justify-content-center align-items-center pr-3'
      onClick={toggleDialogue}
    >
      <FontAwesomeIcon icon={showDialogue ? faForward : faBackward} />
    </div>
  );
};

export default ToggleDialogueButton;
