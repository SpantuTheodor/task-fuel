import './App.css';

import AuthenticationContext from './contexts/authenticationContext';
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import SpecificBoardPage from './pages/SpecificBoardPage/SpecificBoardPage'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import React, { Component } from 'react';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  let accessToken = localStorage.getItem('accessToken')
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends Component{

  state = {
    accessToken: null,
    userId: null
  }

  logIn = (userId, accessToken) => {
    this.setState({accessToken: accessToken, userId: userId})
    localStorage.setItem('accessToken', accessToken)
  }

  logOut = () => {
    this.setState({accessToken: null, userId: null})
    localStorage.removeItem('accessToken')
  }

  render(){
    return (
      <Router>
        <ApolloProvider client = {client}>
          <AuthenticationContext.Provider value={{accessToken: this.state.accessToken, userId: this.state.userId, logIn: this.logIn, logOut: this.logOut}}>
            <div id="app-div">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/register" exact />}
                <Route exact path="/board" component={SpecificBoardPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route path ="/" component={SpecificBoardPage} />
              </Switch>
            </div>
          </AuthenticationContext.Provider>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
