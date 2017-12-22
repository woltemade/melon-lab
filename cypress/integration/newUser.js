const testMnemonic =
  "lunar vivid bird page manage gauge sorry panda source museum dutch color";
// const testAddress = "0xC84128806D7F650076d9e76003406E09705B3A76";

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

  it("Happy path with user from mnemonic", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[href='/setup']").click();
    cy.contains("Restore").click();
    cy.location("hash").should("eq", "#/account/restore");
    cy.get("[name='mnemonic']").type(testMnemonic);
    cy.get("form").submit();
    cy.get("[name='password']").type("password");
    cy.get("[name='repeat']").type("password");
    cy.get("form").submit();
  });
});
