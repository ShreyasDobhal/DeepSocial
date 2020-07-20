import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddPost extends Component {
    render() {
        return (
            <div className='add-post-container'>
                <div className='add-post-elements-container'>
                    <div className='profile-image-holder'>
                        <img className='profile-image' src='/images/profile.png'/>
                    </div>
                    <div className='add-post-input-holder'>
                        <textarea className='add-post-input' placeholder='Enter something to post'></textarea>
                        <div className='add-post-float-holder'>
                            <i className="fa fa-picture-o add-post-send add-post-float-btn" aria-hidden="true"></i>
                            <i className="fa fa-paper-plane add-post-send add-post-float-btn" aria-hidden="true"></i>
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
        lastName: state.currentUser.lname
    };
}

export default connect(mapStateToProps)(AddPost);