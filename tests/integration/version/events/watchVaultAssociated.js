import createVault from "../../../../lib/vault/transactions/createVault";
import watchVaultAssociated from "../../../../lib/version/events/watchVaultAssociated";

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

it(
  "wathVaultAssociated",
  async () => {
    await new Promise(() => {
      watchVaultAssociated(
        "0x55a5108f08954d36560aced719716a5c5bbb9056",
        console.log,
      );

      console.log("asdf");
      createVault(`test-${randomString()}`);
      console.log("asdf");
    });
  },
  10 * 60 * 1000,
);
