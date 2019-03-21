import React,{Component} from 'react';
import axios from 'axios';

export default class Edit extends Component{
    constructor(props){
        super(props);

        this.OnChangeRecipeName = this.OnChangeRecipeName.bind(this);
        this.OnChangeRecipeAuthor = this.OnChangeRecipeAuthor.bind(this);
        this.OnChangeRecipeCountry = this.OnChangeRecipeCountry.bind(this);
        this.OnChangeRecipeStepText = this.On
        

        this.state = {
            recipe_name:'',
            recipe_author:'',
            recipe_country:'',
            recipe_steps:[]
        }
        
    }

    OnChangeRecipeName(e){
        this.setState({
            recipe_name : e.target.value            
        });
    }

    OnChangeRecipeAuthor(e){
        this.setState({
            recipe_author:e.target.value
        });
    }

    OnChangeRecipeCountry(e){
        this.setState({
            recipe_country: e.target.value
        });
    }

    OnChangeRecipeStepText = idx => e =>{
        const newRecipeSteps = this.state.recipe_steps.map((recipe_step,sidx)=>{
            if(idx !== sidx) return recipe_step;
            return{...recipe_step,step_text:e.target.value}
        });
        this.setState({
            recipe_steps:newRecipeSteps
        });
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
            <div className="card ">
                <div className="card-header text-center">
                    <h2>{this.state.recipe_name}</h2>
                </div>
               
                    <ul className="list-group list-group-flush">
                    {this.state.recipe_steps.map((val,id)=>{
                        return(
                            <ol className="list-group-item">{this.state.recipe_steps[id].step_text}</ol>
                        )
                    })}
                    </ul>
                
                <div className="card-body">
                    <p>Created By {this.state.recipe_author} type of food:  {this.state.recipe_country}</p>
                </div>
            </div>
        );
    }
}