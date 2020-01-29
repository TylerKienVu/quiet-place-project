import React, { useState } from 'react';
import './ThoughtBox.css';

const ThoughtBox = () => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = keyDownEvent => {
        if(keyDownEvent.key === 'Enter') setInputValue('');
        if(keyDownEvent.key === ' ') triggerFallingWordAnimation();
    }

    const handleChange = changeEvent => {
        setInputValue(changeEvent.target.value);
    }

    const triggerFallingWordAnimation = () => {
        
    }

    return (
        <div className='ThoughtBox-container mx-auto'>
            <input className='ThoughtBox-textbox' value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}></input>
        </div>
    );
}

export default ThoughtBox;