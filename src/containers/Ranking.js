import moment from "moment";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import Ranking from "../components/organisms/Ranking";
import { actions } from "../actions/ranking";
import displayNumber from "../utils/displayNumber";
import { actions as routeActions } from "../actions/routes";

const mapStateToProps = state => ({
  rankingList: state.ranking.rankingList.map(fund => ({
    ...fund,
    inception: moment(fund.inception).format("D. MMM YYYY HH:mm"),
    sharePrice: displayNumber(fund.sharePrice.toString()),
  })),
  getFundLinkAction: fundAddress => routeActions.fund(fundAddress),
});

const mapDispatchToProps = dispatch => ({
  getRanking: () => dispatch(actions.getRanking()),
});

const RankingLifecycle = lifecycle({
  componentDidMount() {
    this.props.getRanking();
  },
})(Ranking);

const RankingContainer = connect(mapStateToProps, mapDispatchToProps)(
  RankingLifecycle,
);

export default RankingContainer;
