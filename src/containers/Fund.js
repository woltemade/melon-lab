import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { actions } from "../actions/fund";
import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  setFund: address => {
    dispatch(actions.set(address));
  },
});

const FundLifecycle = lifecycle({
  componentDidMount() {
    this.props.setFund(this.props.match.params.fundAddress);
  },
})(Fund);

const FundContainer = connect(mapStateToProps, mapDispatchToProps)(
  FundLifecycle,
);

export default FundContainer;
