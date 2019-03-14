import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';

import Create from './recipe.create.component';

export default class Recipe extends Component{
    render(){
        return(
            <Router>
            <div>
            <h2>Recipe</h2>
                <Link to={'/recipe/create'} className="">Add a new Recipe</Link>
                <Switch>
                    <Route path='/recipe/create' component={Create} />
                </Switch>
            </div>
            </Router>
        );
    }
}