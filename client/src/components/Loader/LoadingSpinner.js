import React, {Component} from 'react';
import { Spinner } from 'reactstrap';

class LoadingSpinner extends Component {
    render() {
        return (
            <div className='loadingSpinner'>
                <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }
}

export default LoadingSpinner;