import React, {Component} from 'react';
import {connect} from 'react-redux';
import axiosExpress from '../../axios/axiosExpress';
import FormData from 'form-data';
import {ToastContainer, toast} from 'react-toastify';


import DragAndDrop from '../HOC/DragAndDrop';
import EmojiPicker from '../Emoji/EmojiPicker';
import insertAtCaret from '../Emoji/InsertEmoji';

class AddPost extends Component {
    
    state = {
        files:[],
        file: null,
        showEmojiPicker: false,
        postBody: null
    }

    textArea = React.createRef();

    onChangeHandler = (event)=> {
        this.handleDrop(event.target.files);
    }

    handleDrop = (files) => {
        console.log("Uploading files",files);
        let fileList = [];
        for (let i=0;i<files.length;i++) {
            if (!files[i].name)
                return;
            fileList.push(files[i]);
            console.log("Uploaded",files[i].name);
            // fileList.push(URL.createObjectURL(files[i]));
            this.setState({
                file: files[i]
            });
        }
        this.setState({
            files:this.state.files.concat(fileList)
        });
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
        });
    }

    onSubmitPost = ()=>{
        if ((this.state.postBody && this.state.postBody.trim() !== '') || (this.state.files.length>0)) {
            let formData = new FormData();
            
            formData.append('postImage',this.state.file);
            formData.append('postBody',this.state.postBody);
            formData.append('tokenId',this.props.tokenId);
            formData.append('authorName',this.props.firstName + ' ' + this.props.lastName);
            formData.append('postDate',new Date());

            

            axiosExpress.post('/posts/add',formData)
                .then(data => {
                    let textarea = this.textArea.current;
                    textarea.value = '';
                    console.log(data.data);
                    
                    toast.info(<div><h6>Post published successfully</h6></div>,{
                        onClose: () => {window.location.reload();}
                    });

                    this.setState({
                        files: [],
                        postBody: null
                    });
                })
                .catch(error => {
                    console.log(error);
                    toast.error(<div><h4>Server Error !</h4><p>Failed to publish the post</p></div>);
                });
            
            
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

        console.log("USer DP",this.props.userDP);
        return (
            <div>
                <ToastContainer 
                    autoClose={3000}
                    hideProgressBar={true}
                    />
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div className='add-post-container'>
                        <div className='add-post-elements-container'>
                            <div className='profile-image-holder'>
                                <img className='profile-image' src={this.props.userDP ? '/'+this.props.userDP :'/images/profile.png'} alt='userDP'/>
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
        userDP: state.currentUser.userDP,
        tokenId: state.tokenId
    };
}

export default connect(mapStateToProps)(AddPost);