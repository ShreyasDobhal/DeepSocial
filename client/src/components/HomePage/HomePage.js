import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getPostsByFriendsQuery, getPostsByUserQuery} from '../../queries/queries';

import NavigationBar from '../Navbar/Navbar';
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';
import LoadingSpinner from '../Loader/LoadingSpinner';
import FriendSuggestions from './FriendSuggestions';

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

    componentWillReceiveProps (nextProps) {
        if (!nextProps.getPostsByUserQuery.loading && !nextProps.getPostsByFriendsQuery.loading) {
            const userPosts = nextProps.getPostsByUserQuery.user.posts;
            const friendPosts = [].concat.apply([],nextProps.getPostsByFriendsQuery.user.friends.map(friend =>friend.posts));
            console.log("User Posts",userPosts);
            console.log("Friend Posts",friendPosts);
            let newPosts = [...userPosts, ...friendPosts].sort((post1,post2) => post2.postDate-post1.postDate);
            console.log("Total Posts",newPosts);

            if (this.state.posts !== newPosts) {
                this.setState({
                    posts: newPosts,
                    loaded: true
                });
            }
        }
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
                    <FriendSuggestions userId={this.props.userId}/>
                    {PostHolder}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.currentUser.name,
        userId: state.tokenId
    }
}

export default connect(mapStateToProps)(compose(
    graphql(getPostsByFriendsQuery, {
        options: (props) => {
            return {
                variables: {
                    _id: props.userId
                }
            }
        },
        name: "getPostsByFriendsQuery"
    }),
    graphql(getPostsByUserQuery, {
        options: (props) => {
            return {
                variables: {
                    _id: props.userId
                }
            }
        },
        name: "getPostsByUserQuery"
    })
)(HomePage))