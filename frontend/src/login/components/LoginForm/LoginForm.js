import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./LoginForm.css";

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render(){
        return (
            <div id="login-div">
                <h1 id="login-h"> Welcome back! </h1>
                <p> To connect with us complete the form with your personal information. </p>
                <form id="login-form" >
                        <input className="login-input-items login-form-items" type="text" placeholder="Username" onChange = { (e) => this.setState({username: e.target.value}) } />
                        <input className="login-input-items login-form-items" type="password" placeholder="Password" onChange = { (e) => this.setState({password: e.target.value}) } /> 
                        <input id="login-submit-button" className="login-form-items" type="submit" value="Log In" />
                        <Link to="/register" id="login-forgot-pwd"> Forgot your password?</Link>
                </form>
            </div>
        );
    }
}

export default LoginForm;
