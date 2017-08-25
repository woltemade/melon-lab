import { connect } from "react-redux";
import FundHoldings from "../../components/existingUser/fundHoldings";
import { creators } from "../ducks/fundHoldings";

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
