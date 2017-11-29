import {
  getFundInformations,
  performCalculations,
} from "@melonproject/melon.js";
import { takeEvery, takeLatest, put, call, select } from "redux-saga/effects";
import { actions, types } from "../actions/fund";

// TODO: Refactor these into new saga architecture
import { creators as factsheetCreators } from "../legacyComponents/factsheet/duck";
import { creators as fundHoldingsCreators } from "../legacyComponents/fundHoldings/duck";
import { creators as generalCreators } from "../legacyComponents/general";
import { creators as orderbookCreators } from "../legacyComponents/orderbook/duck";
import { creators as participationCreators } from "../legacyComponents/participation/duck";
import { creators as recentTradesCreators } from "../legacyComponents/recentTrades/duck";
import { creators as settingsCreators } from "../legacyComponents/settings/duck";
import { creators as tradeHelperCreators } from "../legacyComponents/tradeHelper/duck";
import { creators as tradingActivityCreators } from "../legacyComponents/tradingActivity/duck";

function* requestInfo({ address }) {
  try {
    const fundInfo = yield call(getFundInformations, address);
    const calculations = yield call(performCalculations, address);

    yield put(
      actions.infoSucceeded({
        address: fundInfo.fundAddress,
        // owner: account,
        name: fundInfo.name,
        ...calculations,
      }),
    );

    // TODO: These are legacy dispatches, refactor them to the
    // new saga architecture
    const mode = calculations.totalSupply.gt(0) ? "Manage" : "Invest";

    yield put(
      generalCreators.update({
        mode,
        fundAddress: fundInfo.fundAddress,
        fundName: fundInfo.name,
      }),
    );

    // Also legacy : REMOVE!
    yield put(factsheetCreators.requestInformations());
    yield put(fundHoldingsCreators.requestHoldings());
    yield put(fundHoldingsCreators.requestPrices());
    yield put(orderbookCreators.requestOrderbook("BTC-T/MLN-T"));
    yield put(participationCreators.request_price());
    yield put(recentTradesCreators.requestRecentTrades("BTC-T/MLN-T"));
    yield put(settingsCreators.requestSettings());
    yield put(tradeHelperCreators.request("BTC-T/MLN-T"));
    yield put(tradingActivityCreators.requestFundRecentTrades());
  } catch (err) {
    console.error(err);
    yield put(actions.infoFailed(err));
  }
}

function* checkAndLoad({ address }) {
  const isReadyToVisit = yield select(state => state.app.isReadyToVisit);

  if (isReadyToVisit) {
    yield put(actions.infoRequested(address));
  }
}

function* fund() {
  yield takeLatest(types.INFO_REQUESTED, requestInfo);
  yield takeEvery(types.SET, checkAndLoad);
}

export default fund;
