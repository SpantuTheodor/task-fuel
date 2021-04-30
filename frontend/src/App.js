import './App.css';
import TaskGrid from './components/TaskGrid/TaskGrid';
import AddTask from './components/AddTask/AddTask'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client = {client}>
      <div className="App">
        <h1>Toya</h1>
          <TaskGrid />
          <AddTask />
      </div>
    </ApolloProvider>
  );
}

export default App;
