import { connect } from "react-redux";
import FundHoldings from "./fundHoldings";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.fundHoldings,
  ...state.factsheet,
});

const mapDispatchToProps = dispatch => ({
  onRequest: () => {
    dispatch(creators.requestHoldings());
  },
});

const FundHoldingsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FundHoldings,
);

export default FundHoldingsContainer;
