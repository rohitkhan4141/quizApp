import React from 'react';

const SectionA = ({ theme, toggleTheme }) => {
    const myTheme = theme
        ? { backgroundColor: 'black', color: 'white' }
        : {
              backgroundColor: 'red',
              color: 'white',
          };

    return (
        <div>
            <p style={myTheme}>I am Section A</p>
            <button type="button" onClick={toggleTheme}>
                Click for change the theme
            </button>
        </div>
    );
};

export default SectionA;
