import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Link,
  HashRouter,
  Switch,
} from "react-router-dom";
import Welcome from "./components/welcome";
import Setup from "./components/setup";
import Invest from "./components/invest";
import FirstTrade from "./components/firstTrade";
import ManagerView from "./components/managerView";

import "./App.css";

const App = () =>
  (<HashRouter>
    <div>
      <div>
        <Link to="/setup">SETUP</Link>
      </div>
      <div>
        <Link to="/invest">INVEST</Link>
      </div>
      <div>
        <Link to="/firsttrade">FIRST TRADE</Link>
      </div>
      <div>
        <Link to="/manager">MANAGER</Link>
      </div>
      <hr />

      {/* <HashRouter basename="/" /> */}
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/setup" component={Setup} />
        <Route path="/invest" component={Invest} />
        <Route path="/firsttrade" component={FirstTrade} />
        <Route path="/manager" component={ManagerView} />
      </Switch>
    </div>
  </HashRouter>);

export default App;
