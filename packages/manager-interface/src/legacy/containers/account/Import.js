import { connect } from 'react-redux';

import { actions as routeActions } from '../../actions/routes';
import { actions as accountActions } from '../../actions/account';
import Import from '../../components/pages/account/Import';

const mapStateToProps = state => ({
  mnemonic: state.account.mnemonic,
});

const mapDispatchToProps = dispatch => ({
  goToAccount: () => dispatch(routeActions.account()),
  parseWallet: files => {
    var reader = new FileReader();

    reader.onloadend = function() {
      dispatch(accountActions.importWallet(reader.result));
    };

    reader.onerror = function(error) {
      dispatch(accountActions.importWalletFailed(error));
    };

    reader.readAsBinaryString(files[0]);
  },
});

const ImportRedux = connect(mapStateToProps, mapDispatchToProps)(Import);

export default ImportRedux;
