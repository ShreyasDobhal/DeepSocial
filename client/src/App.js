import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import SignUpPage from './components/SignupPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';

const cookies = new Cookies();

function App(props) {

  if (cookies.get('tokenId') && cookies.get('tokenId')!=='null') {
    console.log("Loading saved cookie");
    props.setTokenId(cookies.get('tokenId'));
  }
  console.log("App token id:",props.tokenId);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={props.isSignedIn ? HomePage : SignUpPage} />
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
    setTokenId: (tokenId) => dispatch({type:'SET_TOKEN',value:tokenId})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);