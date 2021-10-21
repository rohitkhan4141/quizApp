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
import { useState } from 'react';

export default function Middleware(props) {
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleTheme = () => {
        setDarkTheme((prevState) => !prevState);
    };

    const { render } = props;

    return render(darkTheme, toggleTheme);
}
