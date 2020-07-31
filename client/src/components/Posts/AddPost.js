import React, {Component} from 'react';
import {connect} from 'react-redux';

import DragAndDrop from '../HOC/DragAndDrop';
import EmojiPicker from '../Emoji/EmojiPicker';
import insertAtCaret from '../Emoji/InsertEmoji';

class AddPost extends Component {
    
    state = {
        files:[],
        showEmojiPicker: false,
        postBody: null
    }

    textArea = React.createRef();

    onChangeHandler = (event)=> {
        console.log("Uploading files",event.target.files);
        this.handleDrop(event.target.files);
    }

    handleDrop = (files) => {
        console.log("Uploading files",files);
        let fileList = [...this.state.files];
        for (let i=0;i<files.length;i++) {
            if (!files[i].name)
                return;
            fileList.push(files[i]);
            // fileList.push(URL.createObjectURL(files[i]));
        }
        this.setState({files:fileList});
    }

    toggleEmojiPicker = ()=> {
        this.setState({
            showEmojiPicker: !this.state.showEmojiPicker
        });
    }

    onEmojiClick = (event, emojiObject)=> {
        let textarea = this.textArea.current;
        insertAtCaret(textarea,emojiObject.emoji);
    }

    postBodyChangeHandler = (e)=>{
        this.setState({
            postBody: e.target.value
        })
    }

    onSubmitPost = ()=>{
        if ((this.state.postBody && this.state.postBody.trim() !== '') || (this.state.files.length>0)) {
            const payload = {
                _id: this.props.tokenId,
                postBody: this.state.postBody,
                postImages: this.state.files,
                authorName: this.props.firstName + ' ' + this.props.lastName,
                postDate: new Date()
            }
            console.log(payload);
        }
    }

    render() {

        let imagePreview = null;

        if (this.state.files) {
            let images=this.state.files.map((file,index)=>{
                return (
                    <img src={URL.createObjectURL(file)} className='add-post-image-preview' alt='Post' key={index}/>
                )
            });
            imagePreview = (
                <div className='add-post-preview-holder'>
                    {images}
                </div>
            );
        }
        return (
            <div>

                <DragAndDrop handleDrop={this.handleDrop}>
                    <div className='add-post-container'>
                        <div className='add-post-elements-container'>
                            <div className='profile-image-holder'>
                                <img className='profile-image' src='/images/profile.png' alt='userDP'/>
                            </div>
                            <div className='add-post-input-holder'>
                                <textarea ref={this.textArea} className='add-post-input' placeholder='Enter something to post' onChange={this.postBodyChangeHandler}></textarea>
                                <div className='add-post-float-holder'>
                                    <label htmlFor='imageUpload'><i className="fa fa-picture-o add-post-send add-post-float-btn" aria-hidden="true"></i></label>
                                    <i className="fa fa-smile-o add-post-float-btn" aria-hidden="true" onClick={this.toggleEmojiPicker}></i>
                                    <i className="fa fa-paper-plane add-post-send add-post-float-btn" aria-hidden="true" onClick={this.onSubmitPost}></i>
                                    
                                </div>
                            </div>
                        </div>
                        <EmojiPicker isVisible={this.state.showEmojiPicker} onEmojiClick={this.onEmojiClick}/>
                        <input id='imageUpload' className='add-post-image-upload' type='file' onChange={this.onChangeHandler} multiple/>
                        {imagePreview}
                    </div>
                
                </DragAndDrop>
                
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        firstName: state.currentUser.fname,
        lastName: state.currentUser.lname,
        tokenId: state.tokenId
    };
}

export default connect(mapStateToProps)(AddPost);