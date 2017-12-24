import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Modal from "../components/pages/Modal";
import { actions } from "../actions/modal";

const mapStateToProps = state => ({
  ...state.modal,
  type: state.modal.modalType
});

const onSubmit = (values, dispatch) => {
  dispatch(actions.confirmed(values.password));
};

const ModalRedux = connect(mapStateToProps)(Modal);

const ModalForm = reduxForm({
  form: "modal",
  onSubmit
})(ModalRedux);

export default ModalForm;
