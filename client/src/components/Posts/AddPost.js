import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddPost extends Component {
    
    state = {
        file:null
    }

    onChangeHandler = (event)=> {
        console.log(event.target.files[0]);
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    render() {

        let imagePreview = null;

        if (this.state.file) {
            imagePreview = (
                <div className='add-post-preview-holder'>
                    <img src={this.state.file} className='add-post-image-preview'/>
                </div>
            );
        }
        return (
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