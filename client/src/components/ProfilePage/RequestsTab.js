import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import axiosExpress from '../../axios/axiosExpress';
import {getFriendRequestsQuery} from '../../queries/queries';
import LoadingSpinner from '../Loader/LoadingSpinner';
import {toast} from 'react-toastify';
import {handleUserSpanClick}  from '../../utility/UserSpanAction';

class RequestsTab extends Component {

    state = {
        friendRequests: null
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.getFriendRequestsQuery.loading) {
            if (nextProps.getFriendRequestsQuery.user.friendRequests !== this.state.friendRequests) {
                console.log("Friends Requests",this.props);
                this.setState({friendRequests: nextProps.getFriendRequestsQuery.user.friendRequests});
            }
        }
    }

    handleCancelButton = (friendId) => {
        axiosExpress.post('/friends/cancel/'+this.props.userId,{friendId})
            .then(doc => {
                console.log("Friend Request cancelled");
                const newFriendRequests = this.state.friendRequests.filter(friendRequest => friendRequest._id !== friendId);
                this.setState({friendRequests: newFriendRequests});
                toast.info(<div><h6>Friend Request cancelled successfully</h6></div>);
            })
            .catch(error => {
                if (error.response && error.response.data.message) {
                    console.log(error.response.data.message);
                }
                toast.error(<div><h4>Server Error !</h4><p>Failed to cancel friend request</p></div>);
            });
    }

    handleAcceptButton = (friendId) => {
        axiosExpress.post('/friends/add/'+this.props.userId,{friendId})
            .then(doc => {
                console.log("Friend Request accepted");
                const newFriendRequests = this.state.friendRequests.filter(friendRequest => friendRequest._id !== friendId);
                this.setState({friendRequests: newFriendRequests});
                toast.info(<div><h6>Friend Request accepted</h6></div>);
            })
            .catch(error => {
                if (error.response && error.response.data.message) {
                    console.log(error.response.data.message);
                }
                toast.error(<div><h4>Server Error !</h4><p>Failed to accept friend request</p></div>);
            });
    }

    render () {
        
        
        if (this.props.getFriendRequestsQuery.loading || !this.state.friendRequests) {
            return (<LoadingSpinner />);
        } else {
            let friendRequests = this.state.friendRequests;
            if (!friendRequests || friendRequests.length === 0) {
                return (
                    <div className='text-center'>
                        <img className='mt-5' src='/images/no-requests.png' alt='No friend requests found'/>
                    </div>
                );
            } else {
                const friendRequestsComponent =  friendRequests.map(friendRequest => {
                    const userDP = friendRequest.userDP ? '/'+friendRequest.userDP : '/images/profile.png';
                    const userInfo = friendRequest.info.work || friendRequest.info.education || friendRequest.info.about || friendRequest.info.location || friendRequest.info.birthday || friendRequest.info.phone;
                    return (
                        <div className='friend-request-card'>
                            <div className='profile-image-holder'>
                                <img src={userDP} className='profile-image-large' alt='userDP' />
                            </div>
                            <div className='friend-request-info-container'>
                                <span className='userSpan' onClick={() => handleUserSpanClick(friendRequest._id)}>{friendRequest.fname + ' ' + friendRequest.lname}</span>
                                <p className='friend-request-about'>{userInfo}</p>
                            </div>
                            <div className='friend-request-controls-container'>
                                <button onClick={() => this.handleCancelButton(friendRequest._id)} className='btn'>Cancel</button>
                                <a href={'/profile/'+friendRequest._id} className='btn'>View</a>
                                <button onClick={() => this.handleAcceptButton(friendRequest._id)} to='' className='btn'>Accept</button>
                            </div>
                        </div>
                    );
                });

                return (
                    <div className='friend-requests-container'>
                        {/* <ToastContainer 
                            autoClose={2000}
                            hideProgressBar={true}
                            /> */}
                        {friendRequestsComponent}
                    </div>
                )
            }
            
            
        }
        
    }
}

export default compose(
    graphql(getFriendRequestsQuery, {
        options: (props) => {
            return {
                variables: {
                    _id: props.userId
                }
            }
        },
        name: "getFriendRequestsQuery"
    })
)(RequestsTab);