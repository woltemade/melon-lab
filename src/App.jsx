import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  HashRouter,
  Switch,
} from "react-router-dom";
import Welcome from "./components/newUser/welcome";
import ManagerView from "./components/existingUser/managerView";

import "./App.css";

const App = () =>
  (<HashRouter>
    <div className="App">
      <div className="App-header">
        <h1>MELON</h1>
      </div>
      <div>
        <Link to="/welcome">WELCOME</Link>
      </div>
      <div>
        <Link to="/manager">MANAGER VIEW</Link>
      </div>
      <hr />

      {/* <HashRouter basename="/" /> */}
      <Switch>
        <Route path="/welcome" component={Welcome} />
        {/* <Route path="/setup" component={Setup} />
        <Route path="/firstinvest" component={FirstInvest} />
        <Route path="/firsttrade" component={FirstTrade} /> */}
        <Route path="/manager" component={ManagerView} />
      </Switch>
    </div>
  </HashRouter>);

export default App;
