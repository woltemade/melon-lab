import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import { actions } from "../actions/participation";
import Participation from "../components/organisms/ParticipationForm";
import { actions as fundActions } from "../actions/fund";
import { multiply, divide } from "../utils/functionalBigNumber";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress,
  onboardingState: state.app.onboardingState,
  usersFund: state.app.usersFund,
  fundAddress: state.fund.address,
  initialValues: {
    type: "Invest",
    amount: 1,
    price: state.fund.sharePrice,
    total: multiply(1, state.fund.sharePrice),
  },
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestFund: fundAddress => dispatch(fundActions.infoRequested(fundAddress)),
  onChange: (values, _dispatch, props, previousValues) => {
    const changed = Object.keys(values).reduce(
      (acc, key) => (values[key] !== previousValues[key] ? [key, ...acc] : acc),
      [],
    );

    if (changed.includes("total")) {
      const amount = divide(values.total, values.price);

      if (values.amount !== amount)
        dispatch(change("participation", "amount", amount));
    }

    if (changed.includes("amount")) {
      const total = multiply(values.amount, values.price);

      if (values.total !== total)
        dispatch(change("participation", "total", total));
    }
  },
  onSubmit: values => {
    if (values.type === "Invest") {
      dispatch(
        actions.subscribe({ ...values, directlyExecute: ownProps.setup }),
      );
    } else {
      dispatch(actions.redeem(values));
    }
  },
});

const ParticipationForm = reduxForm({
  form: "participation",
  enableReinitialize: true,
})(Participation);

const ParticipationRedux = connect(mapStateToProps, mapDispatchToProps)(
  ParticipationForm,
);

export default ParticipationRedux;
