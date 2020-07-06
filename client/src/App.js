import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={()=>{return (<h1>Client running . . .</h1>)}} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;