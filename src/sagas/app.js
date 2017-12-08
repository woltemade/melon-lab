import BigNumber from "bignumber.js";
import { takeLatest, select, put } from "redux-saga/effects";
import { networks } from "@melonproject/melon.js";
import { onboardingPath } from "../reducers/app";
import { actions, types } from "../actions/app";

const getOnboardingState = ({ ethereum, app, fund }) => {
  if (!ethereum.isConnected) return onboardingPath.NO_CONNECTION;
  if (ethereum.network !== networks.KOVAN) return onboardingPath.WRONG_NETWORK;
  if (!ethereum.account) return onboardingPath.NO_ACCOUNT;
  if (
    new BigNumber(ethereum.ethBalance).eq(0) ||
    new BigNumber(ethereum.mlnBalance).eq(0)
  )
    return onboardingPath.INSUFFICENT_FUNDS;
  if (!app.usersFund) return onboardingPath.NO_FUND_CREATED;
  if (
    ethereum.address === fund.owner &&
    new BigNumber(fund.personalStake).eq(0)
  )
    return onboardingPath.NOT_INVESTED_IN_OWN_FUND;
  return onboardingPath.ONBOARDED;
};

function* deriveReadyState() {
  const { app, ethereum, fund } = yield select(state => state);

  const isReadyToVisit = ethereum.network === "42";

  const isReadyToInteract =
    isReadyToVisit &&
    ethereum.blockNumber > 0 &&
    !ethereum.syncing &&
    !!ethereum.account &&
    new BigNumber(ethereum.ethBalance).gt(0);

  const isReadyToInvest =
    isReadyToInteract && new BigNumber(ethereum.mlnBalance).gt(0);

  const isReadyToTrade = isReadyToInteract && !!app.usersFund;

  const readyState = {
    isReadyToVisit,
    isReadyToInteract,
    isReadyToInvest,
    isReadyToTrade,
    onboardingState: getOnboardingState({ app, ethereum, fund }),
  };

  const hasChanged = Object.entries(readyState).reduce(
    (acc, [key, value]) => acc || value !== app[key],
    false,
  );

  if (hasChanged) yield put(actions.setReadyState(readyState));
}

const onlyMelonActions = action =>
  action.type !== types.SET_READY_STATE && action.type.includes("melon");

function* appSaga() {
  yield takeLatest(onlyMelonActions, deriveReadyState);
}

export default appSaga;
