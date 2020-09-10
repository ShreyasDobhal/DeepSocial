import React, { Component } from 'react';

class AboutItemField extends Component {
    state = {
        text: null
    }

    
    componentDidMount() {
        this.setState({text: this.props.data});
    }
    
    onChangeHandler = (e) => {
        this.setState({text: e.target.value});
    }

    render () {

        let textField = null;
        if (this.props.isEditable) {
            if (this.state.text) {
                textField = (<input className={this.props.data !== this.state.text ? 'about-field-updated' : ''} value={this.state.text} onChange={this.onChangeHandler}/>);                
            } else {
                textField = (<input placeholder={this.props.placeholder} onChange={this.onChangeHandler}/>);
            }
        } else {
            textField = (<p>{this.props.data}</p>);
        }
        return textField;
    }
}

export default AboutItemField;