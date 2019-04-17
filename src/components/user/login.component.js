import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.OnChangeUserEmailOrName = this.OnChangeUserEmailOrName.bind(this)
        this.OnChangeUserPassword = this.OnChangeUserPassword.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            user_email_or_name: '',
            user_password: '',
        }
    }

    //OnChange Handler
    OnChangeUserEmailOrName(e) {
        this.setState({
            user_email_or_name: e.target.value
        })
    }

    OnChangeUserPassword(e) {
        this.setState({
            user_password: e.target.value
        })
    }

    //OnSubmit Handler
    handleSubmit(e) {
        e.preventDefault()
        const obj ={
            user_email_or_name: this.state.user_email_or_name,
            user_password: this.state.user_password,
        }
        console.log(obj)
        axios.post('http://localhost:4000/user/login',obj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.error(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username or email : </label>
                        <input type="text" className="form-control" value={this.state.user_email_or_name} onChange={this.OnChangeUserEmailOrName} />
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input type="password" className="form-control" value={this.state.user_password} onChange={this.OnChangeUserPassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}