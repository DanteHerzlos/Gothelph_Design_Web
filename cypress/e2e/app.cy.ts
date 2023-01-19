/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Navigation", () => {
  it("should open main page", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").contains("Gothelph Design");
  });

  it("should navigate to the custom page", () => {
    cy.visit("http://localhost:3000/");
    cy.scrollTo(0, 2500);
    cy.get('[data-testid="custom"]').click();
    cy.url().should("include", "/custom");
    cy.get("h1").contains("GOTHELPH CUSTOM");
  });

  it("should navigate to the clothes page", () => {
    cy.visit("http://localhost:3000/");
    cy.scrollTo(0, 2500);
    cy.get('[data-testid="clothes"]').click();
    cy.url().should("include", "/clothes");
    cy.get("h1").contains("GOTHELPH CLOTHES");
  });

  it("should navigate to the art page", () => {
    cy.visit("http://localhost:3000/");
    cy.scrollTo(0, 2500);
    cy.get('[data-testid="arts"]').click();
    cy.url().should("include", "/arts");
    cy.get("h1").contains("GOTHELPH ARTS");
  });

  it("should navigate to the auto page", () => {
    cy.visit("http://localhost:3000/");
    cy.scrollTo(0, 2500);
    cy.get('[data-testid="auto"]').click();
    cy.url().should("include", "/auto");
    cy.get("h1").contains("GOTHELPH AUTO");
  });
});

describe("Sidenavbar", () => {
  it("should open links from sidebar", () => {
    cy.visit("http://localhost:3000/custom");
    
    cy.get('[data-testid="sidebar_open_btn"]').click();
    cy.get('[data-testid="arts"]').click();
    cy.url().should("include", "/arts");

    cy.get('[data-testid="sidebar_open_btn"]').click();
    cy.get('[data-testid="clothes"]').click();
    cy.url().should("include", "/clothes");

    cy.get('[data-testid="sidebar_open_btn"]').click();
    cy.get('[data-testid="auto"]').click();
    cy.url().should("include", "/auto");

    cy.get('[data-testid="sidebar_open_btn"]').click();
    cy.get('[data-testid="custom"]').click();
    cy.url().should("include", "/custom");

    cy.get('[data-testid="sidebar_open_btn"]').click();
    cy.get('[data-testid="home"]').click();
    cy.get("h1").contains("Gothelph Design");
  });
});

export {};
