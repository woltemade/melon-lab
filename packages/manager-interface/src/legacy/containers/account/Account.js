import { connect } from 'react-redux';

import { actions } from '../../actions/account';
import { actions as routeActions } from '../../actions/routes';
import Account from '../../components/pages/account/Account';

const mapStateToProps = state => ({
  currentAddress: state.ethereum.account,
  associatedFund: state.app.usersFund,
  networkId: state.ethereum.network,
});

const mapDispatchToProps = dispatch => ({
  downloadJSON: () => dispatch(actions.downloadJSON()),
  deleteWallet: () => dispatch(actions.deleteWallet()),
  gotoImportJSON: () => dispatch(routeActions.walletImport()),
  gotoAccountGenerate: () => dispatch(routeActions.walletGenerate()),
  gotoAccountRestore: () => dispatch(routeActions.walletRestore()),
});

const AccountRedux = connect(mapStateToProps, mapDispatchToProps)(Account);

export default AccountRedux;
