import React, {Component} from 'react';
import Jumbotron from '../Utility/Jumbotron';
import axiosExpress from '../../axios/axiosExpress';

class FriendsTab extends Component {
    render () {
        if (!this.props.friends || this.props.friends.length === 0) {
            return (
                <div>
                    <Jumbotron title={(<span>0 Friends <i className="fa fa-frown-o" aria-hidden="true"></i></span>)} 
                               body1="You haven't added any friends yet. Browse for your friends using search option on the Navigation Bar."
                               body2="Or have a photo of someone but do not remember his or her name ? Use our find by face feature now."
                               btnText="Find Friends"
                               goto="/search"/>
                </div>
            );
        } else {
            // TODO: Compelete friends page
            return this.props.friends.map(friend => {
                if (!friend) {
                    return null;
                } else {
                    return  (
                        <div>
                            <h4>{friend}</h4>
                        </div>
                    );
                }
            });
        }
        
    }
}

export default FriendsTab;