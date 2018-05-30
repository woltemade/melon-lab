import { connect } from 'react-redux';

import { actions as routeActions } from '../actions/routes';
import OlympiadPlaceholder from '../components/pages/OlympiadPlaceholder';

const mapStateToProps = state => ({
  address: state.ethereum.account,
});

const mapDispatchToProps = dispatch => ({
  goToGenerateAccount: () => dispatch(routeActions.walletGenerate()),
  goToAccount: () => dispatch(routeActions.account()),
});

const OlympiadPlaceholderRedux = connect(mapStateToProps, mapDispatchToProps)(
  OlympiadPlaceholder,
);

export default OlympiadPlaceholderRedux;
