import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axiosExpress from '../../axios/axiosExpress';
import PostImageHolder from './PostImageHolder';

class Post extends Component {
    
    onCommentClickHandler = ()=>{
        this.props.history.push('/posts/'+this.props.post._id);
    }

    onResponseHandler = (type) => {
        this.props.onResponseHandler({
            type: type,
            userId: this.props.userId,
            postId: this.props.post._id
        })
    }
    
    render() {
        return (
            <div className='post-container'>
                <div className='post-header-container'>
                    <div className='profile-image-holder'>
                        <img src={(this.props.post.authorDP)?this.props.post.authorDP:''} className='profile-image' alt='userDP' onError={(e)=>{e.target.onerror = null; e.target.src="/images/profile.png"}}/>
                    </div>
                    <div className='post-info-container'>
                        <div className='post-sender-name'><span className='userSpan'>{this.props.post.authorName}</span></div>
                        <div className='post-upload-time'>{(new Date(this.props.post.postDate)).toDateString()}</div>
                    </div>
                </div>
                <div className='post-body-container'>
                    <div className='post-body'>{this.props.post.postBody}</div>
                    <PostImageHolder images={this.props.post.postImages}/>
                </div>
                <div className='post-footer-container'>
                    <div className='post-response-holder'>
                        <i className="fa fa-thumbs-o-up post-response-btn" aria-hidden="true" onClick={() => this.onResponseHandler('like')}></i><span className='post-response-value'>{this.props.post.likes}</span>
                        <i className="fa fa-thumbs-o-down post-response-btn" aria-hidden="true" onClick={() => this.onResponseHandler('dislike')}></i><span className='post-response-value'>{this.props.post.dislikes}</span>
                        <i className="fa fa-comment-o post-response-btn" aria-hidden="true" onClick={this.onCommentClickHandler}></i><span className='post-response-value'>{this.props.post.commentCount}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        userId: state.tokenId
    };
}

export default connect(mapStateToProps)(withRouter(Post));