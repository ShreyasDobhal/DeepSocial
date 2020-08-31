import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PostImageHolder from './PostImageHolder';

class Post extends Component {

    state = {
        thumbUp: 'fa-thumbs-o-up',
        thumbDown: 'fa-thumbs-o-down'
    }
    
    onCommentClickHandler = ()=>{
        this.props.history.push('/posts/'+this.props.post._id);
    }

    onResponseHandler = (type) => {
        this.props.onResponseHandler({
            type: type,
            userId: this.props.userId,
            postId: this.props.post._id
        });
        if (type === 'like') {
            this.setState({
                thumbUp : 'fa-thumbs-up',
                thumbDown : 'fa-thumbs-o-down'
            });
        } else if (type === 'dislike') {
            this.setState({
                thumbUp : 'fa-thumbs-o-up',
                thumbDown : 'fa-thumbs-down'
            });
        }
    }

    componentDidMount() {
        if (this.props.post.likedBy.includes(this.props.userId)) {
            this.setState({
                thumbUp : 'fa-thumbs-up',
                thumbDown : 'fa-thumbs-o-down'
            });
        } else if (this.props.post.dislikedBy.includes(this.props.userId)) {
            this.setState({
                thumbUp : 'fa-thumbs-o-up',
                thumbDown : 'fa-thumbs-down'
            });
        }
    }
    
    render() {
        let userDP = (this.props.post.authorDP) ? this.props.post.authorDP : null;
        if (this.props.post.authorCurrentDP && this.props.post.authorCurrentDP.userDP)
                userDP = '/'+this.props.post.authorCurrentDP.userDP;
            else 
                userDP = (this.props.post.authorDP) ? this.props.post.authorDP : '/images/profile.png';
        
        return (
            <div className='post-container'>
                <div className='post-header-container'>
                    <div className='profile-image-holder'>
                        <img src={userDP} className='profile-image' alt='userDP' />
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
                <hr />
                <div className='post-footer-container'>
                    <div className='post-response-holder'>
                        <i className={"fa " + this.state.thumbUp + " post-response-btn"} aria-hidden="true" onClick={() => this.onResponseHandler('like')}></i><span className='post-response-value'>{this.props.post.likes}</span>
                        <i className={"fa " + this.state.thumbDown +" post-response-btn"} aria-hidden="true" onClick={() => this.onResponseHandler('dislike')}></i><span className='post-response-value'>{this.props.post.dislikes}</span>
                        {/* <i className={"fa fa-thumbs-o-up post-response-btn"} aria-hidden="true" onClick={() => this.onResponseHandler('like')}></i><span className='post-response-value'>{this.props.post.likes}</span>
                        <i className={"fa fa-thumbs-o-down post-response-btn"} aria-hidden="true" onClick={() => this.onResponseHandler('dislike')}></i><span className='post-response-value'>{this.props.post.dislikes}</span> */}
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