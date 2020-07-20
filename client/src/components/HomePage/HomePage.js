import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavigationBar from '../Navbar';
import AddPost from '../Posts/AddPost';


class HomePage extends Component {
    componentDidMount() {
        console.log("Home page ready");
    }
    render() {
        return (
            <div>
                <NavigationBar/>
                <div className='scroll-container'>
                    <h1 className="text-center">Signed in</h1>
                    <AddPost />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.currentUser.name
    }
}



export default connect(mapStateToProps)(HomePage);