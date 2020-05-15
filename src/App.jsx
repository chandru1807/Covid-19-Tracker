import React from 'react';
import {Route, Switch} from 'react-router-dom'
import { HomePage } from './Components/Homepage';
import { IndiaStats } from './Components/IndiaStats';
import { Error } from './Components/Error';
import { NavBar } from './Components/NavBar';


function App() {
  return (
      <>
      <NavBar/>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/indiastats" component={IndiaStats} />
        <Route component={Error}/>
      </Switch>
      </>
  
  )
}

export default App;
