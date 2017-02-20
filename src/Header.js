import React from 'react';
import './Header.css';
import Checkbox from './Checkbox';

const Header = ({ onRestart, gameInProgress, strictMode, onToggleStrictMode }) => (
    <header className="header">
        <h1 className="header__app-name">Simon</h1> 
        <div className="header__group">
        <Checkbox label="Strict mode" checked={strictMode} onToggle={onToggleStrictMode} />
        {gameInProgress && <button className="header__button" onClick={onRestart}>Restart</button>}
        </div>
    </header>
);

export default Header;