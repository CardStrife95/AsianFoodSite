import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.OnChangeUserName = this.OnChangeUserName.bind(this)
        this.OnChangeUserEmail = this.OnChangeUserEmail.bind(this)
        this.OnChangeUserPassword = this.OnChangeUserPassword.bind(this)
        this.OnChangeUserCountry = this.OnChangeUserCountry.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            user_name: '',
            user_email: '',
            user_country: '',
            user_password: '',
        }
    }


    //OnChange Handler
    OnChangeUserName(e) {
        this.setState({
            user_name: e.target.value
        })
    }

    OnChangeUserEmail(e) {
        this.setState({
            user_email: e.target.value
        })
    }

    OnChangeUserPassword(e) {
        this.setState({
            user_password: e.target.value
        })
    }

    OnChangeUserCountry(e) {
        this.setState({
            user_country: e.target.value
        })
    }

    //Submit
    handleSubmit(e) {
        e.preventDefault()
        const obj = {
            user_name: this.state.user_name,
            user_email: this.state.user_email,
            user_password: this.state.user_password,
            user_country: this.state.user_country,
        }
        console.log(obj)

        axios.post('http://localhost:4000/user/add', obj)
            .then(res => {
                console.log(res)
                this.props.history.push('/')

                this.setState({
                    user_name: '',
                    user_email: '',
                    user_country: '',
                    user_password: '',
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    //UI
    render() {
        return (
            <div>
                <h2>Register</h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.user_name} onChange={this.OnChangeUserName} />
                    </div>
                    <div className="form-group">
                        <label>Email :</label>
                        <input type="text" className="form-control" value={this.state.user_email} onChange={this.OnChangeUserEmail} />
                    </div>
                    <div className="form-group">
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.user_password} onChange={this.OnChangeUserPassword} />
                    </div>
                    <div className="form-group">
                        <label>Country :</label>
                        <input type="text" className="form-control" value={this.state.user_country} onChange={this.OnChangeUserCountry} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </div>
                </form>
            </div>
        )
    }
}