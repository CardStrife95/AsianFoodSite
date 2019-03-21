import React,{Component} from 'react';
import axios from 'axios';

export default class Edit extends Component{
    constructor(props){
        super(props);
        this.OnChangeRecipeName = this.OnChangeRecipeName.bind(this);
        this.OnChangeRecipeAuthor = this.OnChangeRecipeAuthor.bind(this);
        this.OnChangeRecipeCountry = this.OnChangeRecipeCountry.bind(this);
        this.OnChangeRecipeStepText=this.OnChangeRecipeStepText.bind(this);
        
        this.OnChangeRecipeStepText = this.OnChangeRecipeStepText.bind(this);
        this.OnAddRecipeStep = this.OnAddRecipeStep.bind(this);

        this.OnSubmit = this.OnSubmit.bind(this);
        this.state = {
            recipe_name: '',
            recipe_author:'',
            recipe_country: '',
            recipe_steps: [{step_text:''}]
        }
    
    }

    componentDidMount(){
        axios.get('http://localhost:4000/recipe/edit/'+this.props.match.params.id).then(
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
    
    OnChangeRecipeName(e){
        this.setState({
            recipe_name: e.target.value
        });
    }

    OnChangeRecipeAuthor(e){
        this.setState({
            recipe_author: e.target.value
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

    OnChangeRecipeStep = e => () =>{
        this.state.recipe_steps.push(e.target.value);
        this.setState({
            recipe_steps: this.state.recipe_steps
        })
    }


    OnAddRecipeStep = (e) =>{
        this.setState((prevRecipes)=>({
            recipe_steps:[...prevRecipes.recipe_steps,{step_text:""}]
        }));
    }

    OnRemoveRecipeStep = idx => () =>{
       this.setState({
           recipe_steps : this.state.recipe_steps.filter((s,sidx)=>idx !== sidx)
       });
   }
    
    OnSubmit(e){
        e.preventDefault();
        console.log(`${this.state.recipe_name},${this.state.recipe_author},${this.state.recipe_country}`);
        const obj = {
            recipe_name: this.state.recipe_name,
            recipe_author: this.state.recipe_author,
            recipe_country: this.state.recipe_country,
            recipe_steps:this.state.recipe_steps
        };
        
        axios.post('http://localhost:4000/recipe/update/'+this.props.match.params.id,obj).then(
            res=>console.log(res.data)
        ).catch(err=>{
            console.log("Error on add : "+err);
        });

        this.props.history.push('/recipe/index');
        
    }
    
    render(){
        return(
            <div style={{marginTop:10}}>
                <h3>Add New Recipe</h3>
                <form onSubmit={this.OnSubmit}>
                    <div className="form-group">
                        <label>Name : </label>
                        <input type="text" className="form-control"
                        value={this.state.recipe_name}
                        onChange={this.OnChangeRecipeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author : </label>
                        <input type="text" className="form-control"
                        value={this.state.recipe_author}
                        onChange={this.OnChangeRecipeAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country : </label>
                        <input type="text" className="form-control"
                        value={this.state.recipe_country}
                        onChange={this.OnChangeRecipeCountry}
                        />
                    </div>
                    <div>
                        <button type="button" className="btn btn-light"
                        onClick={this.OnAddRecipeStep}>Add a step</button>    
                    </div>
                    {this.state.recipe_steps.map((val,idx)=>{
                        return(
                            <div className="form-group">
                            <label>Step {idx+1} : </label>
                            <input type="text" className="form-control"
                                value={this.state.recipe_steps[idx].step_text}
                                onChange={this.OnChangeRecipeStepText(idx)}
                                
                             />
                             <button type="button" className="btn btn-primary"
                             onClick={this.OnRemoveRecipeStep(idx)}><span className="glyphicon glyphicon-minus"/></button>
                             </div>
                        );
                    })}

                    <div className="form-group">
                        <input type="submit" value="Register Recipe" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}