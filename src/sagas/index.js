import { fork } from "redux-saga/effects";

import administration from "./administration";
import ethereum from "./ethereum";
import fund from "./fund";
import setup from "./setup";

function* rootSaga() {
  yield fork(administration);
  yield fork(ethereum);
  yield fork(fund);
  yield fork(setup);
}

export default rootSaga;
