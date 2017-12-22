describe("Account creation", () => {
  it("Walk through happy path", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[href='/setup']").click();
    cy.contains("Generate").click();
    cy.contains("I wrote down").click();
    cy.get("[name='password']").type("password");
    cy.get("[name='repeat']").type("password");
    cy.get("form").submit();
    cy.get("[href*='faucet']", { timeout: 30000 }).then(links => {
      // HACK HACK: Circumventing the target=blank thing
      // https://docs.cypress.io/guides/guides/web-security.html#One-Superdomain-per-Test
      const link = links.length ? links[0] : links;
      link.target = "";
      link.click();
    });
    // cy.contains("Generate my wallet!").click();
    // cy.contains("I wrote down my mnemonic phrase in a safe place.").click();
  });
});
