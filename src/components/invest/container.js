import { connect } from "react-redux";
import Invest from "./invest";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.invest,
});

const mapDispatchToProps = dispatch => ({
  onInvest: () => {
    dispatch(creators.invest());
  },
  onChange: event => {
    dispatch(creators.change({ [event.target.name]: event.target.value }));
  },
});

const InvestContainer = connect(mapStateToProps, mapDispatchToProps)(Invest);

export default InvestContainer;
