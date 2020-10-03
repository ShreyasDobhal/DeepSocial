import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';
import Post from '../Posts/Post';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getPostsByUserQuery} from '../../queries/queries';
import LoadingSpinner from '../Loader/LoadingSpinner';

class TimelineTab extends Component {

    state = {
        posts: null
    }

    // Post like - dislike handler
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

    componentWillReceiveProps(nextProps) {
        if (!nextProps.getPostsByUserQuery.loading) {
            if (this.state.posts !== nextProps.getPostsByUserQuery.user.posts)
                this.setState({posts: nextProps.getPostsByUserQuery.user.posts});
        }
    }

    render() {

        if (this.props.getPostsByUserQuery.loading || !this.state.posts) {
            return (<LoadingSpinner />);
        } else {
            if (this.state.posts.length === 0) {
                return (
                    <div>
                        <img style={{width: '100%'}} src='/images/no-posts.png'/>
                    </div>
                );
            } else {
                return this.state.posts.map(post=>
                    <Post key={post._id} post={post} onResponseHandler={this.onResponseHandler}/>
                );
            }
            
        }
        
    }
}

export default compose(
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
)(TimelineTab);