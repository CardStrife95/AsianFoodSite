import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            user_name: '',
            user_email: '',
            user_country: '',
            user_password: '',
        }
    }

    handleSubmit(e) {
        e.prevenDefault()
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.user_email} />
                    </div>
                    <div>
                        <label>Password :</label>
                        <input type="password" className="form-control" value={this.state.user_password} />
                    </div>
                </form>
            </div>
        )
    }
}