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

    onResponseHandler = (response) => {
        const payload = {
            postId: response.postId,
            userId: response.userId
        }
        if (response.type === 'like') {
            axiosExpress.post('/posts/post-like',payload)
            .then(doc => {
                console.log("Received payload",doc);
                let newPosts = this.state.posts.map(post => {
                    if (doc.data.data._id === post._id) {
                        let newPost = {
                            ...post
                        };
                        newPost.likes += doc.data.data.like;
                        newPost.dislikes += doc.data.data.dislike;
                        return newPost;
                    } else {
                        return post;
                    }
                });

                this.setState({
                    posts: newPosts
                });
            })
        } else if (response.type === 'dislike') {
            axiosExpress.post('/posts/post-dislike',payload)
            .then(doc => {
                console.log("Received payload",doc);
                let newPosts = this.state.posts.map(post => {
                    if (doc.data.data._id === post._id) {
                        let newPost = {
                            ...post
                        };
                        newPost.likes += doc.data.data.like;
                        newPost.dislikes += doc.data.data.dislike;
                        return newPost;
                    } else {
                        return post;
                    }
                });

                this.setState({
                    posts: newPosts
                });
            })
        }
    }

    componentDidMount() {
        // TODO: get posts of self and friends only
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
                    <Post key={post._id} post={post} onResponseHandler={this.onResponseHandler}/>
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