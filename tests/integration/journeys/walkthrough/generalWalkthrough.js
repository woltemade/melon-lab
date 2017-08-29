import BigNumber from "bignumber.js";

import setup from "../../../../lib/utils/setup";
import trace from "../../../../lib/utils/trace";
import createVault from "../../../../lib/vault/transactions/createVault";
import subscribe from "../../../../lib/participation/transactions/subscribe";

const shared = {};

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

it(
  "Create fund, invest, take order, redeem",
  async () => {
    trace({
      message: `Start walkthrough with defaultAccount: ${setup.defaultAccount}`,
      data: setup,
    });

    shared.vault = await createVault(`test-${randomString()}`);
    trace({ message: `vaultCreated`, data: shared });

    const txHash = await subscribe(
      shared.vault.address,
      new BigNumber(1),
      new BigNumber(1),
    );
    trace({ message: `subscribed`, data: shared });
  },
  10 * 60 * 1000,
);
