import React, {Component} from 'react';
import PostImageHolder from './PostImageHolder';

class Post extends Component {
    
    render() {
        return (
            <div className='post-container'>
                <div className='post-header-container'>
                    <div className='profile-image-holder'>
                        <img src={this.props.post.userDP} className='profile-image' alt='userDP'/>
                    </div>
                    <div className='post-info-container'>
                        <div className='post-sender-name'><span className='userSpan'>{this.props.post.userName}</span></div>
                        <div className='post-upload-time'>{this.props.post.date}</div>
                    </div>
                </div>
                <div className='post-body-container'>
                    <div className='post-body'>{this.props.post.body}</div>
                    <PostImageHolder images={this.props.post.postImages}/>
                </div>
                <div className='post-footer-container'>
                    <div className='post-response-holder'>
                        <i className="fa fa-thumbs-o-up post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.post.like}</span>
                        <i className="fa fa-thumbs-o-down post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.post.dislike}</span>
                        <i className="fa fa-comment-o post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.post.commentCount}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;