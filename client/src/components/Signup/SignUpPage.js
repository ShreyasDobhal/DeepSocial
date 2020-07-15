import React, { Component } from 'react';
import SignUp from './SignUp';

class SignUpPage extends Component {
    onSignUpHandler = () => {
        console.log('Signing up for deepsocial');
    };
    onSignInHandler = () => {
        console.log('Signing in to deepsocial');
    };
    render() {
        return (
            <SignUp onSignUpHandler={this.onSignUpHandler} onSignInHandler={this.onSignInHandler}/>
        );
    }
}

export default SignUpPage;