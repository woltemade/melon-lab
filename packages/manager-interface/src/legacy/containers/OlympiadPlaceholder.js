import { connect } from 'react-redux';

import { actions as routeActions } from '../actions/routes';
import OlympiadPlaceholder from '../components/pages/OlympiadPlaceholder';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  generateAccount: () => dispatch(routeActions.accountGenerate()),
});

const OlympiadPlaceholderRedux = connect(mapStateToProps, mapDispatchToProps)(
  OlympiadPlaceholder,
);

export default OlympiadPlaceholderRedux;
