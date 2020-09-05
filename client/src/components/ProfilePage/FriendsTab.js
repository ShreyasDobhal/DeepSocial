import React, {Component} from 'react';
import Jumbotron from '../Utility/Jumbotron';

class FriendsTab extends Component {
    render () {
        return (
            // TODO: Compelete friends page
            <div>
                <Jumbotron title={(<span>0 Friends <i className="fa fa-frown-o" aria-hidden="true"></i></span>)} 
                           body1="You haven't added any friends yet. Browse for your friends using search option on the Navigation Bar."
                           body2="Or have a photo of someone but do not remember his or her name ? Use our find by face feature now."
                           btnText="Find Friends"
                           goto="/search"/>
            </div>
        );
    }
}

export default FriendsTab;