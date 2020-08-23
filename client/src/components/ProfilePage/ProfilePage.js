import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormData from 'form-data'
import axiosExpress from '../../axios/axiosExpress';

import NavigationBar from '../Navbar/Navbar';
import LoadingSpinner from '../Loader/LoadingSpinner';
import NotFound from '../Error/NotFound';
import DragAndDrop from '../HOC/DragAndDrop';
import PhotoGallery from './PhotoGallery';
import Post from '../Posts/Post';
import TabbedView from '../Utility/TabbedView';

class ProfilePage extends Component {
   
    state = {
        notFound: false,
        isLoaded: false,
        isOwner: false,
        userId: null,
        userName: 'User Name',
        userEmail: 'user@gmail.com',
        userDP: null,
        userBackgroundImage: '/images/profile-wallpaper.jpg',
        imageFile: null,
        posts: []
        // userBackgroundImage: '/uploads/2020-08-10T16:25:35.197ZIMG-20191007-WA0189.jpg'
    }

    componentDidMount() {
        this.setState({
            userId: this.props.match.params.userId,
            isOwner: this.props.userId === this.props.match.params.userId
        });

        axiosExpress.get('/users/'+this.props.match.params.userId)
            .then(user => {
                console.log("User",user.data);
                this.setState({
                    userName: user.data.fname + ' ' + user.data.lname,
                    userEmail: user.data.email,
                    userDP: user.data.userDP,
                    isLoaded: true
                });
            })
            .catch(data => {
                this.setState({
                    notFound: true,
                    isLoaded: true
                });
            });

        // TODO: Get posts of user only
        axiosExpress.get('/posts')
            .then(posts=>{
                this.setState({
                    posts: posts.data
                });
                console.log("Posts ",posts.data);
            });
    }

    handleDrop = (files) => {
        
        if (!files[0].name)
        return;
        console.log("Uploading file",files[0]);
        this.setState({
            imageFile: files[0]
        });
    }

    // temp function to handle upload
    onClick = ()=> {

        let formData = new FormData();
            
        formData.append('userId',this.props.userId);
        formData.append('userImage',this.state.imageFile);

        axiosExpress.post('/users/add-image',formData)
            .then( doc => {
                console.log(doc);
            })
            .catch( error => {
                console.log(error);
            });
    }

    // Post like - dislike handler
    onResponseHandler = (response) => {
        const payload = {
            postId: response.postId,
            userId: response.userId
        }
        if (response.type === 'like') {
            axiosExpress.post('/posts/post-like',payload)
            .then(doc => {
                console.log("Received payload",doc);
                let newPosts = this.state.posts.map(post => {
                    if (doc.data.data._id === post._id) {
                        let newPost = {
                            ...post
                        };
                        newPost.likes += doc.data.data.like;
                        newPost.dislikes += doc.data.data.dislike;
                        return newPost;
                    } else {
                        return post;
                    }
                });

                this.setState({
                    posts: newPosts
                });
            })
        } else if (response.type === 'dislike') {
            axiosExpress.post('/posts/post-dislike',payload)
            .then(doc => {
                console.log("Received payload",doc);
                let newPosts = this.state.posts.map(post => {
                    if (doc.data.data._id === post._id) {
                        let newPost = {
                            ...post
                        };
                        newPost.likes += doc.data.data.like;
                        newPost.dislikes += doc.data.data.dislike;
                        return newPost;
                    } else {
                        return post;
                    }
                });

                this.setState({
                    posts: newPosts
                });
            })
        }
    }

    render() {

        const aboutPage = (
            <div className='profile-about-container'>
                <p><span className='iconSpan'><i className="fa fa-map-marker" aria-hidden="true"></i></span> Dehradun, Uttarakhand</p>
                <p><span className='iconSpan'><i className="fa fa-phone" aria-hidden="true"></i></span> +91-9876543210</p>
                <p><span className='iconSpan'><i className="fa fa-briefcase" aria-hidden="true"></i></span> Member Technical at DEShaw</p>
                <p><span className='iconSpan'><i className="fa fa-pencil" aria-hidden="true"></i></span> Loves to code</p>
                <p><span className='iconSpan'><i class="fa fa-graduation-cap" aria-hidden="true"></i></span> Studied from MNNIT Allahabad</p>
                <p><span className='iconSpan'><i className="fa fa-birthday-cake" aria-hidden="true"></i></span> 8th October 1998</p>
                <p className='profile-email-info'>{this.state.isOwner ? 'Your page' : 'Viewing other page'}</p>
            </div>
        );

        const timeLinePage = this.state.posts.map(post=>{
            return (
                <Post post={post} onResponseHandler={this.onResponseHandler}/>
            );
        });
        let page2 = (<div>Hello Page 2</div>);
        let page3 = (<div>Hello Page 3</div>);
        let pageHolder = null;
        if (this.state.isLoaded) {
            if (!this.state.notFound) {
                pageHolder = (
                    <div className='profile-container'>
                        <div className='profile-cover-image'>
                            <img src={this.state.userBackgroundImage} alt='user profile background'/>
                        </div>
                        <div className='profile-user-container'>
                            <div className='profile-display-image image-overlay-container'>
                                <img className="overlay-parent" src={this.state.userDP ? this.state.userDP : '/images/profile.png'} alt='User DP'/>
                                <div class="overlay-holder">
                                    <div class="profile-display-image-overlay">Upload</div>
                                </div>
                            </div>
                            <div className='profile-user-info'>
                                <h1 className='profile-name-info'>{this.state.userName}</h1>
                                <p className='profile-email-info'>{this.state.userEmail}</p>
                            </div>

                        </div>
                        

                        <TabbedView pageNames={[<i class="fa fa-camera" aria-hidden="true"></i>, 'Timeline', 'About', 'Friends']} 
                                    pageComponents={[<PhotoGallery/>, timeLinePage, aboutPage, page3]}/>

                        






                        {/* <button onClick={this.onClick}>Upload</button>
                        <DragAndDrop handleDrop={this.handleDrop}>
                            <div style={{height:'500px',border:'2px solid red'}}>

                            </div>
                        </DragAndDrop> */}
                        

                    </div>
                );
            } else {
                pageHolder = (<NotFound />);
            }
        } else {
            pageHolder = (<LoadingSpinner />);
        }

        return (
            <div>
                <NavigationBar/>
                {pageHolder}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.tokenId
    }
}

export default connect(mapStateToProps)(ProfilePage);