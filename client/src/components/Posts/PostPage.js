import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';

import NavigationBar from '../Navbar/Navbar';
import Post from './Post';
import NotFound from '../Error/NotFound';
import LoadingSpinner from '../Loader/LoadingSpinner';
import AddComment from './AddComment';
import Comment from './Comment';

class PostPage extends Component {
    
    state = {
        postId: null,
        loaded: false,
        notFound: false,
        post: null
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
                if (doc.data.data._id === this.state.post._id) {
                    let newPost = {
                        ...this.state.post
                    };
                    newPost.likes += doc.data.data.like;
                    newPost.dislikes += doc.data.data.dislike;
                    this.setState({
                        post: newPost
                    });

                }

            });
        } else if (response.type === 'dislike') {
            axiosExpress.post('/posts/post-dislike',payload)
            .then(doc => {
                console.log("Received payload",doc);
                if (doc.data.data._id === this.state.post._id) {
                    let newPost = {
                        ...this.state.post
                    };
                    newPost.likes += doc.data.data.like;
                    newPost.dislikes += doc.data.data.dislike;
                    this.setState({
                        post: newPost
                    });
                }
                
            });
        }
    }

    componentDidMount() {
        this.setState({
            postId:this.props.match.params.postId
        });

        axiosExpress.get('/posts/'+this.props.match.params.postId)
            .then(post=>{
                this.setState({
                    post: post.data,
                    loaded: true
                });
            })
            .catch(error=>{
                this.setState({
                    loaded: true,
                    notFound: true
                })
            });
    }

    render() {
        let PostHolder = null;
        let CommentHolder = null;
        let AddCommentHolder = null;

        if (this.state.loaded) {
            if (this.state.notFound) {
                PostHolder = (<NotFound />);
            } else {
                console.log("Post",this.state.post);
                PostHolder = (<Post post={this.state.post} onResponseHandler={this.onResponseHandler}/>);
                AddCommentHolder = (<AddComment postId={this.state.postId}/>);
                CommentHolder = (
                    <div>
                        {this.state.post.comments.map((comment,index)=>{
                            return (
                                <div className='comment-container' key={comment._id}>
                                    <Comment comment={comment} commentId={comment._id} postId={this.state.postId} />
                                </div>
                            )
                        })}
                    </div>
                );
            }
        } else {
            PostHolder = (<LoadingSpinner />);
        }


        return (
            <div>
                <NavigationBar />
                <div className='scroll-container'>
                    {PostHolder}
                    {AddCommentHolder}
                    <div className='comment-holder'>
                        {CommentHolder}
                    </div>
                </div>
            </div>
        );
    }
}

export default PostPage;