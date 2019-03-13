import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch , Route, Link} from 'react-router-dom';

import Index from './components/index.component';
import News from './components/news.component'; 

class App extends Component {
  render() {
    return (
      <Route>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Asian Food Site</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link to={'/'} className="navbar-link"/>Home</li>
                <li className="nav-item"> <Link to={'/index'} className="navbar-link">Index</Link></li>
                <li className="nav-item"> <Link to={'/news'} className="navbar-link">News</Link></li>
              </ul>
            </div>
          </nav><br />
          <h1>Welcome to Asian food site !!</h1>
          <Switch>
            <Route exact path='/index' component={Index} />
            <Route path='/news' component={ News }/>
          </Switch>
        </div>  
      </Route>
    );
  }
}

export default App;
