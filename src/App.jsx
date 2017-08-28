import React, { Component } from "react";

import ManagerView from "./components/managerView/managerView";
import SetupContainer from "./components/setup/container";
import InvestContainer from "./components/invest/container";

import "./App.css";

const App = () =>
  (<div className="App">
    <div className="App-header">
      <h1>MELON</h1>
    </div>
    <hr />
    <SetupContainer />
    <InvestContainer />
    <ManagerView />
  </div>);

export default App;
