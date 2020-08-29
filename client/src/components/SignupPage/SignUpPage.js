import React, { Component } from 'react';
import axiosExpress from '../../axios/axiosExpress';
import {connect} from 'react-redux';

import SignUp from './SignUp';
import * as Actions from '../../actions/actions';

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
        axiosExpress.post('/users/signup',payload)
            .then(data => {
                console.log(data.data);
                alert("Login successful");

                this.props.setTokenId(data.data._id);
                this.props.setUser({
                    fname:data.data.fname,
                    lname:data.data.lname,
                    email:data.data.email
                });
            })
            .catch(error => {
                console.log(error);
                alert("Login failed");
            });
    };

    onSignInHandler = (request) => {

        console.log('Signing in to deepsocial')
        console.log("REQUEST ",request);

        const payload = {
            email: request.email,
            password: request.password
        };
        axiosExpress.post('/users/signin',payload)
            .then(data => {
                console.log(data.data);
                alert("Login successful");

                this.props.setTokenId(data.data._id);
                this.props.setUser({
                    fname:data.data.user.fname,
                    lname:data.data.user.lname,
                    email:data.data.user.email,
                    userDP:data.data.user.userDP
                });
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
        // setTokenId: (tokenId) => dispatch({type:'SET_TOKEN',value:tokenId})
        setTokenId: (tokenId) => dispatch(Actions.setToken(tokenId)),
        setUser: (user) => dispatch(Actions.setUser(user))
    }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(SignUpPage);