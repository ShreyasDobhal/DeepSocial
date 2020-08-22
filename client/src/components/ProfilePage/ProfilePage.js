import React, {Component} from 'react';
import {connect} from 'react-redux';
import axiosExpress from '../../axios/axiosExpress';

import NavigationBar from '../Navbar/Navbar';

class ProfilePage extends Component {
   
    state = {
        isOwner: false,
        userId: null,
        userName: 'User Name',
        userEmail: 'user@gmail.com',
        userDP: '/images/profile.png',
        userBackgroundImage: '/images/profile-wallpaper.jpg'
    }

    componentDidMount() {
        this.setState({
            userId:this.props.match.params.userId,
            isOwner: this.props.userId === this.props.match.params.userId
        });
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className='profile-container'>
                    <div className='profile-wallpaper-image'>
                        <img src={this.state.userBackgroundImage} alt='user profile background'/>
                    </div>
                    <div className='profile-user-container'>
                        <div className='profile-display-image'>
                            <img src={this.state.userDP}/>
                        </div>
                        <div className='profile-user-info'>
                            <h1 className='profile-name-info'>{this.state.userName}</h1>
                            <p className='profile-email-info'>{this.state.userEmail}</p>
                            <p className='profile-email-info'>{this.state.isOwner ? 'Your page' : 'Viewing other page'}</p>
                        </div>
                    </div>

                </div>
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