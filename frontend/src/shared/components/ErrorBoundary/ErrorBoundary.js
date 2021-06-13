import FallbackPage from "../../../pages/FallbackPage/FallbackPage";

import React, { Component } from "react"
import { Redirect } from "react-router";
import {withRouter} from 'react-router';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error: error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.error) {
            // You can render any custom fallback UI
            if(this.state.error.message === "Unauthenticated") {
                return <Redirect to="/login" /> 
            } else if (this.state.error.message === "Failed to fetch"){
                return <FallbackPage message="Oops! You cannot view this page offline, try again later." />
            } else return <FallbackPage message="Oops! There was a problem." />

        } 

        return this.props.children; 
    }
}

export default withRouter(ErrorBoundary)