import { connect } from "react-redux";
import { actions } from "../actions/fundHoldings";
import FundHoldings from "../components/organisms/FundHoldings";
import displayNumber from "../utils/displayNumber";

const mapStateToProps = state => ({
  ...state.fundHoldings,
  ...state.factsheet,
});

const mapDispatchToProps = dispatch => ({
  getHoldings: () => {
    dispatch(actions.getHoldings());
  },
  // onClick: asset => {
  //   if (asset !== "MLN-T") {
  //     const assetPair = `${asset}/MLN-T`;
  //     dispatch(generalCreators.updateAssetPair(assetPair));
  //   }
  // },
});

const FundHoldingsContainter = connect(mapStateToProps, mapDispatchToProps)(
  FundHoldings,
);

export default FundHoldingsContainter;
