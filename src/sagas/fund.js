import {
  getFundInformations,
  getParticipation,
  getParticipationAuthorizations,
  performCalculations,
  getFundForManager,
} from "@melonproject/melon.js";
import { takeLatest, put, call, select } from "redux-saga/effects";
import { actions, types } from "../actions/fund";
import { types as ethereumTypes } from "../actions/ethereum";
import { actions as appActions } from "../actions/app";

// TODO: Refactor these into new saga architecture
/*
import { creators as fundHoldingsCreators } from "../legacyComponents/fundHoldings/duck";
import { creators as generalCreators } from "../legacyComponents/general";
import { creators as orderbookCreators } from "../legacyComponents/orderbook/duck";
import { creators as participationCreators } from "../legacyComponents/participation/duck";
import { creators as recentTradesCreators } from "../legacyComponents/recentTrades/duck";
import { creators as tradeHelperCreators } from "../legacyComponents/tradeHelper/duck";
import { creators as tradingActivityCreators } from "../legacyComponents/tradingActivity/duck";
*/

function* requestInfo({ address }) {
  try {
    const account = yield select(state => state.ethereum.account);
    const fundInfo = yield call(getFundInformations, address);
    const calculations = yield call(performCalculations, address);
    const participationAuthorizations = yield call(
      getParticipationAuthorizations,
      address,
    );

    const info = {
      ...fundInfo,
      ...calculations,
      ...participationAuthorizations,
    };

    if (account) {
      const participation = yield call(
        getParticipation,
        fundInfo.fundAddress,
        account,
      );
      info.personalStake = participation.personalStake;
    }

    yield put(actions.infoSucceeded(info));

    // TODO: These are legacy dispatches, refactor them to the
    // new saga architecture
    /*
    const mode = calculations.totalSupply.gt(0) ? "Manage" : "Invest";

    yield put(
      generalCreators.update({
        mode,
        fundAddress: fundInfo.fundAddress,
        fundName: fundInfo.name,
      }),
    );

    // Also legacy : REMOVE!
    yield put(fundHoldingsCreators.requestHoldings());
    yield put(fundHoldingsCreators.requestPrices());
    yield put(orderbookCreators.requestOrderbook("BTC-T/MLN-T"));
    yield put(participationCreators.request_price());
    yield put(recentTradesCreators.requestRecentTrades("BTC-T/MLN-T"));
    yield put(tradeHelperCreators.request("BTC-T/MLN-T"));
    yield put(tradingActivityCreators.requestFundRecentTrades());
    */
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

function* getUsersFund({ account }) {
  if (!account) return;
  const fundAddress = yield call(getFundForManager, account);
  yield put(appActions.setUsersFund(fundAddress));
}

function* fund() {
  yield takeLatest(types.INFO_REQUESTED, requestInfo);
  yield takeLatest(types.SET, checkAndLoad);
  yield takeLatest(ethereumTypes.ACCOUNT_CHANGED, getUsersFund);
}

export default fund;
