import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import axiosExpress from '../../axios/axiosExpress';
import {connect} from 'react-redux';
import {handleUserSpanClick}  from '../../utility/UserSpanAction';

class FriendCard extends Component {

    state = {
        friendRelation: null,
        friendMessage: null,
        friendMethod: 'request'
    }

    componentDidMount() {
        
        axiosExpress.post('/friends/relation/'+this.props.friend._id, {userId: this.props.viewerId})
            .then(data => {
                console.log('Relation ',data.data);
                this.setState({
                    friendRelation: data.data.relation,
                    friendMessage: data.data.actionMessage,
                    friendMethod: data.data.actionMethod
                });
            });
    }

    handleFriendMethod = () => {
        axiosExpress.post('/friends/'+this.state.friendMethod+'/'+this.props.friend._id,{friendId: this.props.viewerId})
            .then(doc => {
                axiosExpress.post('/friends/relation/'+this.props.friend._id, {userId: this.props.viewerId})
                    .then(data => {
                        console.log('Relation ',data.data);
                        this.setState({
                            friendRelation: data.data.relation,
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
            })
    }

    render() {
        const userDP = this.props.friend.userDP ? '/'+this.props.friend.userDP : '/images/profile.png';
        let actionButton = null;
        if (this.state.friendRelation !== 'Self') {
            actionButton = <Badge style={{cursor: 'pointer'}} color='info' onClick={this.handleFriendMethod}>{this.state.friendMessage}</Badge>
        }
        return (
            <div className='friend-card'>
                <div className='profile-image-holder'>
                    <img src={userDP} className='profile-image' alt='userDP' />
                </div>
                <div className='friend-card-info-container'>
                    <div className='post-sender-name'><span className='userSpan' onClick={() => handleUserSpanClick(this.props.friend._id)}>{this.props.friend.fname + ' ' + this.props.friend.lname}</span></div>
                    {actionButton}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        viewerId: state.tokenId
    }
}


export default connect(mapStateToProps)(FriendCard);