import createVault from "../../../../lib/vault/transactions/createVault";

const shared = {};

const randomString = (length = 4) =>
  Math.random().toString(36).substr(2, length);

describe("Create fund, invest, take order, redeem", async () => {
  await it(
    "createVault",
    async () => {
      shared.vault = await createVault(`test-${randomString()}`);
      console.log(shared);
    },
    300000,
  );
});
