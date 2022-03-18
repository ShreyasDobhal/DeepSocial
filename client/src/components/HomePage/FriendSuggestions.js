import React, {Component} from 'react';
import axiosExpress from '../../axios/axiosExpress';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getUsersQuery} from '../../queries/queries';
import { handleUserSpanClick } from '../../utility/UserSpanAction';

class FriendSuggestions extends Component {
    state = {
        friendSuggestions: null
    }

    componentWillReceiveProps(nextProps) {
        // TODO: make proper recommendations 
        if (!nextProps.getUsersQuery.loading) {
            if (this.state.friendSuggestions !== nextProps.getUsersQuery.users)
                this.setState({friendSuggestions: nextProps.getUsersQuery.users});
        }
    }

    render () {
        if (this.props.getUsersQuery.loading || !this.state.friendSuggestions)
            return null;
        
        const friendSuggestionsComponent = this.state.friendSuggestions.map(user => {
            const userDP = user.userDP ? '/'+user.userDP : '/images/profile.png';
            return (
                <div key={user._id} className='friend-suggestion-card'>
                    <img className='friend-suggestion-card-img' src={userDP} alt={user.fname}/>
                    <p><span className='userSpan' onClick={() => handleUserSpanClick(user._id)}>{user.fname + ' ' + user.lname}</span></p>
                    <button>Add Friend</button>
                </div>
            )
            
        });
        return (
            <div>
                <h2>Friend Suggestions</h2>
                <div className='friend-suggestion-container'>
                    {friendSuggestionsComponent}
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getUsersQuery, {name:'getUsersQuery'})
)(FriendSuggestions);