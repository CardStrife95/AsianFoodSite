import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';
import axios from 'axios';

import Create from './recipe.create.component';
import File from './recipeFile';

export default class Recipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipes:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:4000/recipe")
        .then(res=>{
            this.setState({recipes:res.data})
        })
        .catch(function(err){
            console.log(err);
        });
    }

    fileRow(){
        return this.state.recipes.map(function(obj,i){
            return <File obj={obj} key={i} />
        });
    }

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
                <div className="col-sm-5">
                    <ul className="list-inline"> 
                        {this.fileRow()}
                    </ul>
                </div>
                <Switch>
                    <Route path='/recipe/create' component={Create} />
                </Switch>
            </div>
            </div>
            </Router>
        );
    }
}