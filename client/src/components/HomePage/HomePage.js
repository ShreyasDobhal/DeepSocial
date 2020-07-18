import React, {Component} from 'react';

import NavigationBar from '../Navbar';


class HomePage extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <h1 className="text-center">Signed in</h1>
            </div>
        );
    }
}

export default HomePage;