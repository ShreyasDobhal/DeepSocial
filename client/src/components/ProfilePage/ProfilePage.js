import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormData from 'form-data'
import axiosExpress from '../../axios/axiosExpress';
import ReactCrop from 'react-image-crop';
import * as Actions from '../../actions/actions';

import NavigationBar from '../Navbar/Navbar';
import LoadingSpinner from '../Loader/LoadingSpinner';
import NotFound from '../Error/NotFound';
import DragAndDrop from '../HOC/DragAndDrop';
import PhotoGallery from './PhotoGallery';
import Post from '../Posts/Post';
import TabbedView from '../Utility/TabbedView';
import Jumbotron from '../Utility/Jumbotron';
import Modal from '../Utility/Modal';

class ProfilePage extends Component {
   
    state = {
        notFound: false,
        isLoaded: false,
        isOwner: false,

        modalToggle: false,

        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1
        },
        userDPsrc: '/images/default.png',
        croppedImageBlob: null,

        userId: null,
        userName: 'User Name',
        userEmail: 'user@gmail.com',
        userDP: null,
        userBackgroundImage: '/images/profile-wallpaper.jpg',

        imageFile: null,

        posts: []
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
                    userDP: user.data.userDP ? '/'+user.data.userDP : null,
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
            imageFile: files[0],
            userDPsrc: URL.createObjectURL(files[0])
        });
    }

    onUploadDPHandler = ()=> {
        if (!this.state.imageFile) {
            this.setState({
                modalToggle: false
            });
            return;
        }

        let formData = new FormData();
            
        formData.append('userId',this.props.userId);
        formData.append('userImage',this.state.croppedImageBlob,"userDP.jpg");

        axiosExpress.post('/users/set-userdp',formData)
            .then( doc => {
                console.log(doc);
            })
            .catch( error => {
                console.log(error);
            });
        
        this.setState({
            modalToggle: false
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

    modalHandler = (e) => {
        e.preventDefault();
        this.setState({
            modalToggle: !this.state.modalToggle
        });
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({
            crop: crop
        });
    }

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageBlob = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageBlob });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                resolve(blob);
            }, 'image/jpeg');
        });
    }

    onCropDone = ()=> {
        console.log("Image URL ",this.state.croppedImageUrl);
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
        
        // TODO: Compelete friends page
        const friendsPage = (
            <div>
                <Jumbotron title={(<span>0 Friends <i className="fa fa-frown-o" aria-hidden="true"></i></span>)} 
                           body1="You haven't added any friends yet. Browse for your friends using search option on the Navigation Bar."
                           body2="Or have a photo of someone but do not remember his or her name ? Use our find by face feature now."
                           btnText="Find Friends"
                           goto="/search"/>
            </div>
        );
        
        
        const uploadUserDPModal = (
            <Modal show={this.state.modalToggle} modalClosed={this.modalHandler}>
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div className='upload-userdp-modal-container'>
                        <h4>Upload a Photo</h4>
                        <div className='upload-userdp-preview-holder'>
                            <ReactCrop 
                                src={this.state.userDPsrc}
                                onChange={this.onCropChange}
                                onComplete={this.onCropComplete}
                                onImageLoaded={this.onImageLoaded}
                                crop={this.state.crop}
                                ruleOfThirds
                                />
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-primary my-2' onClick={this.onUploadDPHandler}>Done</button>
                        </div>
                    </div>
                    
                </DragAndDrop>
            </Modal>
        );


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
                                <img className="overlay-parent" src={this.state.userDP ? this.state.userDP : '/images/profile.png'} onClick={this.modalHandler} alt='User DP'/>
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
                                    pageComponents={[<PhotoGallery/>, timeLinePage, aboutPage, friendsPage]}/>

                        




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
                {uploadUserDPModal}
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

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(Actions.setUser(user))
    }
}

export default connect(mapStateToProps)(ProfilePage);