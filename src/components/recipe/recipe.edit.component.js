import React,{Component} from 'react';

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

    render(){
        return(
            <div>
            </div>
        );
    }
}