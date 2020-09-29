import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';
import Post from '../Posts/Post';

class TimelineTab extends Component {

    state = {
        posts: []
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

    componentDidMount() {
        axiosExpress.get('/posts')
            .then(posts=>{
                let newPosts = posts.data.filter(post => post.authorId === this.props.userId);
                this.setState({
                    posts: newPosts
                });
                console.log("Posts ",posts.data);
            });
    }

    render() {
        return this.state.posts.map(post=>
            <Post key={post._id} post={post} onResponseHandler={this.onResponseHandler}/>
        );
    }
}

export default TimelineTab;