import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import SignUp from './SignUp';

class SignUpPage extends Component {

    onSignUpHandler = (request) => {

        console.log('Signing up for deepsocial')
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

                this.props.setTokenId(data.data._id);
            })
            .catch(error => {
                console.log(error);
                alert("Login failed");
            })
    };

    onSignInHandler = (request) => {

        console.log('Signing in to deepsocial')
        console.log("REQUEST ",request);

        const payload = {
            email: request.email,
            password: request.password
        };
        axios.post('http://localhost:4000/users/signin',payload)
            .then(data => {
                console.log(data.data);
                alert("Login successful");

                this.props.setTokenId(data.data._id);
            })
            .catch(error => {
                console.log(error);
                alert("Login failed");
            })
    };
    render() {
        return (
            <SignUp onSignUpHandler={this.onSignUpHandler} onSignInHandler={this.onSignInHandler}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tokenId: state.tokenId,
        isSignedIn: state.isSignedIn
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        setTokenId: (tokenId) => dispatch({type:'SET_TOKEN',value:tokenId})
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(SignUpPage);