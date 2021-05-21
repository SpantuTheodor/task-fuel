import "./Navbar.css";

import AuthenticationContext from "../../../contexts/authenticationContext";

import React, { Component } from "react"
import { Link } from 'react-router-dom'

class Navbar extends Component {
    
    static contextType = AuthenticationContext;

    render(){
        return (
            <div id="navbar">
                <Link to={`/${this.context.username}/boards`}>
                <svg id="logo" xmlns="http://www.w3.org/2000/svg" width="49" height="44" viewBox="0 0 39 34">
                    <rect id="Rectangle_1" data-name="Rectangle 1" width="20" height="5" transform="translate(1)"/>
                    <rect id="Rectangle_2" data-name="Rectangle 2" width="12" height="5" transform="translate(0 12) rotate(-90)"/>
                    <rect id="Rectangle_3" data-name="Rectangle 3" width="12" height="5" transform="translate(0 7)"/>
                    <rect id="Rectangle_4" data-name="Rectangle 4" width="21" height="5" transform="translate(14 7) rotate(90)"/>
                    <rect id="Rectangle_5" data-name="Rectangle 5" width="34" height="5" transform="translate(21) rotate(90)"/>
                    <rect id="Rectangle_6" data-name="Rectangle 6" width="26" height="5" transform="translate(28 8) rotate(90)"/>
                    <rect id="Rectangle_7" data-name="Rectangle 7" width="5" height="5" transform="translate(30 14)"/>
                    <rect id="Rectangle_9" data-name="Rectangle 9" width="15" height="5" transform="translate(23 7)"/>
                    <rect id="Rectangle_11" data-name="Rectangle 11" width="15" height="5" transform="translate(23)"/>
                    <rect id="Rectangle_12" data-name="Rectangle 12" width="12" height="5" transform="translate(34 12) rotate(-90)"/>
                </svg>




                </Link>

                {!this.context.accessToken && 
                <Link to="/register" className="right-button-anchor">
                    <h1 className="right-button">
                        Sign Up
                    </h1>
                </Link>
                }

                {this.context.accessToken && 
                <Link to="/login" className="right-button-anchor" >
                    <h1 className="right-button" onClick={this.context.logOut}>
                        Log Out
                    </h1>
                </Link>
                }
            </div>
        );
    }
}

export default Navbar;