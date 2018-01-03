import wallet from "../fixtures/walletReadyToTrade.json";

xit(
  "Can take an order from the orderbook on the asset pair ETH-T/MLN-T, with 1 MLN",
  () => {
    cy.visit("http://localhost:3000/");
    window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
    cy.get("#BuyOrders", { timeout: 10000 }).click();
    cy.get("#trade-total").type("1.0000");
    cy.get("#tradeButton").click();
    cy.get("[name='password']").type("password");
    cy.get("form[data-hook=modal]").submit();
  },
);

it("Can place an order for the asset pair ETH-T/MLN-T", () => {
  cy.visit("http://localhost:3000/");
  window.localStorage.setItem("wallet:melon.fund", JSON.stringify(wallet));
  cy.contains("Limit").click();
  cy.get("#switchButton").click();
  cy.get("#trade-price").type("6.0000");
  cy.get("#trade-quantity").type("0.5000");
  cy.get("#trade-total").type("3.0000");
  cy.get("#tradeButton").click();
  cy.get("[name='password']").type("password");
  cy.get("form[data-hook=modal]").submit();
});
