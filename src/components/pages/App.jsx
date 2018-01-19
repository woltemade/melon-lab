import React from "react";
import { Image, Container } from "semantic-ui-react";
import WrongNetwork from "../organisms/WrongNetwork";
import NoMetamask from "../organisms/NoMetamask";
import LockedAccount from "../organisms/LockedAccount";
import InsufficientFunds from "../organisms/InsufficientFunds";
import SetupContainer from "../../containers/Setup";
import ParticipationContainer from "../../containers/Participation";
import { onboardingPath } from "../../reducers/app";
import FundContainer from "../../containers/Fund";
import RankingContainer from "../../containers/Ranking";
import AccountContainer from "../../containers/Account";
import RestoreContainer from "../../containers/Restore";
import MyAccountContainer from "../../containers/MyAccount";
import Modal from "../../containers/Modal";
import { types } from "../../actions/routes";
import ConnectionInfo from "../organisms/ConnectionInfo";

const mapOnboardingStateToMainContainer = {
  [onboardingPath.NO_PROVIDER]: NoMetamask,
  [onboardingPath.NO_CONNECTION]: NoMetamask,
  [onboardingPath.WRONG_NETWORK]: WrongNetwork,
  [onboardingPath.LOCKED_ACCOUNT]: LockedAccount,
  [onboardingPath.INSUFFICIENT_FUNDS]: InsufficientFunds,
  [onboardingPath.NO_FUND_CREATED]: SetupContainer,
  [onboardingPath.NOT_INVESTED_IN_OWN_FUND]: ParticipationContainer,
};

const routeContainerMap = {
  [types.RANKING]: RankingContainer,
  [types.ACCOUNT_SETUP]: AccountContainer,
  [types.ACCOUNT_RESTORE]: RestoreContainer,
  [types.ACCOUNT_CREATE]: AccountContainer,
  [types.ACCOUNT_ENCRYPT]: AccountContainer,
  [types.FUND]: FundContainer,
  [types.MY_ACCOUNT]: MyAccountContainer,
};

const getMainComponent = ({
  onboardingState,
  mlnBalance,
  ethBalance,
  usersFund,
  walletAddress,
  route,
  myAccount,
}) => {
  if (route === types.SETUP) {
    const Main = mapOnboardingStateToMainContainer[onboardingState];
    return Main ? (
      <Main
        mlnBalance={mlnBalance}
        ethBalance={ethBalance}
        setup
        usersFund={usersFund}
        walletAddress={walletAddress}
        myAccount={myAccount}
      />
    ) : null;
  }
  const Main = routeContainerMap[route];
  return Main ? <Main /> : <div />;
};

const App = props => (
  <div className="App">
    <ConnectionInfo
      account={props.walletAddress}
      mlnBalance={props.mlnBalance}
      ethBalance={props.ethBalance}
      statusType={props.statusType}
      statusMessage={props.statusMessage}
      myAccount={props.myAccount}
    />
    <Container>
      <div className="App-header" style={{ margin: "2em" }}>
        <a
          href="https://github.com/melonproject"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="./melon-logo.png" size="small" centered />
        </a>
      </div>
      {getMainComponent(props)}
    </Container>
    <Modal />
  </div>
);

export default App;
