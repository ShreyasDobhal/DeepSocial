import React, {Component} from 'react';
import {connect} from 'react-redux';
import axiosExpress from '../../axios/axiosExpress';

class AddComment extends Component {
    
    state = {
        commentBody: null
    }

    textArea = React.createRef();

    onSubmitComment = (e)=> {
        
        if (this.state.commentBody && this.state.commentBody.trim() !== '') {

            const comment = {
                userId: this.props.userId,
                userDP: this.props.userDP ? this.props.userDP : '',
                userName: this.props.firstName+' '+this.props.lastName,
                postId: this.props.postId,
                commentBody: this.state.commentBody,
                commentDate: new Date(),
                commentTo: this.props.commentId
            }

            console.log(comment);

            axiosExpress.post('/posts/comment-add',comment)
                .then(data => {
                    console.log(data.data);
                    alert("Comment added")
                })
                .catch(error => {
                    console.log(error);
                    alert("Failed to add Comment");
                });
            
            this.setState({
                commentBody: null
            });
        }
        let textarea = this.textArea.current;
        textarea.value = '';
    }

    commentBodyChangeHandler = (e)=> {
        this.setState({
            commentBody: e.target.value
        });
    }


    render() {
        return (
            <div>
                <div className='add-post-container'>
                    <div className='add-post-elements-container'>
                        <div className='profile-image-holder'>
                            <img className='profile-image' src={this.props.userDP ? '/'+this.props.userDP :'/images/profile.png'} alt='userDP'/>
                        </div>
                        <div className='add-post-input-holder'>
                            <textarea ref={this.textArea} className='add-post-input' placeholder='Add a comment' onChange={this.commentBodyChangeHandler}></textarea>
                            <div className='add-post-float-holder'>
                                <i className="fa fa-paper-plane add-post-send add-post-float-btn" aria-hidden="true" onClick={this.onSubmitComment}></i>                                
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        firstName: state.currentUser.fname,
        lastName: state.currentUser.lname,
        userDP: state.currentUser.userDP,
        userId: state.tokenId
    };
}

export default connect(mapStateToProps)(AddComment);