import './App.css';

import AuthenticationContext from './contexts/authenticationContext';
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import DisplayBoardsPage from './pages/DisplayBoardsPage/DisplayBoardsPage'
import SpecificBoardPage from './pages/SpecificBoardPage/SpecificBoardPage'
import SpecificTaskPage from './pages/SpecificTaskPage/SpecificTaskPage'

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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          boardsByUserId: {
            merge(existing, incoming){
              return incoming
            }
          }
        }
      }
    }
  })
});

class App extends Component{

  constructor(){
    super()
    if (localStorage.getItem('accessToken') && localStorage.getItem('userId') && localStorage.getItem('username')) {
      this.state = {
        accessToken: localStorage.getItem('accessToken'),
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
      }
    } else {
      this.state = {
        accessToken: null,
        userId: null,
        username: null
      } 
    }
  }

  logIn = (userId, username, accessToken) => {
    this.setState({accessToken: accessToken, userId: userId, username: username})
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userId', userId)
    localStorage.setItem('username', username)
  }

  logOut = () => {
    this.setState({accessToken: null, userId: null, username: null})
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')

  }

  componentDidMount(){
    document.title = "task-fuel"
  }
  
  render(){
    return (
      <Router>
        <ApolloProvider client = {client}>
          <AuthenticationContext.Provider value={{accessToken: this.state.accessToken, userId: this.state.userId, username: this.state.username, logIn: this.logIn, logOut: this.logOut}}>
            <div id="app-div">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/register" exact />}
                <Route exact path="/:username/boards" component={({match}) => { return(<DisplayBoardsPage match={match} />)}} />
                <Route exact path="/:username/board/:boardId" component={({match}) => { return(<SpecificBoardPage match={match} />)}} />
                <Route exact path="/:username/board/:boardId/task/:taskId" component={({match}) => { return(<SpecificTaskPage match={match} />)}} />
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
