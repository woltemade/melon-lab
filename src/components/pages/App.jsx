import React from "react";
import { Image, Container } from "semantic-ui-react";
import WrongNetwork from "../organisms/WrongNetwork";
import NoMetamask from "../organisms/NoMetamask";
import LockedAccount from "../organisms/LockedAccount";
import InsufficentFunds from "../organisms/InsufficentFunds";
import ManagerViewContainer from "../../legacyComponents/managerView/container";
import SetupContainer from "../../containers/Setup";
import InvestContainer from "../../legacyComponents/invest/container";
import { onboardingPath } from "../../reducers/app";

const mapOnboardingStateToMainContainer = {
  [onboardingPath.NO_PROVIDER]: NoMetamask,
  [onboardingPath.NO_CONNECTION]: NoMetamask,
  [onboardingPath.WRONG_NETWORK]: WrongNetwork,
  [onboardingPath.LOCKED_ACCOUNT]: LockedAccount,
  [onboardingPath.INSUFFICENT_ETH]: InsufficentFunds,
  [onboardingPath.INSUFFICENT_MLN]: InsufficentFunds,
  [onboardingPath.NO_FUND_CREATED]: SetupContainer,
  [onboardingPath.NOT_INVESTED_IN_OWN_FUND]: InvestContainer,
  [onboardingPath.NOT_TRADED_YET]: ManagerViewContainer,
  [onboardingPath.ONBOARDED]: ManagerViewContainer,
};

const App = ({ onboardingState, mlnBalance, ethBalance }) => (
  <div className="App">
    <Container>
      <div className="App-header" style={{ margin: "2em" }}>
        <Image src="./melon-logo.png" size="small" centered />
      </div>
      {(() => {
        const Main = mapOnboardingStateToMainContainer[onboardingState];
        return <Main mlnBalance={mlnBalance} ethBalance={ethBalance} />;
      })()}
    </Container>
  </div>
);

export default App;
