import { reduxForm } from "redux-form";
import { connect } from "react-redux";

const connectForm = FormComponent => {
  const connected = connect()(FormComponent);
  const Form = reduxForm({
    form: "storybook",
  })(connected);
  return Form;
};

export default connectForm;
