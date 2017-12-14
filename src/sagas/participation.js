import { takeLatest, select, call, put } from "redux-saga/effects";
import { actionTypes, getFormValues, change } from "redux-form";
import { multiply, divide } from "../utils/functionalBigNumber";

function* calculateForm(action) {
  const values = yield select(getFormValues("participation"));
  const sharePrice = 1; // yield select(state => state.fund.sharePrice);

  // HACK: The invest/redeem toggle needs to be a proper field
  values.type = "invest";

  /*
  const enhancedSharePrice =
    values.type === "invest"
      ? multiply(sharePrice, 1.05)
      : multiply(sharePrice, 0.05);
  */

  if (action.meta.field === "total") {
    yield put(
      change("participation", "amount", divide(values.total, sharePrice)),
    );
  } else {
    yield put(
      change("participation", "total", multiply(values.amount, sharePrice)),
    );
  }
}

const participationChanges = action =>
  action.type === actionTypes.CHANGE && action.meta.form === "participation";

function* participation() {
  yield takeLatest(participationChanges, calculateForm);
}

export default participation;
