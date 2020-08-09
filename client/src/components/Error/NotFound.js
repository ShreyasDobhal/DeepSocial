import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

    render() {
        return (
            <div className='text-center'>
                <img src='/images/not-found.png'/>
                <h1 className='error-heading'>404</h1>
                <h3>Page not found</h3>
                <Link className='btn btn-primary btn-lg my-3' to='/'>Home</Link>
            </div>
        )
    }
}

export default NotFound;