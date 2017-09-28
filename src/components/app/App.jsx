import React from "react";
import { Menu } from "semantic-ui-react";
import ManagerViewContainer from "../managerView/container";
import SetupContainer from "../setup/container";
import InvestContainer from "../invest/container";
import ExecuteRequestContainer from "../executeRequest/container";

import "../../App.css";

const containerSelector = {
  Setup: <SetupContainer />,
  Invest: <InvestContainer />,
  Execute: <ExecuteRequestContainer />,
  Manage: <ManagerViewContainer />,
};

const App = props => (
  <div className="App">
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

    {containerSelector[props.general.mode]}
  </div>
);

export default App;
