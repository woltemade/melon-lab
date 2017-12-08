import { connect } from "react-redux";
import { lifecycle } from "recompose";
import Ranking from "../components/organisms/Ranking";
import { actions } from "../actions/ranking";

const mapStateToProps = state => ({ rankingList: state.ranking.rankingList });

const mapDispatchToProps = dispatch => ({
  loadRanking: () => dispatch(actions.loadRanking()),
});

const RankingLifecycle = lifecycle({
  componentDidMount() {
    this.props.loadRanking();
  },
})(Ranking);

const RankingContainer = connect(mapStateToProps, mapDispatchToProps)(
  RankingLifecycle,
);

export default RankingContainer;
