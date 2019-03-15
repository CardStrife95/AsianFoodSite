import React,{Component} from 'react';
import axios from 'axios';

export default class Edit extends Component{
    constructor(props){
        super(props);

        this.state = {
            recipe_name:'',
            recipe_author:'',
            recipe_country:'',
            recipe_steps:[]
        }
        
    }

    componentDidMount(){
        axios.get('http://localhost:4000/recipe/'+this.props.match.params.id).then(
            res =>{
                this.setState({
                    recipe_name:res.data.recipe_name,
                    recipe_author:res.data.recipe_author,
                    recipe_country:res.data.recipe_country,
                    recipe_steps:res.data.recipe_steps
                });
            }
        ).catch(err=>{
            console.log(err);
        });
    }
    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h2>{this.state.recipe_name}</h2>
                </div>
            </div>
        );
    }
}