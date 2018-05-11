import { connect } from 'react-redux';

import { actions } from '../actions/account';
import OlympiadPlaceholder from '../components/pages/OlympiadPlaceholder';

const mapStateToProps = state => ({ ...state.account });

const mapDispatchToProps = dispatch => ({
  generateWallet: () => dispatch(actions.generateWallet()),
});

const OlympiadPlaceholderRedux = connect(mapStateToProps, mapDispatchToProps)(
  OlympiadPlaceholder,
);

export default OlympiadPlaceholderRedux;
