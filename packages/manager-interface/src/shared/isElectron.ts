function isElectron(): boolean {
  if (global.navigator && global.navigator.userAgent) {
    const userAgent = global.navigator.userAgent.toLowerCase();
    return userAgent.indexOf(' electron/') > -1;
  }

  return false;
}

export default isElectron;
