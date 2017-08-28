import BigNumber from "bignumber.js";

import createVault from "../../../../lib/vault/transactions/createVault";
import subscribe from "../../../../lib/participation/transactions/subscribe";

const shared = {};

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

describe("Create fund, invest, take order, redeem", () => {
  it(
    "createVault",
    async () => {
      shared.vault = await createVault(`test-${randomString()}`);
    },
    30000,
  );

  it(
    "invest",
    async () => {
      console.log(shared);
      const txHash = await subscribe(
        shared.vault.address,
        new BigNumber(1),
        new BigNumber(1),
      );
      console.log(txHash);
    },
    120000,
  );
});
