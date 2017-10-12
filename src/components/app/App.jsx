import React from "react";
import { Menu, Image, Container } from "semantic-ui-react";
import ManagerViewContainer from "../managerView/container";
import SetupContainer from "../setup/container";
import InvestContainer from "../invest/container";
import ExecuteRequestContainer from "../executeRequest/container";

const containerSelector = {
  Setup: <SetupContainer />,
  Invest: <InvestContainer />,
  Execute: <ExecuteRequestContainer />,
  Manage: <ManagerViewContainer />,
};

const App = props => (
  <div className="App">
    <Container>
      <div className="App-header">
        <br />
        <Image src="./melon-logo.png" size="small" centered />
        <Menu secondary>
          <Menu.Menu position="right">
            <Menu.Item name="My fund" href="#factsheet" />
            <Menu.Item name="Trade" href="#trade" />
            <Menu.Item name="History" href="#history" />
          </Menu.Menu>
        </Menu>
      </div>
      <hr />

      {containerSelector[props.general.mode]}
    </Container>
  </div>
);

export default App;
