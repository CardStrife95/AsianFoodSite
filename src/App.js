import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Index from './components/index.component'
import News from './components/news.component'
import Contact from './components/contact.component'
import Recipe from './components/recipe/recipe.component'
import NavBar from './components/layouts/navbar.component'
import Login from './components/user/login.component'
import Register from './components/user/register.component'
import Footer from './components/layouts/footer.component'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Index} />
              <Route path='/index' component={Index} />
              <Route path='/news' component={News} />
              <Route path='/contact' component={Contact} />
              <Route path='/recipe' component={Recipe} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
