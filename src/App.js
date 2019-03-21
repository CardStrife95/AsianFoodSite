import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch , Route, Link} from 'react-router-dom';

import Index from './components/index.component';
import News from './components/news.component'; 
import Contact from './components/contact.component';
import Recipe from './components/recipe/recipe.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron text-center" >
            <h1>Asian food site</h1>
          </div>
          <nav className="navbar navbar-expand-lg  navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Asian Food Site</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav mr-auto">
                <li className="nav-item"> <Link to={'/index'} className="navbar-link">Index</Link></li>
                <li className="nav-item"> <Link to={'/news'} className="navbar-link">News</Link></li>
                <li className="nav-item"> <Link to={'/recipe'} className="navbar-link">Recipes</Link></li>
                <li className="nav-item"> <Link to={'/contact'} className="navbar-link">Contact</Link></li>
              </ul>
            </div>
          </nav><br />
          <h1>Welcome to Asian food site !!</h1>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route path='/index/' component={Index} />
            <Route path='/news/' component={ News }/>
            <Route path='/contact/' component={Contact} />
            <Route path='/recipe/' component={Recipe} />
          </Switch>
        </div>  
      </Router>
    );
  }
}

export default App;
