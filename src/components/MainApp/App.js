import React from "react";
import "./App.css";
import ThoughtBox from "../ThoughtBox/ThoughtBox";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

function App() {
  return (
    <div className='container-fluid App-main-container'>
      <ThoughtBox />
      <MusicPlayer />
    </div>
  );
}

export default App;
