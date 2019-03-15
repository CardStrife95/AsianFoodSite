import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class RecipeFile extends Component{
    constructor(props){
        super(props);
        this.delete=this.delete.bind(this);
        this.view=this.view.bind(this);
    }

    delete(){
        axios.get('http://localhost:4000/recipe/delete/'+this.props.obj._id)
        .then(console.log('Recipe deleted'))
        .catch(err=>console.log(err))
    }

    view(){
        axios.get('http://localhost:4000/recipe/'+this.props.obj._id)
        .then(console.log('Recipe found'))
        .catch(err=>console.log(err))
    }

    render(){
        return(
            <li className="list-inline-item">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2>{this.props.obj.recipe_name}</h2>
                </div>
                <div className="panel-body">
                    <p>written by {this.props.obj.recipe_author}</p>
                    <p>Country : {this.props.obj.recipe_country}</p>
                </div>
                <div className="panel-footer">
                   <Link to={"/recipe/"+this.props.obj._id} className="btn btn-secondary">View</Link>
                   <Link to={"/recipe/edit/"+this.props.obj._id} className="btn btn-success"> Edit</Link>
                   <button onClick={this.delete} className="btn btn-danger">Remove </button>
                </div>
            </div>
            </li>
        );
    }
}