import React, { Component } from "react";

import ManagerView from "./components/existingUser/managerView";
import SetupContainer from "./redux/containers/setup";
import Invest from "./components/newUser/invest";

import "./App.css";

const App = () =>
  (<div className="App">
    <div className="App-header">
      <h1>MELON</h1>
    </div>
    <hr />
    <SetupContainer />
    <Invest />
    <ManagerView />
  </div>);

export default App;
