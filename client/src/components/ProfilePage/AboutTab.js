import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';
import {ToastContainer, toast} from 'react-toastify';

import AboutItemField from './AboutItemField';
import Jumbotron from '../Utility/Jumbotron';

class AboutTab extends Component {

    state = {
        location: null,
        phone: null,
        work: null,
        about: null,
        education: null,
        birthday: null
    }

    constructor (props) {
        super(props)
        this.locationRef = React.createRef();
        this.phoneRef = React.createRef();
        this.workRef = React.createRef();
        this.aboutRef = React.createRef();
        this.educationRef = React.createRef();
        this.birthdayRef = React.createRef();
    }

    componentDidMount() {
        axiosExpress.get('/users/'+this.props.userId)
            .then(user => {
                console.log("User info",user.data);
                this.setState({
                    location: user.data.info.location,
                    phone: user.data.info.phone,
                    work: user.data.info.work,
                    about: user.data.info.about,
                    education: user.data.info.education,
                    birthday: user.data.info.birthday
                });
            })
            .catch(error => {

            });
        
    }

    onSubmitHandler = () => {
        const payload = {
            userId: this.props.userId,
            location: this.locationRef.current.state.text,
            phone: this.phoneRef.current.state.text,
            work: this.workRef.current.state.text,
            about: this.aboutRef.current.state.text,
            education: this.educationRef.current.state.text,
            birthday: this.birthdayRef.current.state.text
        }
        console.log("Sending user info",payload);
        
        axiosExpress.post('/users/add-info',payload)
            .then(doc => {
                console.log("User info updated successfully ");
                toast.info(<div><h6>User info updated successfully</h6></div>);
                this.setState({
                    location: payload.location,
                    phone: payload.phone,
                    work: payload.work,
                    about: payload.about,
                    education: payload.education,
                    birthday: payload.birthday
                });
            })
            .catch(error => {
                toast.error(<div><h6>Failed to update your info</h6></div>);
            });
            
    }

    render () {

        let aboutHolder;

        if (!this.state.location &&
            !this.state.phone &&
            !this.state.work &&
            !this.state.about &&
            !this.state.education &&
            !this.state.birthday &&
            !this.props.isOwner) {
            
            console.log("No info added");
            aboutHolder = <Jumbotron title={(<span>🤷‍♂️</span>)} 
                                     body1="Sorry the user has't added any information in the 'About' section yet."
                                     body2="Make sure you have added your details, to avoid this page from showing in your Profile page. Click on My Profile button from the drop down menu to go to your own Profile page."/>
        } else {
            aboutHolder = (
                <div className='profile-about-container'>
                    <ToastContainer 
                        autoClose={3000}
                        hideProgressBar={true}
                    />
                    <div className='about-submit-btn-container text-center'>
                        {this.props.isOwner ? 
                            <h4>Edit your Info</h4> : <h4>About</h4>
                        }
                    </div>
                    
                    <div className='profile-about-item'>
                        <AboutItemField ref={this.locationRef} isEditable={this.props.isOwner} data={this.state.location} placeholder='Enter your location'
                            icon={<span className='iconSpan'><i className="fa fa-map-marker" aria-hidden="true"></i></span>} />
                    </div>
                    <div className='profile-about-item'>
                        <AboutItemField ref={this.phoneRef} isEditable={this.props.isOwner} data={this.state.phone} placeholder='Enter your Contact Number'
                            icon={<span className='iconSpan'><i className="fa fa-phone" aria-hidden="true"></i></span>} />
                    </div>
                    <div className='profile-about-item'>
                        <AboutItemField ref={this.workRef} isEditable={this.props.isOwner} data={this.state.work} placeholder='Enter your Work Profile'
                            icon={<span className='iconSpan'><i className="fa fa-briefcase" aria-hidden="true"></i></span>} />
                    </div>
                    <div className='profile-about-item'>
                        <AboutItemField ref={this.aboutRef} isEditable={this.props.isOwner} data={this.state.about} placeholder='Enter something about you'
                            icon={<span className='iconSpan'><i className="fa fa-pencil" aria-hidden="true"></i></span>} />
                    </div>
                    <div className='profile-about-item'>
                        <AboutItemField ref={this.educationRef} isEditable={this.props.isOwner} data={this.state.education} placeholder='Enter your Educational Qualification'
                            icon={<span className='iconSpan'><i className="fa fa-graduation-cap" aria-hidden="true"></i></span>} />
                    </div>
                    <div className='profile-about-item'>
                        <AboutItemField ref={this.birthdayRef} isEditable={this.props.isOwner} data={this.state.birthday} placeholder='Enter your Birthday'
                            icon={<span className='iconSpan'><i className="fa fa-birthday-cake" aria-hidden="true"></i></span>} />
                    </div>
                    {this.props.isOwner ? 
                        <div className='about-submit-btn-container text-center'>
                            <button className='btn btn-primary' onClick={this.onSubmitHandler}>Submit</button>
                        </div> : null
                    }       
                </div>
            );
        }

        return aboutHolder;
    }
}

export default AboutTab;