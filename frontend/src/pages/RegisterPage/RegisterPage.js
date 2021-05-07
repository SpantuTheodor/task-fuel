import NavBar from '../../shared/components/Navbar/Navbar'
import RegisterForm from './components/RegisterForm/RegisterForm'

import React, { Component } from 'react';

class RegisterPage extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <NavBar />
                <RegisterForm />
            </div>
        );
    }
}

export default RegisterPage;