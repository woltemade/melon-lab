import wallet from "../fixtures/walletReadyToTrade.json";

it("There is a twitter button", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.get("[href*='https://twitter.com/intent/tweet']").should("be.visible");
});
