import React, {Component} from 'react';
import Carousel from './Carousel';
import PostImageHolder from './PostImageHolder';

class Post extends Component {
    state = {
        userName: 'Shreyas Dobhal',
        userDP: '/images/profile.jpg',
        date: '21 Jun 2020 at 00:31 AM',
        body: 'Sunset by the ocean.',
        postImages: [
            '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg',
            '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg',
            '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg'
        ],
        like: '1.5k',
        dislike: '25',
        commentCount: '37'
    }

    render() {
        return (
            <div className='post-container'>
                <div className='post-header-container'>
                    <div className='profile-image-holder'>
                        <img src={this.state.userDP} className='profile-image' alt='userDP'/>
                    </div>
                    <div className='post-info-container'>
                        <div className='post-sender-name'><span className='userSpan'>{this.state.userName}</span></div>
                        <div className='post-upload-time'>{this.state.date}</div>
                    </div>
                </div>
                <div className='post-body-container'>
                    <div className='post-body'>{this.state.body}</div>
                    {/* <div className='post-image-holder'>
                        <img src={this.state.postImage} className='post-image' alt='Post'/>
                    </div> */}
                    {/* <Carousel /> */}
                    <PostImageHolder images={this.state.postImages}/>
                </div>
                <div className='post-footer-container'>
                    <div className='post-response-holder'>
                        <i className="fa fa-thumbs-o-up post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.state.like}</span>
                        <i className="fa fa-thumbs-o-down post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.state.dislike}</span>
                        <i className="fa fa-comment-o post-response-btn" aria-hidden="true"></i><span className='post-response-value'>{this.state.commentCount}</span>
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
            