import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Startpage } from './components/Startpage';
import { DetailPage } from './components/Detailpage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <div className='nav'>
            <h1>Animals</h1>
          </div>
          <Startpage></Startpage>
        </Route>
        <Route path='/animal/:id'>
          <div className='nav'>
            <h1>Animal details</h1>
          </div>
          <DetailPage></DetailPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
