import wallet from "../fixtures/walletReadyToTrade.json";

it("Disable subscription", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Disable subscription").click();
});
