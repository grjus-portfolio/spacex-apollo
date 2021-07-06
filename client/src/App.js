import './App.css';
import logo from "./logo.svg";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Launches from "./components/Lauches";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img src={logo} alt="spaceX" style={{ width: 300, display: 'block', margin: 'auto' }} />
        <Launches />

      </div>
    </ApolloProvider>
  );
}

export default App;