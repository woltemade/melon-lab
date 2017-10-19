import { connect } from "react-redux";
import ManagerView from "./managerView";

const mapStateToProps = state => ({
  ...state,
});

const ManagerViewContainer = connect(mapStateToProps)(ManagerView);

export default ManagerViewContainer;
