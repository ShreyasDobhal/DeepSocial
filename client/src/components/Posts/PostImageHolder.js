import React, {Component} from 'react';

class PostImageHolder extends Component {
    state = {
        index: 0
    }

    showPrevious = ()=>{
        if (this.state.index>0)
            this.setState({
                index:this.state.index-1
            });
    }

    showNext = ()=>{
        if (this.state.index<this.props.images.length-1)
            this.setState({
                index:this.state.index+1
            });
    }

    render() {

        if (!this.props.images)
            return null;

        let leftArrow = (this.props.images.length>1)?(
            <div className='post-image-controls-container post-controls-left'>
                <i className="fa fa-angle-left" style={(this.state.index===0)?{visibility:"hidden"}:null} aria-hidden="true" onClick={this.showPrevious}></i>
            </div>
        ):null;
        let rightArrow = (this.props.images.length>1)?(
            <div className='post-image-controls-container post-controls-right'>
                <i className="fa fa-angle-right" style={(this.state.index===this.props.images.length-1)?{visibility:"hidden"}:null}aria-hidden="true" onClick={this.showNext}></i>
            </div>
        ):null;

        return (
            <div className='post-image-holder'>
                {leftArrow}
                <img className='post-image' src={this.props.images[this.state.index]} alt='Post'/>
                {rightArrow}
            </div>
        )
    }
}

export default PostImageHolder;