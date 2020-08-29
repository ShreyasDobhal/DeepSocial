import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import SignUpPage from './components/SignupPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import PostPage from './components/Posts/PostPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import TestComponent from './components/Utility/test';
import * as Actions from './actions/actions';

const cookies = new Cookies();

function App(props) {

  if (cookies.get('tokenId') && cookies.get('tokenId')!=='null') {
    console.log("Loading saved cookie");
    props.setTokenId(cookies.get('tokenId'));
    props.setUser({
      fname:cookies.get('fname'),
      lname:cookies.get('lname'),
      email:cookies.get('email')
    });

  }
  console.log("App token id:",props.tokenId);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={props.isSignedIn ? HomePage : SignUpPage} />
          <Route exact path='/profile/:userId' component={props.isSignedIn ? ProfilePage : SignUpPage} />
          <Route exact path='/posts/:postId' component={props.isSignedIn ? PostPage : SignUpPage} />
          <Route exact path='/test' component={TestComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenId: state.tokenId,
    isSignedIn: state.isSignedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setTokenId: (tokenId) => dispatch({type:'SET_TOKEN',value:tokenId})
    setTokenId: (tokenId) => dispatch(Actions.setToken(tokenId)),
    setUser: (user) => dispatch(Actions.setUser(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);