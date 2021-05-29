import "./RegisterForm.css";

import usernameValidation from "../../validators/usernameValidation"
import emailValidation from "../../validators/emailValidation"
import passwordValidation from "../../validators/passwordValidation"
import confirmPasswordValidation from "../../validators/confirmPasswordValidation"

import React, { Component } from "react";
import { Link } from 'react-router-dom';

class RegisterForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
        }
    }

    validate() {
        
        if(usernameValidation(this.state.username)){
            this.setState({error: usernameValidation(this.state.username), height: "655px"})
            return false
        } else if(emailValidation(this.state.email)){
            this.setState({error: emailValidation(this.state.email), height: "655px"})
            return false
        } else if(passwordValidation(this.state.password)){
            this.setState({error: passwordValidation(this.state.password), height: "655px"})
            return false
        } else if(confirmPasswordValidation(this.state.password, this.state.confirmPassword)){
            this.setState({error: confirmPasswordValidation(this.state.password, this.state.confirmPassword), height: "655px"})
            return false
        }

        return true

    }

    submitForm(event){
        event.preventDefault()    
        this.validate()
    }

    render(){
        return (
            <div id="register-form-container">
                <div id="register-div">
                    <h1 id="register-h"> Hello there! </h1>
                    <p id="register-p"> Complete the form to start your journey with us right now. </p>
                    <form id="register-form" onSubmit={ this.submitForm.bind(this) }>
                            <input className="register-input-items register-form-items" type="text" placeholder="Username" onChange = { (event) => this.setState({username: event.target.value}) } />
                            <input className="register-input-items register-form-items" type="email" placeholder="Email Address" onChange = { (event) => this.setState({email: event.target.value}) } />
                            <input className="register-input-items register-form-items" type="password" placeholder="Password" onChange = { (event) => this.setState({password: event.target.value}) } /> 
                            <input className="register-input-items register-form-items" type="password" placeholder="Confirm Password" onChange = { (event) => this.setState({confirmPassword: event.target.value}) } /> 
                            
                            <div className="register-error">{this.state.error}</div>

                            <input id="register-submit-button" className="register-form-items" type="submit" value="Sign in" />
                    </form>
                    <Link to="/login" id="register-already-have-acc"> Already have an account?</Link >
                </div>
            </div>
        );
    }
}

export default RegisterForm;
