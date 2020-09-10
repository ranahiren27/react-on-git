import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import CreateUser from "./components/createUser";
import ViewUsers from "./components/viewUsers";
import Home from "./components/home";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/create"
            exact
            render={(props) => <CreateUser {...props} />}
          />
          <Route
            path="/view"
            exact
            render={(props) => <ViewUsers {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
