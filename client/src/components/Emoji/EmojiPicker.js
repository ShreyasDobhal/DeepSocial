import React, { useState , Component } from 'react';
import Picker from 'emoji-picker-react';

class EmojiPicker extends Component {
    
    render () { 
        if (!this.props.isVisible)
            return null;
        
        return (
            <div className='emoji-picker-container'>
                <div>
                    <Picker onEmojiClick={this.props.onEmojiClick} />
                </div>
            </div>
        );
    }   
};

export default EmojiPicker;