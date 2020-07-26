import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavigationBar from '../Navbar/Navbar';
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';
import Carousel from '../Posts/Carousel'



class HomePage extends Component {
    componentDidMount() {
        console.log("Home page ready");
    }
    render() {
        return (
            <div>
                <NavigationBar/>
                <div className='scroll-container'>
                    
                    <AddPost />
                    {/* <Carousel /> */}
                    <Post />
                    <Post />
                    <Post />
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