import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { getAllUsers } from "./services";
import { addUsers } from "./actions/userActions";
import "./App.css";
import CreateUser from "./components/createUser";
import ViewUsers from "./components/viewUsers";
import Home from "./components/home";
import { connect } from "react-redux";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.loadData();
  }
  loadData = async () => {
    try {
      const response = await getAllUsers();
      this.props.addUsers(response.data.user);
    } catch (error) {}
  };

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
            path="/create/:id"
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

export default connect(null, { addUsers })(App);
