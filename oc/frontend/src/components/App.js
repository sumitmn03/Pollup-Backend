import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import PrivateRoute from "./security/PrivateRoute";
import Form from "./posts/create/Form";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Homepage from "./posts/home/Homepage";
import FindPeoples from "./peoples/find/FindPeoples";
import Profile from "./peoples/profile/Profile";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <br /> <br />
              <div className="container">
                <Switch>
                  {/* only for authenticated users */}
                  <PrivateRoute exact path="/" component={Homepage} />
                  <PrivateRoute exact path="/post" component={Form} />
                  <PrivateRoute
                    exact
                    path="/findpeoples"
                    component={FindPeoples}
                  />
                  <PrivateRoute exact path="/profile" component={Profile} />

                  {/* for non-authenticated user */}
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
