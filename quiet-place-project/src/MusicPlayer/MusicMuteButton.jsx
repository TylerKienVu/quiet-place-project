import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute} from '@fortawesome/free-solid-svg-icons';
import './MusicMuteButton.css';

const MusicMuteButton = props => {
    const {audio} = props;
    const [audioIsOn, setAudioIsOn] = useState(true);

    useEffect(() => {
        // audioIsOn ? audio.play() : audio.pause();
    }, [audioIsOn, audio]);

    const toggleMusic = () => {
        setAudioIsOn(!audioIsOn);
    }

    return (
        <div className='MusicMuteButton-container d-flex justify-content-center align-items-center' onClick={toggleMusic}>
            <FontAwesomeIcon icon={audioIsOn ? faVolumeUp : faVolumeMute}/>
        </div>
    );
}

export default MusicMuteButton;