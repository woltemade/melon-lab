import { connect } from 'react-redux';
import GetStarted from '../components/organisms/GetStarted';
import { actions as routeActions } from '../actions/routes';
import { onboardingPath } from '../reducers/app';

const getLink = (onboardingState, usersFund) => {
  if (usersFund) {
    return {
      linkAction: routeActions.fund(usersFund),
      linkCaption: 'Go to your fund',
    };
  }

  if (onboardingState === onboardingPath.NO_ACCOUNT) {
    return {
      linkAction: routeActions.wallet(true),
      linkCaption: 'Setup your fund',
    };
  }

  if (onboardingState === onboardingPath.INSUFFICIENT_FUNDS) {
    return {
      linkAction: routeActions.wallet(true),
      linkCaption: 'Fund your wallet',
    };
  }

  return {
    linkAction: routeActions.setup(),
    linkCaption: 'Setup your fund',
  };
};

const mapStateToProps = state => ({
  networkId: state.ethereum.network,
  ...getLink(state.app.onboardingState, state.app.usersFund),
});

const GetStartedContainer = connect(mapStateToProps)(GetStarted);

export default GetStartedContainer;
