import React, { Component } from 'react';
import SignUp from './SignUp';
import axios from 'axios';

class SignUpPage extends Component {

    onSignUpHandler = (request) => {

        console.log('Signing up for deepsocial : ')
        console.log("REQUEST ",request);

        const payload = {
            fname: request.fname,
            lname: request.lname,
            email: request.email,
            password: request.password
        };
        axios.post('http://localhost:4000/users/signup',payload)
            .then(data => {
                console.log(data.data);
                alert("Login successful");
            })
            .catch(error => {
                console.log(error);
                alert("Login failed");
            })
    };

    onSignInHandler = (request) => {
        console.log('Signing in to deepsocial',request);
    };
    render() {
        return (
            <SignUp onSignUpHandler={this.onSignUpHandler} onSignInHandler={this.onSignInHandler}/>
        );
    }
}

export default SignUpPage;