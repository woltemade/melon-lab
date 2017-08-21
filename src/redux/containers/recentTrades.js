import { connect } from "react-redux";
import RecentTrades from "../../components/existingUser/recentTrades";
import { creators } from "../ducks/recentTrades";

const mapStateToProps = state => ({
  ...state.recentTrades,
});

const mapDispatchToProps = dispatch => ({
  onRequest: assetPair => {
    dispatch(creators.requestRecentTrades(assetPair));
  },
});

const RecentTradesContainer = connect(mapStateToProps, mapDispatchToProps)(
  RecentTrades,
);

export default RecentTradesContainer;
