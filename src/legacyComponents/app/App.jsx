import React from "react";
import { Image, Container } from "semantic-ui-react";
import WrongNetwork from "./WrongNetwork";
import NoMetamask from "./NoMetamask";
import LockedAccount from "./LockedAccount";
import ManagerViewContainer from "../managerView/container";
import SetupContainer from "../setup/container";
import InvestContainer from "../invest/container";
import { onboardingPath } from "../../reducers/app";

const mapOnboardingStateToMainContainer = {
  [onboardingPath.NO_PROVIDER]: <NoMetamask />,
  [onboardingPath.NO_CONNECTION]: <NoMetamask />,
  [onboardingPath.WRONG_NETWORK]: <WrongNetwork />,
  [onboardingPath.LOCKED_ACCOUNT]: <LockedAccount />,
  [onboardingPath.INSUFFICENT_ETH]: <SetupContainer />,
  [onboardingPath.INSUFFICENT_MLN]: <SetupContainer />,
  [onboardingPath.NO_FUND_CREATED]: <SetupContainer />,
  [onboardingPath.NOT_INVESTED_IN_OWN_FUND]: <InvestContainer />,
  [onboardingPath.NOT_TRADED_YET]: <ManagerViewContainer />,
  [onboardingPath.ONBOARDED]: <ManagerViewContainer />,
};

const App = ({ onboardingState }) => (
  <div className="App">
    <Container>
      <div className="App-header" style={{ margin: "2em" }}>
        <Image src="./melon-logo.png" size="small" centered />
      </div>
      {mapOnboardingStateToMainContainer[onboardingState]}
    </Container>
  </div>
);

export default App;
