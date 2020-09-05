import React, {Component} from 'react';

class AboutTab extends Component {
    render () {
        return (
            // TODO: Make page editable
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
}

export default AboutTab;