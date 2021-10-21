import React, { useState } from 'react';

const App = () => (
    <div>
        <Middleware
            render={(themeDark, toggleTheme) => (
                <SectionA theme={themeDark} toggleTheme={toggleTheme} />
            )}
        />
    </div>
);

export default App;

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

// import { Component } from 'react';

// export default class Middleware extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             themeDark: false,
//         };
//     }

//     toggleTheme = () => {
//         this.setState((prevStates) => ({
//             themeDark: !prevStates.themeDark,
//         }));
//         console.log('i am firing');
//     };

//     render() {
//         const { themeDark } = this.state;
//         const { render } = this.props;
//         return render(themeDark, this.toggleTheme);
//     }
// }

function Middleware(props) {
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleTheme = () => {
        setDarkTheme((prevState) => !prevState);
    };

    const { render } = props;

    return render(darkTheme, toggleTheme);
}
