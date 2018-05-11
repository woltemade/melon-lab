import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import WrongNetwork from '../organisms/WrongNetwork';
import NoConnection from '../organisms/NoConnection';
import LockedAccount from '../organisms/LockedAccount';
import InsufficientFunds from '../organisms/InsufficientFunds';
import TermsAndConditionsContainer from '../../containers/TermsAndConditions';
import SetupContainer from '../../containers/Setup';
import ParticipationContainer from '../../containers/Participation';
import { onboardingPath } from '../../reducers/app';
import FundContainer from '../../containers/Fund';
import RankingContainer from '../../containers/Ranking';
import AccountContainer from '../../containers/account/Account';
import AccountGenerate from '../../containers/account/Generate';
import RestoreContainer from '../../containers/account/Restore';
import ImportContainer from '../../containers/account/Import';
import CompetitionRegistrationContainer from '../../containers/CompetitionRegistration';
import OlympiadPlaceholderContainer from '../../containers/OlympiadPlaceholder';
import Modal from '../../containers/Modal';
import { types } from '../../actions/routes';
import ConnectionInfo from '../organisms/ConnectionInfo';

const mapOnboardingStateToMainContainer = {
  [onboardingPath.NO_PROVIDER]: NoConnection,
  [onboardingPath.NO_CONNECTION]: NoConnection,
  [onboardingPath.WRONG_NETWORK]: WrongNetwork,
  [onboardingPath.LOCKED_ACCOUNT]: LockedAccount,
  [onboardingPath.INSUFFICIENT_FUNDS]: InsufficientFunds,
  [onboardingPath.NOT_SIGNED]: TermsAndConditionsContainer,
  [onboardingPath.NO_FUND_CREATED]: SetupContainer,
  [onboardingPath.NOT_INVESTED_IN_OWN_FUND]: ParticipationContainer,
};

const routeContainerMap = {
  [types.ROOT]: OlympiadPlaceholderContainer,
  [types.RANKING]: RankingContainer,
  [types.ACCOUNT_GENERATE]: AccountGenerate,
  [types.ACCOUNT_RESTORE]: RestoreContainer,
  [types.ACCOUNT_CREATE]: AccountContainer,
  [types.ACCOUNT_IMPORT]: ImportContainer,
  [types.FUND]: FundContainer,
  [types.ACCOUNT]: AccountContainer,
  [types.COMPETITION]: CompetitionRegistrationContainer,
};

const getMainComponent = ({
  onboardingState,
  mlnBalance,
  ethBalance,
  usersFund,
  walletAddress,
  route,
  network,
  networkName,
}) => {
  // if (route === types.SETUP) {
  //   const Main = mapOnboardingStateToMainContainer[onboardingState];
  //   return Main ? (
  //     <Main
  //       mlnBalance={mlnBalance}
  //       ethBalance={ethBalance}
  //       setup
  //       usersFund={usersFund}
  //       walletAddress={walletAddress}
  //       network={network}
  //     />
  //   ) : null;
  // } else if (route === types.COMPETITION) {
  //   return <CompetitionRegistrationContainer />;
  // }
  const Main = routeContainerMap[route];
  return <Main />;
};

const App = props => (
  <div className="App">
    <Container>
      <div className="App-header" style={{ marginBottom: '2em' }}>
        <Link to={props.rootAction}>
          <Image src="/static/melon-logo.png" size="small" centered />
        </Link>
      </div>
      {getMainComponent(props)}
    </Container>
    <Modal />
  </div>
);

export default App;
