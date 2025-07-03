const cy = require('cypress');

describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Card Sets page when clicking "Card Sets" in the side menu', () => {
    cy.get('[data-cy="nav-card-sets"]').click();
    // Verify we're on the Card Sets page by checking for unique page content
    cy.get('[data-cy="main-content"]').should('contain', 'Study Set Library');
    cy.get('[data-cy="main-content"]').should('contain', 'Add New Set');
    cy.get('[data-cy="main-content"]').should('be.visible');
  });

  it('should navigate to About page when clicking "About" in the side menu', () => {
    cy.get('[data-cy="nav-about"]').click();
    // Verify we're on the About page by checking for unique page content
    cy.get('[data-cy="main-content"]').should('contain', 'About Study Night');
    cy.get('[data-cy="main-content"]').should('contain', 'Flash Cards Anywhere Anytime');
    cy.get('[data-cy="main-content"]').should('be.visible');
  });

  it('should navigate to Home page when clicking "Home" in the side menu', () => {
    cy.get('[data-cy="nav-home"]').click();
    // Verify we're on the Home page by checking for unique page content
    cy.get('[data-cy="main-content"]').should('contain', 'Study Night');
    cy.get('[data-cy="main-content"]').should('contain', 'A Digital Study Solution for the Modern World');
    cy.get('[data-cy="main-content"]').should('be.visible');
  });
});