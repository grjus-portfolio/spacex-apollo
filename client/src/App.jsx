import './App.css';
import logo from "./logo.svg";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Launches from "./components/Lauches";
import Launch from "./components/Launch";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <img src={logo} alt="spaceX" style={{ width: 300, display: 'block', margin: 'auto' }} />
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/launches" component={Launches} />
            <Route exact path="/launch/:flight_number" component={Launch} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
