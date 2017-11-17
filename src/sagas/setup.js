function* createFund();

function* setup() {
  yield takeEvery(types.CREATE, createFund);
}
