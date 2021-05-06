import React, { Component } from "react"
import { Link } from 'react-router-dom'
import "./Navbar.css";

class Navbar extends Component {
    
    render(){
        return (
            <div id="navbar">
                <Link to="/">
                    <svg id="logo" xmlns="http://www.w3.org/2000/svg" width="85" height="52" viewBox="0 0 85 52">
                        <g id="Group_1" data-name="Group 1" transform="translate(-57 -25.906)">
                            <text id="Fuel" transform="translate(60 47.906)" fill="#707070" fontSize="25" fontFamily="Montserrat-Regular, Montserrat" letterSpacing="0.12em"><tspan x="0" y="24">Fuel</tspan></text>
                            <text id="Task" transform="translate(57 25.906)" fill="#f17019" fontSize="25" fontFamily="Montserrat-Bold, Montserrat" fontWeight="700" letterSpacing="0.05em"><tspan x="0" y="24">Task</tspan></text>
                        </g>
                    </svg>
                </Link>
            </div>
        );
    }
}

export default Navbar;