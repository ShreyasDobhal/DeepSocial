import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormData from 'form-data'
import axiosExpress from '../../axios/axiosExpress';
import ReactCrop from 'react-image-crop';
import {ToastContainer, toast} from 'react-toastify';
import { Badge } from 'reactstrap';

import NavigationBar from '../Navbar/Navbar';
import LoadingSpinner from '../Loader/LoadingSpinner';
import NotFound from '../Error/NotFound';
import DragAndDrop from '../HOC/DragAndDrop';
import PhotoGallery from './PhotoGallery';
import TimelineTab from './TimelineTab';
import AboutTab from './AboutTab';
import FriendsTab from './FriendsTab';
import RequestsTab from './RequestsTab';
import TabbedView from '../Utility/TabbedView';
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
        userDPsrc: null,
        croppedImageBlob: null,

        userId: null,
        userName: 'User Name',
        userEmail: 'user@gmail.com',
        userDP: null,
        userBackgroundImage: '/images/profile-wallpaper.jpg',

        imageFile: null,

        friends: [],
        friendMessage: null,
        friendMethod: 'request',
        friendRequests: []
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
                    userDPsrc: user.data.userDP ? '/'+user.data.userDP : '/images/default.png',
                    friends: user.data.friends,
                    friendRequests: user.data.friendRequests,
                    isLoaded: true
                });
            })
            .catch(data => {
                this.setState({
                    notFound: true,
                    isLoaded: true
                });
            });
        
            axiosExpress.post('/friends/relation/'+this.props.match.params.userId, {userId: this.props.userId})
                .then(data => {
                    console.log('Relation ',data.data);
                    this.setState({
                        friendMessage: data.data.actionMessage,
                        friendMethod: data.data.actionMethod
                    });
                })
    }

    onChangeHandler = (event)=> {
        this.handleDrop(event.target.files);
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
                toast.info(<div><h6>Profile picture updated successfully</h6></div>,{
                    onClose: () => {window.location.reload()}
                });
            })
            .catch( error => {
                console.log(error);
                toast.error(<div><h4>Server Error !</h4><p>Failed to update profile picture</p></div>);
            });
        
        this.setState({
            modalToggle: false
        });
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

    handleFriendMethod = () => {
        axiosExpress.post('/friends/'+this.state.friendMethod+'/'+this.state.userId,{friendId: this.props.userId})
            .then(doc => {
                axiosExpress.post('/friends/relation/'+this.state.userId, {userId: this.props.userId})
                    .then(data => {
                        console.log('Relation ',data.data);
                        this.setState({
                            friendMessage: data.data.actionMessage,
                            friendMethod: data.data.actionMethod
                        });
                    })
            })
            .catch(error => {
                // console.log(error);
                if (error.response && error.response.data.message) {
                    console.log(error.response.data.message);
                }
                toast.error(<div><h4>Server Error !</h4><p>Failed to complete the action</p></div>);
            })
    }

    render() {

        let tabPages = [];
        let tabTitles = [];


        if (this.state.isOwner) {
            tabPages.push(<RequestsTab userId={this.state.userId} />);
            tabTitles.push('Requests');
        }

        if (this.state.isOwner || this.state.friends.length > 0) {
            tabPages.push(<FriendsTab friends={this.state.friends} userId={this.state.userId} />);
            tabTitles.push('Friends');
        }

        tabPages.push(<PhotoGallery userId={this.state.userId} />);
        tabTitles.push(<i className="fa fa-camera" aria-hidden="true"></i>);
        
        tabPages.push(<AboutTab isOwner={this.state.isOwner} userId={this.state.userId}/>);
        tabTitles.push('About');

        tabPages.push(<TimelineTab userId={this.state.userId}/>);
        tabTitles.push('Timeline');

        

        let uploadUserDPModal=null;

        if (this.state.isOwner) {
            uploadUserDPModal = (
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
                            <input type='file' onChange={this.onChangeHandler} />
                            <div className='text-center'>
                                <button className='btn btn-primary my-2' onClick={this.onUploadDPHandler}>Done</button>
                            </div>
                        </div>
                        
                    </DragAndDrop>
                </Modal>
            );
        } else {

        }

        let pageHolder = null;
        if (this.state.isLoaded) {
            if (!this.state.notFound) {
                pageHolder = (
                    <div className='profile-container'>
                        <div className='profile-cover-image'>
                            <img src={this.state.userBackgroundImage} alt='user profile background'/>
                        </div>
                        <div className='profile-user-container'>
                            <div className={this.state.isOwner?'profile-display-image image-overlay-container':'profile-display-image'}>
                                <img className="overlay-parent" src={this.state.userDP ? this.state.userDP : '/images/profile.png'} onClick={this.modalHandler} alt='User DP'/>
                                <div className="overlay-holder">
                                    <div className="profile-display-image-overlay">Upload</div>
                                </div>
                            </div>
                            <div className='profile-user-info'>
                                <h1 className='profile-name-info'>{this.state.userName}</h1>
                                <p className='profile-email-info'>{this.state.userEmail}</p>
                                {this.state.isOwner ? null : 
                                    (<h5 className='profile-friend-info'> <Badge color='info' onClick={this.handleFriendMethod}>{this.state.friendMessage}</Badge></h5>)
                                }
                            </div>

                        </div>
                        

                        <TabbedView pageNames={tabTitles} pageComponents={tabPages} />
                        

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
                <ToastContainer 
                    autoClose={3000}
                    hideProgressBar={true}
                    />
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setUser: (user) => dispatch(Actions.setUser(user))
//     }
// }

export default connect(mapStateToProps)(ProfilePage);