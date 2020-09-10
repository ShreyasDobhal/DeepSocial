import React, {Component} from 'react';
import AboutItemField from './AboutItemField';
import axiosExpress from '../../axios/axiosExpress';

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
                console.log(user.data);
                this.setState({
                    location: user.data.location,
                    phone: user.data.phone,
                    work: user.data.work,
                    about: user.data.about,
                    education: user.data.education,
                    birthday: user.data.birthday
                });
            })
            .catch(error => {

            });
        
    }

    onSubmitHandler = () => {
        console.log(this.locationRef.current.state.text);
        console.log(this.phoneRef.current.state.text);
        console.log(this.workRef.current.state.text);
        console.log(this.aboutRef.current.state.text);
        console.log(this.educationRef.current.state.text);
        console.log(this.birthdayRef.current.state.text);
    }

    render () {

        let aboutHolder;
        if (this.props.isOwner) {
            aboutHolder = (
                <div className='profile-about-container'>
                    <div className='profile-about-item'>
                        <span className='iconSpan'><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                        <AboutItemField ref={this.locationRef} isEditable={this.props.isOwner} data={this.state.location} placeholder='Enter your location'/>
                    </div>
                    <div className='profile-about-item'>
                        <span className='iconSpan'><i className="fa fa-phone" aria-hidden="true"></i></span>
                        <AboutItemField ref={this.phoneRef} isEditable={this.props.isOwner} data={this.state.phone} placeholder='Enter your Contact Number'/>
                    </div>
                    <div className='profile-about-item'>
                        <span className='iconSpan'><i className="fa fa-briefcase" aria-hidden="true"></i></span>
                        <AboutItemField ref={this.workRef} isEditable={this.props.isOwner} data={this.state.work} placeholder='Enter your Work Profile'/>
                    </div>
                    <div className='profile-about-item'>
                        <span className='iconSpan'><i className="fa fa-pencil" aria-hidden="true"></i></span>
                        <AboutItemField ref={this.aboutRef} isEditable={this.props.isOwner} data={this.state.about} placeholder='Enter something about you'/>
                    </div>
                    <div className='profile-about-item'>
                        <span className='iconSpan'><i className="fa fa-graduation-cap" aria-hidden="true"></i></span>
                        <AboutItemField ref={this.educationRef} isEditable={this.props.isOwner} data={this.state.education} placeholder='Enter your Educational Qualification'/>
                    </div>
                    <div className='profile-about-item'>
                        <span className='iconSpan'><i className="fa fa-birthday-cake" aria-hidden="true"></i></span>
                        <AboutItemField ref={this.birthdayRef} isEditable={this.props.isOwner} data={this.state.birthday} placeholder='Enter your Birthday'/>
                    </div>
                    {this.props.isOwner ? 
                        <div className='about-submit-btn-container text-center'>
                            <button className='btn btn-primary' onClick={this.onSubmitHandler}>Submit</button>
                        </div> : null
                    }

                    {/* <p><span className='iconSpan'><i className="fa fa-map-marker" aria-hidden="true"></i></span> <input type='text' /></p>
                    <p><span className='iconSpan'><i className="fa fa-phone" aria-hidden="true"></i></span> +91-9876543210</p>
                    <p><span className='iconSpan'><i className="fa fa-briefcase" aria-hidden="true"></i></span> Member Technical at DEShaw</p>
                    <p><span className='iconSpan'><i className="fa fa-pencil" aria-hidden="true"></i></span> Loves to code</p>
                    <p><span className='iconSpan'><i class="fa fa-graduation-cap" aria-hidden="true"></i></span> Studied from MNNIT Allahabad</p>
                    <p><span className='iconSpan'><i className="fa fa-birthday-cake" aria-hidden="true"></i></span> 8th October 1998</p>
                    <p className='profile-email-info'>{this.props.isOwner ? 'Your page' : 'Viewing other page'}</p> */}
                </div>
            );
        } else {
            aboutHolder = (
                <div className='profile-about-container'>
                    <p><span className='iconSpan'><i className="fa fa-map-marker" aria-hidden="true"></i></span> Dehradun, Uttarakhand</p>
                    <p><span className='iconSpan'><i className="fa fa-phone" aria-hidden="true"></i></span> +91-9876543210</p>
                    <p><span className='iconSpan'><i className="fa fa-briefcase" aria-hidden="true"></i></span> Member Technical at DEShaw</p>
                    <p><span className='iconSpan'><i className="fa fa-pencil" aria-hidden="true"></i></span> Loves to code</p>
                    <p><span className='iconSpan'><i class="fa fa-graduation-cap" aria-hidden="true"></i></span> Studied from MNNIT Allahabad</p>
                    <p><span className='iconSpan'><i className="fa fa-birthday-cake" aria-hidden="true"></i></span> 8th October 1998</p>
                    <p className='profile-email-info'>{this.props.isOwner ? 'Your page' : 'Viewing other page'}</p>
                </div>
            );
        }


        return aboutHolder;
    }
}

export default AboutTab;