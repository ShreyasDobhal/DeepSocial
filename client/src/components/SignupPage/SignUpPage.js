import React, { Component } from 'react';
import axiosExpress from '../../axios/axiosExpress';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';


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
                toast(<div><h4> Welcome !</h4><p> New account created successfully</p></div>,{
                    onClose: () => {
                        this.props.setTokenId(data.data._id);
                        this.props.setUser({
                            fname:data.data.fname,
                            lname:data.data.lname,
                            email:data.data.email
                        });
                    }
                });
            })
            .catch(error => {
                console.log(error);
                let errorHead = 'Server Error !';
                let errorMsg = 'Sign-up failed';
                if (error.response.data.message) {
                    errorHead = 'Sign-up Failed !';
                    errorMsg = error.response.data.message;
                }
                toast.error(<div><h4>{errorHead}</h4><p>{errorMsg}</p></div>);
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
                toast(<div><h4> Welcome !</h4><p> Signed in successfully</p></div>,{
                    onClose: () => {
                        this.props.setTokenId(data.data._id);
                        this.props.setUser({
                            fname:data.data.user.fname,
                            lname:data.data.user.lname,
                            email:data.data.user.email,
                            userDP:data.data.user.userDP
                        });
                    }
                });
            })
            .catch(error => {
                console.log(error);
                let errorHead = 'Server Error !';
                let errorMsg = 'Login failed';
                if (error.response && error.response.data.message) {
                    errorHead = 'Login Failed !';
                    errorMsg = error.response.data.message;
                }
                toast.error(<div><h4>{errorHead}</h4><p>{errorMsg}</p></div>);
            });
    };
    render() {
        return (
            <div>
                <ToastContainer 
                    autoClose={3000}
                    hideProgressBar={true}
                    />
                <SignUp onSignUpHandler={this.onSignUpHandler} onSignInHandler={this.onSignInHandler}/>
            </div>
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