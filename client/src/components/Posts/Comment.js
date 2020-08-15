import React, {Component} from 'react';
import AddComment from './AddComment';

class Comment extends Component {

    state = {
        commentType: 0,
        toggleReply: false
    }

    onReplyButtonHandler = () => {
        this.setState({
            toggleReply: !this.state.toggleReply
        })
    }
 
    render() {
        
        let replyHolder = [];
        if (this.props.comment.replies) {
            for (let i=0;i<this.props.comment.replies.length;i++) {
                replyHolder.push(<Comment comment={this.props.comment.replies[i]} commentId={this.props.commentId} postId={this.props.postId}/>)
            }
        }

        let addReplyHolder = (this.state.toggleReply) ? (
            <AddComment postId={this.props.postId} commentId={this.props.commentId} />
        ) : null;

        return (
            <div>

                <div className='post-container'>
                    <div className='comment-content-holder'>
                        <div>
                            <div className='post-header-container'>
                                <div className='profile-image-holder'>
                                    <img src={(this.props.comment.userDP) ? this.props.comment.userDP : ''} className='profile-image' alt='userDP' onError={(e)=>{e.target.onerror = null; e.target.src="/images/profile.png"}}/>
                                </div>
                                <div className='post-info-container'>
                                    <div className='post-sender-name'><span className='userSpan'>{this.props.comment.userName}</span></div>
                                    <div className='post-upload-time'>{(new Date(this.props.comment.commentDate)).toDateString()}</div>
                                </div>
                            </div>
                            <div className='post-body-container'>
                                <div className='post-body'>{this.props.comment.commentBody}</div>
                            </div>
                            <div className='post-footer-container'>
                                <div className='post-response-holder'>
                                    <button className='comment-reply-button' onClick={this.onReplyButtonHandler}><i class="fa fa-reply" aria-hidden="true"></i> Reply</button>
                                    {/* <i className="fa fa-thumbs-o-up post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.comment.likes}</span> */}
                                    {/* <i className="fa fa-thumbs-o-down post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.comment.dislikes}</span> */}
                                    {/* <i className="fa fa-comment-o post-response-btn" aria-hidden="true" onClick={this.onCommentClickHandler}></i><span className='post-response-value'>{this.props.post.commentCount}</span> */}
                                </div>
                            </div>
                        </div>
                        <div className='comment-type' style={{borderColor:['#ffffff00','#e47877','#61bd89','#f3c66b','#3877adb8'][this.state.commentType]}}></div>
                    </div>
                    
                </div>

                {addReplyHolder}

                <div className='reply-container'>
                    {replyHolder}
                </div>

                
            </div>
        )
    }
}

export default Comment;