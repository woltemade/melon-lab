import { connect } from "react-redux";
import FundHoldings from "../../components/existingUser/fundHoldings";
import { creators } from "../ducks/fundHoldings";

const mapStateToProps = state => ({
  ...state.fundHoldings,
});

const mapDispatchToProps = dispatch => ({
  onRequest: () => {
    console.log("Inside onRequest for fund holdings");
    dispatch(creators.requestHoldings());
  },
  // onUpdate: event => {
  //   dispatch(
  //     creators.updateHoldings({ [event.target.name]: event.target.value }),
  //   );
  // },
});

const FundHoldingsContainer = connect(mapStateToProps, mapDispatchToProps)(
  FundHoldings,
);

export default FundHoldingsContainer;
