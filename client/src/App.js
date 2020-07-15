import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar';
import SignUp from './components/Signup/SignUp';
import SignUpPage from './components/Signup/SignUpPage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavigationBar/> */}
        <Switch>
          <Route exact path='/' component={SignUpPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;