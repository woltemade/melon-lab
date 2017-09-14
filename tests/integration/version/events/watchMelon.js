import setupVault from "../../../../lib/version/transactions/setupVault";
import watchMelon from "../../../../lib/version/events/watchMelon";

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

xit(
  "wathVaultAssociated",
  async () => {
    await new Promise(() => {
      watchMelon("0x55a5108f08954d36560aced719716a5c5bbb9056", console.log);

      console.log("asdf");
      setupVault(`test-${randomString()}`);
      console.log("asdf");
    });
  },
  10 * 60 * 1000,
);
