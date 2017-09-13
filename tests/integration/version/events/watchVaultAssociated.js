import watchVaultAssociated from "../../../../lib/version/events/watchVaultAssociated";

it(
  "wathVaultAssociated",
  async () => {
    await new Promise(() => {
      watchVaultAssociated("0x55a5108f08954d36560aced719716a5c5bbb9056");
    });
  },
  10 * 60 * 1000,
);
