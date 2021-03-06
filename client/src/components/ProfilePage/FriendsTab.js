import React, {Component} from 'react';
import Jumbotron from '../Utility/Jumbotron';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getFriendsQuery, getUsersQuery} from '../../queries/queries';
import LoadingSpinner from '../Loader/LoadingSpinner';
import FriendCard from './FriendCard';

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
            if (this.props.getFriendsQuery.loading) {
                return (<LoadingSpinner />);
            } else {
                const friendsCards = this.props.getFriendsQuery.user.friends.map(friend => {
                    return (
                        <FriendCard key={friend._id} friend={friend} />
                    );
                });
                return (
                    <div className='friend-card-container'>
                        {friendsCards}
                    </div>
                )
            }
        }
        
    }
}

export default compose(
    graphql(getFriendsQuery, {
        options: (props) => {
            return {
                variables: {
                    _id: props.userId
                }
            }
        },
        name: "getFriendsQuery"
    }),
    graphql(getUsersQuery, {name: "getUsersQuery"}),
)(FriendsTab);