import wallet from "../fixtures/walletReadyToTrade.json";

const testMnemonic =
  "lunar vivid bird page manage gauge sorry panda source museum dutch color";
// const testAddress = "0xC84128806D7F650076d9e76003406E09705B3A76";

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

describe("Account creation", () => {
  it("Create a new user", () => {
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

  it("Import user from mnemonic", () => {
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
    /*
    TODO: Redirect if user already has a fund
    cy.get("[name='name']").type(`test-${randomString()}`);
    cy.get("form").submit();
    cy.contains("Confirm transaction").should("be.visible");
    cy.get("[name='password']").type("password");
    cy.get("form[data-hook=modal]").submit();
    */
  });
});
