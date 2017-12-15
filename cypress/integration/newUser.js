describe("Account creation", () => {
  it("Walk through", () => {
    cy.visit("http://localhost:3000/#/newuser");
    cy.contains("Generate my wallet!").click();
    cy.contains("I wrote down my mnemonic phrase in a safe place.").click();
  });
});
