import {
  getFundInformations,
  getParticipation,
  getParticipationAuthorizations,
  performCalculations,
  getFundForManager,
} from "@melonproject/melon.js";
import { takeLatest, put, call, take, select } from "redux-saga/effects";
import { actions, types } from "../actions/fund";
import { types as ethereumTypes } from "../actions/ethereum";
import { actions as appActions, types as appTypes } from "../actions/app";
import {
  types as routeTypes,
  actions as routeActions,
} from "../actions/routes";

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
      address,
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
  } catch (err) {
    console.error(err);
    yield put(actions.infoFailed(err));
  }
}

function* checkAndLoad() {
  const address = yield select(state => state.location.payload.address);
  let isReadyToVisit = yield select(state => state.app.isReadyToVisit);

  while (!isReadyToVisit) {
    yield take(appTypes.SET_READY_STATE);
    isReadyToVisit = yield select(state => state.app.isReadyToVisit);
  }

  yield put(actions.infoRequested(address));
}

function* getUsersFund({ account }) {
  if (!account) return;
  const fundAddress = yield call(getFundForManager, account);
  // Even if fundAddress is undefined (i.e. user hasnt a fund yet), we dispatch
  // this action to signal that we tried to get the users fund
  yield put(appActions.setUsersFund(fundAddress));
}

function* fund() {
  yield takeLatest(routeTypes.FUND, checkAndLoad);
  yield takeLatest(types.INFO_REQUESTED, requestInfo);
  // yield takeLatest(types.SET, checkAndLoad);
  yield takeLatest(ethereumTypes.ACCOUNT_CHANGED, getUsersFund);
}

export default fund;
