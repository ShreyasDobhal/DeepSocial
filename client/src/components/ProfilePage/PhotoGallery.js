import React, {Component} from 'react';

class PhotoGallery extends Component {
    state = {
        isViewAll: false,
        images: [
            '/images/img1.jpg',
            '/images/img2.jpg',
            '/images/img3.jpg',
            '/images/img4.jpg',
            '/images/img1.jpg',
            '/images/img2.jpg',
            '/images/img3.jpg',
            '/images/img4.jpg',
            '/images/img1.jpg',
            '/images/img2.jpg',
            '/images/img3.jpg',
            '/images/img4.jpg'
        ]
    }

    toggleViewAll = () => {
        this.setState({
            isViewAll: !this.state.isViewAll
        });
    }

    render () {

        let imagesHolder = this.state.images.map((image,index) => {
            return (
                <div className='gallery-thumbnail'>
                    <img src={image} alt='Photo' key={index}/>
                </div>
            );
        });


        if (!this.state.isViewAll) {
            imagesHolder = imagesHolder.slice(0,10);
        }

        return (
            <div className='photo-gallery-container'>
                <h4 className='photo-gallery-heading'>Photos</h4>
                <div className='gallery-photo-holder'>
                    {imagesHolder}
                </div>
                <div className='gallery-button-holder text-center'>
                    <button className='btn btn-primary btn-large' onClick={this.toggleViewAll}>{this.state.isViewAll ? 'Show less' : 'Show all'}</button>
                </div>
            </div>
        );
    }
}

export default PhotoGallery;