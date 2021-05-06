import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./RegisterForm.css";
import usernameValidation from "../../validators/usernameValidation"
import emailValidation from "../../validators/emailValidation"
import passwordValidation from "../../validators/passwordValidation"
import confirmPasswordValidation from "../../validators/confirmPasswordValidation"

class RegisterForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            usernameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: ""
        }
    }

    validate() {

        this.setState({usernameError: usernameValidation(this.state.username)});
        this.setState({emailError: emailValidation(this.state.email)});
        this.setState({passwordError: passwordValidation(this.state.password)});
        this.setState({confirmPasswordError: confirmPasswordValidation(this.state.password, this.state.confirmPassword)});

    }

    submitForm(event){
        event.preventDefault();    
        let isFormValid = this.validate();
    }

    render(){
        return (
            <div id="register-div">
                <h1 id="register-h"> Hello there! </h1>
                <p> Complete the form to start your journey with us right now. </p>
                <form id="register-form" onSubmit={ this.submitForm.bind(this) }>
                        <input className="register-input-items register-form-items" type="text" placeholder="Username" onChange = { (event) => this.setState({username: event.target.value}) } />
                        <div className="register-error">{this.state.usernameError}</div>
                        
                        <input className="register-input-items register-form-items" type="email" placeholder="Email Address" onChange = { (event) => this.setState({email: event.target.value}) } />
                        <div className="register-error">{this.state.emailError}</div>

                        <input className="register-input-items register-form-items" type="password" placeholder="Password" onChange = { (event) => this.setState({password: event.target.value}) } /> 
                        <div className="register-error">{this.state.passwordError}</div>

                        <input className="register-input-items register-form-items" type="password" placeholder="Confirm Password" onChange = { (event) => this.setState({confirmPassword: event.target.value}) } /> 
                        <div className="register-error">{this.state.confirmPasswordError}</div>

                        <input id="register-submit-button" className="register-form-items" type="submit" value="Sign in" />
                        <Link to="/login" id="register-already-have-acc"> Already have an account?</Link >
                </form>
            </div>
        );
    }
}

export default RegisterForm;
