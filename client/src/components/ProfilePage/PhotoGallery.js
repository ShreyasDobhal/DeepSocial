import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';
import axiosExpress from '../../axios/axiosExpress';

class PhotoGallery extends Component {
    state = {
        isViewAll: false,
        images: []
    }

    componentDidMount() {
        axiosExpress.get('/users/'+this.props.userId+'/photos')
            .then(photos => {
                console.log("Photos", photos.data);
                const images = photos.data.map(photo => {
                    return '/'+photo.postImages;
                });

                this.setState({images: images});
            });
    }

    render () {
        
        let images = this.state.images.map(image => {
            return {
                src: image,
                thumbnail: image
            }
        });

        return (
            <div className='photo-gallery-container'>
                <h4 className='photo-gallery-heading'>Photos</h4>
                <div className='gallery-photo-holder' 
                    style={{
                        display: "block",
                        minHeight: "1px",
                        width: "100%",
                        overflow: "auto"
                    }}>
                    <Gallery images={images} 
                        showLightboxThumbnails={true}/>
                </div>
            </div>
        );
    }
}

export default PhotoGallery;