import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import WrongNetwork from '../organisms/WrongNetwork';
import NoConnection from '../organisms/NoConnection';
import LockedWallet from '../organisms/LockedWallet';
import InsufficientFunds from '../organisms/InsufficientFunds';
import TermsAndConditionsContainer from '../../containers/TermsAndConditions';
import SetupContainer from '../../containers/Setup';
import ParticipationContainer from '../../containers/Participation';
import { onboardingPath } from '../../reducers/app';
import FundContainer from '../../containers/Fund';
import RankingContainer from '../../containers/Ranking';
import WalletContainer from '../../containers/wallet/Account';
import WalletGenerate from '../../containers/wallet/Generate';
import RestoreContainer from '../../containers/wallet/Restore';
import ImportContainer from '../../containers/wallet/Import';
import CompetitionRegistrationContainer from '../../containers/CompetitionRegistration';
import OlympiadPlaceholderContainer from '../../containers/OlympiadPlaceholder';
import Modal from '../../containers/Modal';
import { types } from '../../actions/routes';
import ConnectionInfo from '../organisms/ConnectionInfo';

const mapOnboardingStateToMainContainer = {
  [onboardingPath.NO_PROVIDER]: NoConnection,
  [onboardingPath.NO_CONNECTION]: NoConnection,
  [onboardingPath.WRONG_NETWORK]: WrongNetwork,
  [onboardingPath.LOCKED_ACCOUNT]: LockedWallet,
  [onboardingPath.INSUFFICIENT_FUNDS]: InsufficientFunds,
  [onboardingPath.NOT_SIGNED]: TermsAndConditionsContainer,
  [onboardingPath.NO_FUND_CREATED]: SetupContainer,
  [onboardingPath.NOT_INVESTED_IN_OWN_FUND]: ParticipationContainer,
};

const routeContainerMap = {
  [types.ROOT]: RankingContainer,
  [types.RANKING]: RankingContainer,
  [types.WALLET_GENERATE]: WalletGenerate,
  [types.WALLET_RESTORE]: RestoreContainer,
  [types.WALLET_CREATE]: WalletContainer,
  [types.WALLET_IMPORT]: ImportContainer,
  [types.FUND]: FundContainer,
  [types.WALLET]: WalletContainer,
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
  const Main =
    route === types.SETUP
      ? mapOnboardingStateToMainContainer[onboardingState]
      : routeContainerMap[route];

  return Main ? (
    <Main
      mlnBalance={mlnBalance}
      ethBalance={ethBalance}
      setup
      usersFund={usersFund}
      walletAddress={walletAddress}
      network={network}
    />
  ) : (
    <div />
  );
};

const App = props => (
  <div className="App">
    <ConnectionInfo
      account={props.walletAddress}
      mlnBalance={props.mlnBalance}
      ethBalance={props.ethBalance}
      statusType={props.statusType}
      statusMessage={props.statusMessage}
      accountAction={props.accountAction}
      networkName={props.networkName}
    />

    <Container>
      <div className="App-header" style={{ marginBottom: '2em' }}>
        <Link to={props.rootAction}>
          <Image src="./static/melon-logo.png" size="small" centered />
        </Link>
      </div>
      {getMainComponent(props)}
    </Container>
    <Modal />
  </div>
);

export default App;
