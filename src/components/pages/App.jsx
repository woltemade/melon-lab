import React from "react";
import {
  Switch,
  Redirect,
  Route,
  HashRouter as Router,
} from "react-router-dom";
import { Image, Container } from "semantic-ui-react";
import WrongNetwork from "../organisms/WrongNetwork";
import NoMetamask from "../organisms/NoMetamask";
import LockedAccount from "../organisms/LockedAccount";
import InsufficentFunds from "../organisms/InsufficentFunds";
import SetupContainer from "../../containers/Setup";
// import InvestContainer from "../../legacyComponents/invest/container";
import { onboardingPath } from "../../reducers/app";
import FundContainer from "../../containers/Fund";
import RankingContainer from "../../containers/Ranking";
import NewUser from "../../components/organisms/NewUser";

const mapOnboardingStateToMainContainer = {
  [onboardingPath.NO_PROVIDER]: NoMetamask,
  [onboardingPath.NO_CONNECTION]: NoMetamask,
  [onboardingPath.WRONG_NETWORK]: WrongNetwork,
  [onboardingPath.LOCKED_ACCOUNT]: LockedAccount,
  [onboardingPath.INSUFFICENT_ETH]: InsufficentFunds,
  [onboardingPath.INSUFFICENT_MLN]: InsufficentFunds,
  [onboardingPath.NO_FUND_CREATED]: SetupContainer,
  // [onboardingPath.NOT_INVESTED_IN_OWN_FUND]: InvestContainer,
};

const getSetupComponent = ({
  onboardingState,
  mlnBalance,
  ethBalance,
  isReadyToTrade,
  usersFund,
}) => {
  if (isReadyToTrade) {
    return <Redirect to={`/${usersFund}`} />;
  }
  const Main = mapOnboardingStateToMainContainer[onboardingState];
  return Main ? <Main mlnBalance={mlnBalance} ethBalance={ethBalance} /> : null;
};

const redirecter = ({ isReadyToTrade, usersFund, isReadyToVisit }) => {
  if (isReadyToVisit) {
    if (isReadyToTrade) {
      return <Redirect to={`/${usersFund}`} />;
    }
    // TODO: Change this to /ranking as soon as ranking is implemented
    return <Redirect to="/setup" />;
  }
  return <div>Loading ...</div>;
};

const App = props => (
  <Router>
    <div className="App">
      <Container>
        <div className="App-header" style={{ margin: "2em" }}>
          <Image src="./melon-logo.png" size="small" centered />
        </div>
        <Switch>
          <Route
            path="/setup"
            render={routerProps =>
              getSetupComponent({ ...routerProps, ...props })}
          />
          <Route path="/ranking" component={RankingContainer} />
          <Route path="/newuser" component={NewUser} />
          <Route path="/:fundAddress" component={FundContainer} />
          <Route
            render={routerProps => redirecter({ ...routerProps, ...props })}
          />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
