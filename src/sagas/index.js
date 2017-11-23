import { fork } from "redux-saga/effects";

import ethereum from "./ethereum";
import setup from "./setup";

function* rootSaga() {
  yield fork(ethereum);
  yield fork(setup);
}

export default rootSaga;
