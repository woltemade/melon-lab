import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import ManagerView from "./components/managerView/managerView";
import SetupContainer from "./components/setup/container";
import InvestContainer from "./components/invest/container";

import "./App.css";

const App = () =>
  (<div className="App">
    <div className="App-header">
      <h1>MELON</h1>
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item name="My fund" href="#factsheet" />
          <Menu.Item name="Trade" href="#trade" />
          <Menu.Item name="Settings" href="#settings" />
        </Menu.Menu>
      </Menu>
    </div>
    <hr />
    <SetupContainer />
    <InvestContainer />
    <ManagerView />
  </div>);

export default App;
