import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';

import Create from './recipe.create.component';
import Index from './recipe.index.component';
import Detail from './recipe.detail.component';

export default class Recipe extends Component{
    render(){
        return(
            <Router>
                <div>
                <h2>Recipe</h2>
                <div className="row">
                <div className="col-sm-3">
                    <Link to={'/recipe/create'} className="btn btn-primary">Add a new Recipe</Link>
                </div>
                <br />
                
                <Switch>
                    <Route exact path='/recipe' component={Index}/>
                    <Route path='/recipe/index' component={Index}/>
                    <Route path='/recipe/create' component={Create} />
                    <Route path='/recipe/detail/:id' component={Detail}/>
                </Switch>
            </div>
            </div>
            </Router>
        );
    }
}