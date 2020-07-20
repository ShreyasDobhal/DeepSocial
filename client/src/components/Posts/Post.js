import React, {Component} from 'react';

class Post extends Component {
    state = {
        userName: 'Shreyas Dobhal',
        userDP: '/images/profile.png',
        date: '21 Jun 2020 00:31 AM',
        body: 'Sunset by the ocean.',
        postImage: '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg'
    }

    render() {
        return (
            <div className='post-container'>
                <div className='post-header-container'>
                    <div className='profile-image-holder'>
                        <img src={this.state.userDP} className='profile-image'/>
                    </div>
                    <div className='post-info-container'>
                        <div className='post-sender-name'><span className='userSpan'>{this.state.userName}</span></div>
                        <div className='post-upload-time'>{this.state.date}</div>
                    </div>
                </div>
                <div className='post-body-container'>
                    <div className='post-body'>{this.state.body}</div>
                    <div className='post-image-holder'>
                        <img src={this.state.postImage} className='post-image' alt='post-image'/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Post;



// 'add-post-container'
//     'add-post-elements-container'
//         'profile-image-holder'
//             'profile-image'
        
//         'add-post-input-holder'
//             'add-post-input'
//             'add-post-float-holder'
//                 "add-post-send-img add-post-float-btn"
//                 "add-post-send add-post-float-btn"
            