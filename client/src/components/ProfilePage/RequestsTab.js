import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getFriendRequestsQuery} from '../../queries/queries';
import LoadingSpinner from '../Loader/LoadingSpinner';

class RequestsTab extends Component {

    render () {
        console.log("Friends Requests",this.props);
        
        if (this.props.getFriendRequestsQuery.loading) {
            return (<LoadingSpinner />);
        } else {
            let friendRequests = this.props.getFriendRequestsQuery.user.friendRequests;
            if (!friendRequests || friendRequests.length === 0) {
                // TODO: Add page for no friend requests
                return (
                    <div>No Friend Requests Found !</div>
                );
            } else {
                const friendRequestsComponent =  friendRequests.map(friendRequest => {
                    const userDP = friendRequest.userDP ? '/'+friendRequest.userDP : '/images/profile.png';
                    return (
                        <div className='friend-request-card'>
                            <div className='profile-image-holder'>
                                <img src={userDP} className='profile-image-large' alt='userDP' />
                            </div>
                            <div className='friend-request-info-container'>
                                <span className='userSpan'>{friendRequest.fname + ' ' + friendRequest.lname}</span>
                                <p>I am a MBA from Graphic Era university I live in Dehradun and work at HDFC. I did my schooling from St. Josephs Academy and graduation from DU Math Honors</p>
                            </div>
                            <div className='friend-request-controls-container'>
                                <button className='btn'>Cancel</button>
                                <button className='btn'>View</button>
                                <button className='btn'>Accept</button>
                            </div>
                        </div>
                    );
                });

                return (
                    <div className='friend-requests-container'>
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