import moment from "moment";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { lifecycle } from "recompose";
import Ranking from "../components/pages/Ranking";
import { actions } from "../actions/ranking";
import displayNumber from "../utils/displayNumber";
import { actions as routeActions } from "../actions/routes";

const mapStateToProps = state => ({
  rankingList: state.ranking.rankingList
    .filter(fund =>
      fund.name
        .toLocaleLowerCase()
        .includes(state.ranking.search.toLocaleLowerCase()),
    )
    .map(fund => ({
      ...fund,
      inception: moment(fund.inception).format("D. MMM YYYY HH:mm"),
      sharePrice: displayNumber(fund.sharePrice.toString()),
    })),
  search: state.ranking.search,
  usersFund: state.app.usersFund,
  getFundLinkAction: fundAddress => routeActions.fund(fundAddress),
  loading: state.ranking.loading,
});

const mapDispatchToProps = dispatch => ({
  getRanking: () => dispatch(actions.getRanking()),
  onFilterChange: (event, value) => dispatch(actions.setSearch(value)),
});

const RankingLifecycle = lifecycle({
  componentDidMount() {
    this.props.getRanking();
  },
})(Ranking);

const RankingSetup = connect(mapStateToProps, mapDispatchToProps)(
  RankingLifecycle,
);

const RankingForm = reduxForm({ form: "ranking " })(RankingSetup);

export default RankingForm;
