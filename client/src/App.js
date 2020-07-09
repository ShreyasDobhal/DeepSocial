import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar';
import SignUp from './components/SignUp';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar/>
        <Switch>
          <Route exact path='/' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;