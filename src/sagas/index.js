import { fork } from "redux-saga/effects";

import app from "./app";
import ethereum from "./ethereum";
import setup from "./setup";

function* rootSaga() {
  yield fork(app);
  yield fork(ethereum);
  yield fork(setup);
}

export default rootSaga;
