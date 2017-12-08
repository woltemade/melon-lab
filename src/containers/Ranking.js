import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Ranking from "../components/organisms/Ranking";
import { actions } from "../actions/fund";

const mapStateToProps = state => ({});

const RankingContainer = connect(mapStateToProps)(Ranking);

export default RankingContainer;
