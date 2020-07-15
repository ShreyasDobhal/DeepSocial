import React, { Component } from 'react';

class SignUp extends Component {
    state = {
        toggleVal: 0,
        fname: null,
        lname: null,
        email: null,
        password1: null,
        password2: null
    }
    toggleHandler = (value) => {
        this.setState({
            toggleVal:value
        });
    };
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    submitHandler = () => {
        if (this.state.toggleVal===0) {
            // Sign up
            const request = {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password1: this.state.password1,
                password2: this.state.password2
            }
            this.props.onSignUpHandler(request);
        } else {
            // Sign in
            const request = {
                email: this.state.email,
                password: this.state.password1,
            }
            this.props.onSignInHandler(request);
        }
    }
    render() {
        const loginTitle= ['Sign up','Sign in'];
        const loginBtnClass= ['login-options-btn login-option-active','login-options-btn login-option-inactive'];
        let formFields;
        if (this.state.toggleVal===0) {
            formFields = (
                <div className='login-fields-container'>
                    <input type='text' className='input-small' placeholder='First Name*' name='fname' onChange={this.inputChangeHandler}></input>
                    <input type='text' className='input-small' placeholder='Last Name*' name='lname' onChange={this.inputChangeHandler}></input>
                    <input type='email' className='input-large' placeholder='Email Address*' name='email' onChange={this.inputChangeHandler}></input>
                    <input type='password' className='input-large' placeholder='Enter Password*' name='password1' onChange={this.inputChangeHandler}></input>
                    <input type='password' className='input-large' placeholder='Confirm Password*' name='password2' onChange={this.inputChangeHandler}></input>
                </div>
            );
        } else {
            formFields = (
                <div className='login-fields-container'>
                    <input type='text' className='input-hidden input-small'></input>
                    <input type='text' className='input-hidden input-small'></input>
                    <input type='email' className='input-large' placeholder='Email Address*' name='email' onChange={this.inputChangeHandler}></input>
                    <input type='password' className='input-large' placeholder='Enter Password*' name='password1' onChange={this.inputChangeHandler}></input>
                    <input type='text' className='input-hidden input-large'></input>
                </div>
            );
        }

        return (
            <div className='login-container'>
                <div className='login-options-container'>
                    <button className={ loginBtnClass[(this.state.toggleVal)%2] } onClick={()=>{this.toggleHandler(0);}}>Sign Up</button>
                    <button className={ loginBtnClass[(this.state.toggleVal+1)%2] } onClick={()=>{this.toggleHandler(1);}}>Sign In</button>
                </div>
                <div className='login-title-container'>
                    <p className='login-title'>{ loginTitle[this.state.toggleVal] }</p>
                </div>
                <div className='login-form-container'>
                    {formFields}
                    <div>
                        <button className='login-start-btn' onClick={this.submitHandler}>GET STARTED</button>
                    </div>
                </div>
            </div>
        );
    }
}



export default SignUp;