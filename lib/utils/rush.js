const rush = async (promise, errMsg, wait = 30000) =>
  wait
    ? Promise.race([
        promise,
        new Promise((resolve, reject) =>
          global.setTimeout(
            () =>
              reject(
                `${promise} took longer than ${wait /
                  1000} seconds to fulfill/reject: ${errMsg}`,
              ),
            wait,
          ),
        ),
      ])
    : promise;

export default rush;
