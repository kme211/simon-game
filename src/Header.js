import React from 'react';

const Header = ({ onRestart, gameInProgress }) => (
    <header>
        <h1>Simon</h1> 
        {gameInProgress && <button onClick={onRestart}>Restart</button>}
    </header>
);

export default Header;