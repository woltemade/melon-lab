import { takeLatest, take, select, call, put } from "redux-saga/effects";
import { makeOrder, takeOrder, decryptWallet } from "@melonproject/melon.js";
import { types, actions } from "../actions/trade";
import { actions as appActions } from "../actions/app";
import { actions as fundActions } from "../actions/fund";
import { actions as modalActions, types as modalTypes } from "../actions/modal";

function* placeOrderSaga(action) {
  yield put(
    modalActions.confirm(
      `Do you really want to buy ${action.amount} shares for ${action.total} MLN? If yes, please type your password below:`,
    ),
  );
  const { password } = yield take(modalTypes.CONFIRMED);

  try {
    yield put(modalActions.loading());
    const wallet = localStorage.getItem("wallet:melon.fund");
    const decryptedWallet = yield call(decryptWallet, wallet, password);

    const fundAddress = yield select(state => state.fund.address);
    // const sellWhichToken;
    //   const buyWhichToken;
    //   const sellHowMuch;
    //  const  buyHowMuch;

    // const orderPlaced = yield call(
    //   makeOrder,
    //   decryptedWallet,
    //   fundAddress,
    //   sellWhichToken,
    //   buyWhichToken,
    //   sellHowMuch,
    //   buyHowMuch,
    // );
    // yield put(actions.placeOrderSucceeded());
    // yield put(modalActions.close());
    // yield put(fundActions.infoRequested(fundAddress));
  } catch (err) {
    if (err.name === "password") {
      yield put(modalActions.error("Wrong password"));
    } else if (err.name === "EnsureError") {
      yield put(modalActions.error(err.message));
    } else {
      yield put(modalActions.error(err.message));
      console.error(err);
      console.log(JSON.stringify(err, null, 4));
    }
    yield put(actions.placeOrderFailed());
  }
}

function* takeOrderSaga(action) {
  const password = window.prompt("Enter your password. Yes. Really. Do IT.");
  const wallet = localStorage.getItem("wallet:melon.fund");
  const decryptedWallet = yield call(decryptWallet, wallet, password);

  try {
    yield put(appActions.transactionStarted());
    const fundAddress = yield select(state => state.fund.address);
    // const orderId;
    // const quantityAsked;
    // const orderTaken = yield call(
    //   takeOrder,
    //   decryptedWallet,
    //   orderId,
    //   fundAddress,
    //   quantityAsked
    // );
    // yield put(actions.takeOrderSucceeded());
    // yield put(fundActions.infoRequested(fundAddress));
  } catch (err) {
    console.error(err);
    yield put(actions.takeOrderFailed());
  } finally {
    yield put(appActions.transactionFinished());
  }
}

function* trade() {
  yield takeLatest(types.PLACE_ORDER_REQUESTED, placeOrderSaga);
  yield takeLatest(types.TAKE_ORDER_REQUESTED, takeOrderSaga);
}

export default trade;
