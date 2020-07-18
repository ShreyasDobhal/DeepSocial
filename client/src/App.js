import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar';
import SignUpPage from './components/Signup/SignUpPage';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
// cookies.set('tokenId','5f12aa3ff83edf6400d60811');
// console.log("Token ID : ",cookies.get('tokenId'));

function App(props) {
  if (cookies.get('tokenId')) {
    props.setTokenId(cookies.get('tokenId'));
  }
  console.log("App token id:",props.tokenId);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={props.isSignedIn ? (()=>(<h1>Signed in</h1>)) : SignUpPage} />
          <Route exact path='/navbar' component={NavigationBar} />
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