import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        loginTitle: ['Sign up','Sign in'],
        loginBtnClass: ['login-options-btn login-option-active','login-options-btn login-option-inactive'],
        toggleVal: 0
    }
    toggleHandler(value) {
        this.setState({
            toggleVal:value
        });
    }
    render() {
        let formFields;
        if (this.state.toggleVal==0) {
            formFields = (
                <div className='login-fields-container'>
                    <input type='text' className='input-small' placeholder='First Name*' name='fname'></input>
                    <input type='text' className='input-small' placeholder='Last Name*' name='lname'></input>
                    <input type='email' className='input-large' placeholder='Email Address*' name='email'></input>
                    <input type='password' className='input-large' placeholder='Enter Password*' name='password1'></input>
                    <input type='password' className='input-large' placeholder='Confirm Password*' name='password2'></input>
                </div>
            );
        } else {
            formFields = (
                <div className='login-fields-container'>
                    <input type='text' className='input-hidden'></input>
                    <input type='email' className='input-large' placeholder='Email Address*' name='email'></input>
                    <input type='password' className='input-large' placeholder='Enter Password*' name='password1'></input>
                    <input type='text' className='input-hidden'></input>
                </div>
            );
        }

        return (
            <div className='login-container'>
                <div className='login-options-container'>
                    <button className={ this.state.loginBtnClass[(this.state.toggleVal)%2] } onClick={()=>{this.toggleHandler(0);}}>Sign Up</button>
                    <button className={ this.state.loginBtnClass[(this.state.toggleVal+1)%2] } onClick={()=>{this.toggleHandler(1);}}>Sign In</button>
                </div>
                <div className='login-title-container'>
                    <p className='login-title'>{ this.state.loginTitle[this.state.toggleVal] }</p>
                </div>
                <div className='login-form-container'>
                    {formFields}
                    <div>
                        <button className='login-start-btn'>GET STARTED</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;