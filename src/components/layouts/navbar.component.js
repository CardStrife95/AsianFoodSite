import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-fixed-top">>
            <Link to={'/'} className="navbar-brand">Asian Food Site</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="navbar-link" to={'/index'} >Index</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/news'} className="navbar-link">News</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/recipe'} className="navbar-link">Recipes</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/contact'} className="navbar-link">Contact</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link className="navbar-link" to={'/login'}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navbar-link" to={'/register'}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navbar-link" to={'/logout'}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}