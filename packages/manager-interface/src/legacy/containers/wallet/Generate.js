import { connect } from 'react-redux';

import { actions as routeActions } from '../../actions/routes';
import Generate from '../../components/pages/wallet/Generate';

const mapStateToProps = state => ({
  mnemonic: state.wallet.mnemonic,
});

const mapDispatchToProps = dispatch => ({
  restore: () => dispatch(routeActions.walletRestore({ onboarding: true })),
});

const GenerateRedux = connect(mapStateToProps, mapDispatchToProps)(Generate);

export default GenerateRedux;
