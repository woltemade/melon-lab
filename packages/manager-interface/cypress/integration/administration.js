import wallet from "../fixtures/walletReadyToTrade.json";

it("Disable subscription", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Disable subscription").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
  cy.contains("Enable subscription", { timeout: 60000 }).should("be.visible");
});

it("Enable subscription", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Enable subscription").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
  cy.contains("Disable subscription", { timeout: 60000 }).should("be.visible");
});

it("Disable redemption", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Disable redemption").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
  cy.contains("Enable redemption", { timeout: 60000 }).should("be.visible");
});

it("Enable redemption", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Enable redemption").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
  cy.contains("Disable redemption", { timeout: 60000 }).should("be.visible");
});

it("Convert unclaimed rewards", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Convert unclaimed rewards").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
});

it("Shut down fund", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("shut down fund").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
});
