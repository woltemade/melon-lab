import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  HashRouter,
  Switch,
} from "react-router-dom";
import GetStarted from "./components/newUser/getStarted";
import ManagerView from "./components/existingUser/managerView";

import "./App.css";

const App = () =>
  (<HashRouter>
    <div className="App">
      <div className="App-header">
        <h1>MELON</h1>
      </div>
      <div>
        <Link to="/getstarted">WELCOME</Link>
      </div>
      <div>
        <Link to="/manager">MANAGER VIEW</Link>
      </div>
      <hr />

      {/* <HashRouter basename="/" /> */}
      <Switch>
        <Route path="/getstarted" component={GetStarted} />
        {/* <Route path="/setup" component={Setup} />
        <Route path="/firstinvest" component={FirstInvest} />
        <Route path="/firsttrade" component={FirstTrade} /> */}
        <Route path="/manager" component={ManagerView} />
      </Switch>
    </div>
  </HashRouter>);

export default App;
