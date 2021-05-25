import "./LoginForm.css";

import logInMutation from "../../../../mutations/logInMutation"
import AuthenticationContext from "../../../../contexts/authenticationContext"

import { graphql } from "react-apollo";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {

    static contextType = AuthenticationContext;

    constructor(props){
        super(props);
        this.state = {
            name: "",
            password: ""
        }
    }

    submitForm(event){
        event.preventDefault();
        this.props.logInMutation({
            variables: {
                name: this.state.name,
                password: this.state.password,
            }
        }).then((res) => { 
                this.context.logIn(res.data.logIn.userId, res.data.logIn.username, res.data.logIn.accessToken)
                this.setState({ redirect: true })
        }).catch((err) => {console.log(err)})

    }

    render(){
        return (
            <div id="login-div">
                <h1 id="login-h"> Welcome back! </h1>
                <p> To connect with us complete the form with your personal information. </p>
                { this.state.redirect ? (<Redirect push to={`/${this.state.name}/boards`}/>) : null }
                <form id="login-form" onSubmit={ this.submitForm.bind(this) }>
                        <input className="login-input-items login-form-items" type="text" placeholder="Username" onChange = { (event) => this.setState({name: event.target.value}) } />
                        <input className="login-input-items login-form-items" type="password" placeholder="Password" onChange = { (event) => this.setState({password: event.target.value}) } /> 
                        <input id="login-submit-button" className="login-form-items" type="submit" value="Log In" />
                </form>
                <Link to="/register" id="login-forgot-pwd"> Forgot your password?</Link>
            </div>
        );
    }
}

export default graphql(logInMutation, {name: "logInMutation"})(LoginForm);
