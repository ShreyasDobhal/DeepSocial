import React, {Component} from 'react';

class Comment extends Component {
    render() {
        console.log("Post msg ",this.props.comment.commentBody);
        
        let replyHolder = null;
        if (this.props.comment.replies) {
            console.log("Reply length ",this.props.comment.replies.length);
            for (let i=0;i<this.props.comment.replies.length;i++) {
                replyHolder = (<Comment comment={this.props.comment.replies[i]}/>)
            }
        }

        return (
            <div>

                <div className='post-container'>
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
                        {/* <PostImageHolder images={this.props.post.postImages}/> */}
                    </div>
                    <div className='post-footer-container'>
                        <div className='post-response-holder'>
                            {/* <i className="fa fa-thumbs-o-up post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.comment.likes}</span> */}
                            {/* <i className="fa fa-thumbs-o-down post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.props.comment.dislikes}</span> */}
                            {/* <i className="fa fa-comment-o post-response-btn" aria-hidden="true" onClick={this.onCommentClickHandler}></i><span className='post-response-value'>{this.props.post.commentCount}</span> */}
                        </div>
                    </div>
                </div>

                <div className='comment-container'>
                    {replyHolder}
                </div>
                {/* { this.props.comment.replies.map((reply,index)=>{
                    return (
                        <Comment comment={reply} ket={index}/>
                    )
                })} */}
                {/* { this.props.comment.replies ? <Comment comment={this.props.comment.replies} /> : null } */}
            </div>
        )
    }
}

export default Comment;