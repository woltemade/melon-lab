import React, { Component } from "react";

import ManagerView from "./components/existingUser/managerView";
import Onboarding from "./components/newUser/onboarding";

import "./App.css";

const App = () =>
  (<div className="App">
    <div className="App-header">
      <h1>MELON</h1>
    </div>
    <hr />
    <Onboarding />
    <ManagerView />
  </div>);

export default App;
