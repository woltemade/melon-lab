import { fork } from "redux-saga/effects";

import ethereum from "./ethereum";

function* rootSaga() {
  yield fork(ethereum);
}

export default rootSaga;
