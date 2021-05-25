import NavBar from '../../shared/components/Navbar/Navbar'
import RegisterForm from './components/RegisterForm/RegisterForm'
import WatermarkedImage from '../../shared/components/WatermarkedImage/WatermarkedImage';

import React, { Component } from 'react';

class RegisterPage extends Component {
    
    componentDidMount(){
        document.title = `register | task-fuel`
    }

    render() { 
        return (
            <div>
                <NavBar />
                <WatermarkedImage />
                <RegisterForm />
            </div>
        );
    }
}

export default RegisterPage;