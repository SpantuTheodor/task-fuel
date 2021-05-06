import './App.css';

import TaskGrid from './components/TaskGrid/TaskGrid';
import AddTask from './components/AddTask/AddTask';
import Navbar from './shared/components/Navbar/Navbar';
import LoginForm from './login/components/LoginForm/LoginForm';
import RegisterForm from './register/components/RegisterForm/RegisterForm';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDkyYmZhODUzNjIyOTZiMDgwYmEwZDkiLCJuYW1lIjoiSm9ueSIsInBhc3N3b3JkIjoiTmVidW51IiwiaWF0IjoxNjIwMzMyODkyLCJleHAiOjE2MjAzMzY0OTJ9.iLaWYK-McZCYM-X7rIEj90XwZuwux6EAT3M6sdvCGbA`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client = {client}>
        <div id="app-div">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <TaskGrid />
              <AddTask />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
