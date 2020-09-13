import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';

class Test extends Component {

    render () {
        let images = [
            {
                src: '/images/img1.jpg',
                thumbnail: '/images/img1.jpg',
                caption: 'Demo image 1'
            },
            {
                src: '/images/img2.jpg',
                thumbnail: '/images/img2.jpg',
                caption: 'Demo image 1'
            },
            {
                src: '/images/img3.jpg',
                thumbnail: '/images/img3.jpg',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: 'Demo image 1'
            },
            {
                src: '/images/img4.jpg',
                thumbnail: '/images/img4.jpg',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: 'Demo image 1'
            },
            {
                src: '/images/img1.jpg',
                thumbnail: '/images/img1.jpg',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: 'Demo image 1'
            },
            {
                src: '/images/img2.jpg',
                thumbnail: '/images/img2.jpg',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: 'Demo image 1'
            },
            {
                src: '/images/img3.jpg',
                thumbnail: '/images/img3.jpg',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: 'Demo image 1'
            },
            {
                src: '/images/img4.jpg',
                thumbnail: '/images/img4.jpg',
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: 'Demo image 1'
            }
        ];

        return (
            <div className='scroll-container'>
                <Gallery images={images} />

            </div>
        )
    }
}

export default Test;
// ReactDOM.render(<App />, document.getElementById('root'));
