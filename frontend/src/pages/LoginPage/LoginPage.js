import NavBar from '../../shared/components/Navbar/Navbar'
import LoginForm from './components/LoginForm/LoginForm'

import React, { Component } from 'react';

class LoginPage extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <NavBar />
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;