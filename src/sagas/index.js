import { fork } from "redux-saga/effects";

import fund from "./fund";
import ethereum from "./ethereum";
import setup from "./setup";

function* rootSaga() {
  yield fork(ethereum);
  yield fork(setup);
  yield fork(fund);
}

export default rootSaga;
