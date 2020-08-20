import React, {Component} from 'react';

import NavigationBar from '../Navbar/Navbar';

class ProfilePage extends Component {
   
    state = {
        userName: 'User Name',
        userEmail: 'user@gmail.com',
        userDP: '/images/profile.png',
        userBackgroundImage: '/images/profile-wallpaper.jpg'
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
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ProfilePage;