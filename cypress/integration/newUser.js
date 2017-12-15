describe("Account creation", () => {
  it("Walk through", () => {
    cy.visit("http://localhost:3000/#/newuser");
    cy.contains("Generate my wallet!").click();
  });
});
