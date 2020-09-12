import React, { Component } from 'react';

class AboutItemField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: props.data
        }
    }
    
    componentWillReceiveProps (props) {
        if (props.data) {
            this.setState({text: props.data});
        }
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
            if (this.props.data)
                textField = (<p>{this.props.data}</p>);
        }

        return [this.props.icon && textField != null ? this.props.icon : null,textField];
    }
}

export default AboutItemField;