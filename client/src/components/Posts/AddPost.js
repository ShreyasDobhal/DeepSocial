import React, {Component} from 'react';
import {connect} from 'react-redux';
import axiosExpress from '../../axios/axiosExpress';
import FormData from 'form-data'


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
        console.log("Uploading files",event.target.files);
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
        console.log("File list ",fileList);
        this.setState({
            files:this.state.files.concat(fileList)
        });
        console.log("State file",this.state.files);
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
        console.log("State : ",this.state);
        // return;
        if ((this.state.postBody && this.state.postBody.trim() !== '') || (this.state.files.length>0)) {
            // let postImage = 
            let formData = new FormData();
            // for (let i=0;i<this.state.files.length;i++) {
            //     formData.append('postImages[]',this.state.files[i]);
            // }
            formData.append('postImage',this.state.file);
            formData.append('postBody',this.state.postBody);
            formData.append('tokenId',this.props.tokenId);
            formData.append('authorName',this.props.firstName + ' ' + this.props.lastName);
            formData.append('postDate',new Date());

            axiosExpress.post('/posts/add',formData)
                .then(data => {
                    console.log(data.data);
                    alert("Post published successfully")
                })
                .catch(error => {
                    console.log(error);
                    alert("Failed to publish the post");
                })
            ;
            
            
            // let postImages = [];
            // for (let i=0;i<this.state.files.length;i++) {
            //     postImages.push({
            //         ...this.state.files[i]
            //     });
            // }
            // console.log("Post images : ",postImages);
            // const payload = {
            //     _id: this.props.tokenId,
            //     postBody: this.state.postBody,
            //     postImages: this.state.files,
            //     authorName: this.props.firstName + ' ' + this.props.lastName,
            //     postDate: new Date()
            // }
            // console.log('Payload ',payload);
            // let headers = { 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryWcucdPc0sADgzCK0' };
            // axiosExpress.post('/posts/add',payload,{headers:headers})
            //     .then(data => {
            //         console.log(data.data);
            //         alert("Post published successfully")
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         alert("Failed to publish the post");
            //     })


            // this.props.onAddPostHandler(payload);
            this.setState({
                files: [],
                postBody: null
            });
        }
    }

    render() {

        let imagePreview = null;

        if (this.state.files) {
            console.log("State ",this.state.files);
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