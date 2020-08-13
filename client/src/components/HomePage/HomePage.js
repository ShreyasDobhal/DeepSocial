import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';
import {connect} from 'react-redux';

import NavigationBar from '../Navbar/Navbar';
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';
import LoadingSpinner from '../Loader/LoadingSpinner';



class HomePage extends Component {

    state = {
        posts: [],
        loaded: false
    }

    componentDidMount() {
        axiosExpress.get('/posts')
            .then(posts=>{
                this.setState({
                    posts: posts.data,
                    loaded: true
                });
                console.log("Posts ",posts.data);
            });
    }
    
    render() {
        let PostHolder = null;

        if (this.state.loaded) {
            PostHolder = this.state.posts.map(post=>{
                return (
                    <Post post={post}/>
                );
            });
        } else {
            PostHolder = (<LoadingSpinner />);
        }

        return (
            <div>
                <NavigationBar/>
                <div className='scroll-container'>
                    <AddPost />
                    {PostHolder}
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