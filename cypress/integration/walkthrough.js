const testMnemonic =
  "lunar vivid bird page manage gauge sorry panda source museum dutch color";
// const testAddress = "0xC84128806D7F650076d9e76003406E09705B3A76";

const wallet = {
  address: "c84128806d7f650076d9e76003406e09705b3a76",
  id: "2fd2412d-2230-4c35-af71-413c37820942",
  version: 3,
  Crypto: {
    cipher: "aes-128-ctr",
    cipherparams: { iv: "7052f26d982b2dbcb7e7d323ee850774" },
    ciphertext:
      "3b631e8c8e8a51ac6af071415b5c0701022b50d1d1b64b7e0e876d301375d3bd",
    kdf: "scrypt",
    kdfparams: {
      salt: "22b6afe27e42dae9621b0c840508df75fbf5ca7404e951a33dc786049ec7801c",
      n: 131072,
      dklen: 32,
      p: 1,
      r: 8,
    },
    mac: "23bfa2f305ee9536d86ee5cf67b80ea49eb7b6baed3158ee92491253f0e3f323",
  },
};

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

describe("Account creation", () => {
  xit("Create a new user", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[href='/setup']").click();
    cy.location("hash").should("eq", "#/account/");
    cy.contains("Generate").click();
    cy.contains("I wrote down").click();
    cy.get("[name='password']").type("password");
    cy.get("[name='repeat']").type("password");
    cy.get("form").submit();
    cy.get("[href*='faucet']", { timeout: 30000 }).should("be.visible");
  });

  xit("Import user from mnemonic", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[href='/setup']").click();
    cy.contains("Restore").click();
    cy.location("hash").should("eq", "#/account/restore");
    cy.get("[name='mnemonic']").type(testMnemonic);
    cy.get("form").submit();
    cy.get("[name='password']").type("password");
    cy.get("[name='repeat']").type("password");
    cy.get("form").submit();
    cy.get("[name='name']", { timeout: 30000 }).should("be.visible");
    cy.location("hash").should("eq", "#/setup");
  });

  it("Setup fund from existing user", () => {
    cy.visit("http://localhost:3000/#/setup");
    window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
    cy.get("[href='/setup']").click();
    cy.location("hash").should("eq", "#/setup");
    cy.get("[name='name']").type(`test-${randomString()}`);
    cy.get("form").submit();
    cy.contains("Confirm transaction").should("be.visible");
    cy.get("[name='password']").type("password");
    cy.get("form[data-hook=modal]").submit();
  });
});
