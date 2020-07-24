import React, {Component} from 'react';
import {connect} from 'react-redux';
import DragAndDrop from '../HOC/DragAndDrop'

class AddPost extends Component {
    
    state = {
        files:[]
    }

    onChangeHandler = (event)=> {
        console.log("Uploading files",event.target.files);
        let fileList = [...this.state.files];
        fileList.push(URL.createObjectURL(event.target.files[0]));
        this.setState({
            files: fileList
        });
    }

    handleDrop = (files) => {
        console.log("Uploading files",files);
        let fileList = [...this.state.files];
        for (let i=0;i<files.length;i++) {
            if (!files[i].name)
                return;
            fileList.push(URL.createObjectURL(files[i]));
        }
        this.setState({files:fileList});
    }

    render() {

        let imagePreview = null;

        if (this.state.files) {
            let images=this.state.files.map((file,index)=>{
                return (
                    <img src={file} className='add-post-image-preview'/>
                )
            });
            imagePreview = (
                <div className='add-post-preview-holder'>
                    {images}
                </div>
            );
        }
        return (
            <DragAndDrop handleDrop={this.handleDrop}>
                <div className='add-post-container'>
                    <div className='add-post-elements-container'>
                        <div className='profile-image-holder'>
                            <img className='profile-image' src='/images/profile.png'/>
                        </div>
                        <div className='add-post-input-holder'>
                            <textarea className='add-post-input' placeholder='Enter something to post'></textarea>
                            <div className='add-post-float-holder'>
                                <label for='imageUpload'><i className="fa fa-picture-o add-post-send add-post-float-btn" aria-hidden="true"></i></label>
                                <i className="fa fa-paper-plane add-post-send add-post-float-btn" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <input id='imageUpload' className='add-post-image-upload' type='file' onChange={this.onChangeHandler}/>
                    {imagePreview}
                </div>
            </DragAndDrop>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        firstName: state.currentUser.fname,
        lastName: state.currentUser.lname
    };
}

export default connect(mapStateToProps)(AddPost);