import React from "react";
import WrongNetwork from "./WrongNetwork";
import NoMetamask from "./NoMetamask";
import LockedAccount from "./LockedAccount";
import { Image, Container } from "semantic-ui-react";
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
      <div className="App-header" style={{ margin: "2em" }}>
        <Image src="./melon-logo.png" size="small" centered />
      </div>
      {props.web3.connectionMode === "MetaMask" ? props.web3.network ===
      "Kovan" ? props.web3.account ? (
        containerSelector[props.general.mode]
      ) : (
        <LockedAccount />
      ) : (
        <WrongNetwork />
      ) : (
        <NoMetamask />
      )}
    </Container>
  </div>
);

export default App;
