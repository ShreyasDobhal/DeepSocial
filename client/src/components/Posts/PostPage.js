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
                PostHolder = (<Post post={this.state.post} />);
                AddCommentHolder = (<AddComment postId={this.state.postId}/>);
                CommentHolder = (
                    <div>
                        {this.state.post.comments.map((comment,index)=>{
                            return (
                                <div className='comment-container'>
                                    <Comment comment={comment} key={comment._id} commentId={comment._id} postId={this.state.postId}/>
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