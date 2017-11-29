import { connect } from "react-redux";
import Fund from "../components/pages/Fund";

const mapStateToProps = state => ({
  ...state,
});

const FundContainer = connect(mapStateToProps)(Fund);

export default FundContainer;
