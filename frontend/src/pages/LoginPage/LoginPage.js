import NavBar from '../../shared/components/Navbar/Navbar'
import LoginForm from './components/LoginForm/LoginForm'
import LoginImage from '../../shared/components/WatermarkedImage/WatermarkedImage';


import React, { Component } from 'react';


class LoginPage extends Component {

    componentDidMount(){
        document.title = `login | task-fuel`
    }

    render() { 
        return (
            <div>
                <LoginImage />
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;