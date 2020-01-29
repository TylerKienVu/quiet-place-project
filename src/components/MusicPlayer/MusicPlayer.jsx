import React from "react";
import MusicMuteButton from "./MusicMuteButton";
import soundtrack from "../../assets/quietPlaceProjectSoundtrack.mp3";

const audio = new Audio(soundtrack);
audio.loop = true;
audio.volume = 0.4;
audio.muted = true;
audio.autoplay = true;

const MusicPlayer = () => {
  return (
    <>
      <MusicMuteButton audio={audio} />
    </>
  );
};

export default MusicPlayer;
