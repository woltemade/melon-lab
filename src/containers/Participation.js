import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";
import { actions } from "../actions/participation";
import Participation from "../components/organisms/ParticipationForm";
import { actions as fundActions } from "../actions/fund";
import { multiply, divide, equals } from "../utils/functionalBigNumber";
import displayNumber from "../utils/displayNumber";

const calculateParticipationPrice = (sharePrice, type) => {
  if (!equals(sharePrice, 1)) {
    if (type === "Invest") {
      return multiply(sharePrice, 1.05);
    }
    return multiply(sharePrice, 0.95);
  }

  return sharePrice;
};

const mapStateToProps = state => ({
  onboardingState: state.app.onboardingState,
  usersFund: state.app.usersFund,
  fundAddress: state.fund.address,
  dataValid: state.ethereum.isDataValid,
  initialValues: {
    type: "Invest",
    amount: 1,
    price:
      state.fund.sharePrice === "..."
        ? "..."
        : calculateParticipationPrice(state.fund.sharePrice, "Invest"),
    total:
      state.fund.sharePrice === "..."
        ? "..."
        : calculateParticipationPrice(state.fund.sharePrice, "Invest"),
  },
  displayNumber,
  quoteAsset: state.app.assetPair.quote,
  participationType: state.form.participation
    ? state.form.participation.values.type
    : "Invest",
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestFund: fundAddress => dispatch(fundActions.infoRequested(fundAddress)),
  onChange: (values, _dispatch, props, previousValues) => {
    const changed = Object.keys(values).reduce(
      (acc, key) => (values[key] !== previousValues[key] ? [key, ...acc] : acc),
      [],
    );

    if (changed.includes("type")) {
      const participationPrice = calculateParticipationPrice(
        values.price,
        values.type,
      );

      if (!equals(values.price, participationPrice)) {
        dispatch(change("participation", "price", participationPrice));
      }
    } else if (changed.includes("amount") || changed.includes("price")) {
      const total = multiply(values.amount, values.price);

      if (values.total !== total)
        dispatch(change("participation", "total", total));
    } else if (changed.includes("total") || changed.includes("price")) {
      const amount = divide(values.total, values.price);

      if (values.amount !== amount)
        dispatch(change("participation", "amount", amount));
    }
  },
  onSubmit: values => {
    if (values.type === "Invest") {
      dispatch(actions.invest({ ...values, directlyExecute: ownProps.setup }));
    } else if (values.type === "Redeem") {
      dispatch(actions.redeem(values));
    } else if (values.type === "Slices") {
      dispatch(actions.redeemAllOwnedAssets(values));
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
