import React, {Component} from 'react';
import axios from 'axios';

import File from './recipeFile';

export default class Index extends Component{

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
            <div>
                <p>Welcome to the list of recipes.</p>
                <div >
                    <ul className="list-inline"> 
                        {this.fileRow()}
                    </ul>
                </div>
            </div>
              
        )
    }
}