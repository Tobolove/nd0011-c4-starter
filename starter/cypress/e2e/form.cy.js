const cy = require('cypress');

describe('Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Create Set Form', () => {
    beforeEach(() => {
      // Navigate to Card page and zoggle the form
      cy.get('[data-cy="nav-card-sets"]').click();
      cy.get('[data-cy="toggle_form"]').click();
    });

    it('should successfully create a new set with valid input (happy path)', () => {
      const setTitle = 'Test Study Set';
      // Fill in the form with the data
      cy.get('[data-cy="set_form"]').should('be.visible');
      cy.get('[data-cy="set_form"] input[name="titleInput"]').type(setTitle);
      // Submit the form
      cy.get('[data-cy="set_form"] input[type="submit"]').click();
      // Verify successful - should return  card  page with new set
      cy.get('[data-cy="main-content"]').should('contain', 'Study Set Library');
      cy.get('[data-cy="main-content"]').should('contain', setTitle);
      // Verify no error message is displayed
      cy.get('.error').should('not.exist');
    });

    it('should show error when submitting empty title (unhappy path)', () => {
      // Submit form with empty title
      cy.get('[data-cy="set_form"]').should('be.visible');
      cy.get('[data-cy="set_form"] input[type="submit"]').click();
      // Verify error message is displayed
      cy.get('.error').should('be.visible');
      cy.get('.error').should('contain', 'TITLE CANNOT BE EMPTY');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)'); // red color
      // Verify we're still on the form (didn't submit)
      cy.get('[data-cy="set_form"]').should('be.visible');
    });

    it('should successfully create set with whitespace-only title (current behavior)', () => {
      const whitespaceTitle = '   ';
      // Fill form with only whitespace (this is currently accepted by the validation)
      cy.get('[data-cy="set_form"]').should('be.visible');
      cy.get('[data-cy="set_form"] input[name="titleInput"]').type(whitespaceTitle);
      cy.get('[data-cy="set_form"] input[type="submit"]').click();
      // Verify successful  since validation doesn't trim whitespace
      cy.get('[data-cy="main-content"]').should('contain', 'Study Set Library');
      // Verify no error message is displayed
      cy.get('.error').should('not.exist');
    });
  });

  describe('Add Card Form', () => {
    beforeEach(() => {
      // Navigate to Card  page, create a set, and navigate to add cards
      cy.get('[data-cy="nav-card-sets"]').click();
      cy.get('[data-cy="toggle_form"]').click();
      cy.get('[data-cy="set_form"] input[name="titleInput"]').type('Test Set for Cards');
      cy.get('[data-cy="set_form"] input[type="submit"]').click();
      // Click on the newly created set to open the cards page
      cy.contains('Test Set for Cards').click();
      // Click the toggle button to show the Add Card form
      cy.get('[data-cy="toggle_form"]').click();
    });

    it('should successfully create a new card with valid input (happy path)', () => {
      const term = 'Test Term';
      const description = 'Test Description';
      // Fill in the form with valid data
      cy.get('[data-cy="card_form"]').should('be.visible');
      cy.get('[data-cy="card_form"] input[name="termInput"]').type(term);
      cy.get('[data-cy="card_form"] input[name="descriptionInput"]').type(description);
      // Submit the form
      cy.get('[data-cy="card_form"] input[type="submit"]').click();
      // Verify successful submission - card should be rendered
      cy.get('[data-cy="main-content"]').should('contain', term);
      cy.get('[data-cy="main-content"]').should('contain', description);
      // Verify no error message is displayed
      cy.get('.error').should('not.exist');
    });

    it('should show error when submitting empty term and description (unhappy path)', () => {
      // Submit form with both fields empty
      cy.get('[data-cy="card_form"]').should('be.visible');
      cy.get('[data-cy="card_form"] input[type="submit"]').click();
      // Verify error message is displayed
      cy.get('.error').should('be.visible');
      cy.get('.error').should('contain', 'TERM AND DESCRIPTION CANNOT BE EMPTY');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)'); // red color
      // Verify we're still on the form (didn't submit)
      cy.get('[data-cy="card_form"]').should('be.visible');
    });

    it('should show error when submitting empty term  (unhappy path)', () => {
      // Fill description but leave term empty
      cy.get('[data-cy="card_form"]').should('be.visible');
      cy.get('[data-cy="card_form"] input[name="descriptionInput"]').type('Test Description');
      cy.get('[data-cy="card_form"] input[type="submit"]').click();
      // Verify error message is displayed
      cy.get('.error').should('be.visible');
      cy.get('.error').should('contain', 'TERM CANNOT BE EMPTY');
    });

    it('should show error when submitting empty description (unhappy path)', () => {
      // Fill term but leave description empty
      cy.get('[data-cy="card_form"]').should('be.visible');
      cy.get('[data-cy="card_form"] input[name="termInput"]').type('Test Term');
      cy.get('[data-cy="card_form"] input[type="submit"]').click();
      // Verify error message is displayed
      cy.get('.error').should('be.visible');
      cy.get('.error').should('contain', 'DESCRIPTION CANNOT BE EMPTY');
    });

    it('should successfully create card with whitespace inputs (current behavior)', () => {
      // Fill both fields with whitespace (this is currently accepted by the validation)
      cy.get('[data-cy="card_form"]').should('be.visible');
      cy.get('[data-cy="card_form"] input[name="termInput"]').type('   ');
      cy.get('[data-cy="card_form"] input[name="descriptionInput"]').type('   ');
      cy.get('[data-cy="card_form"] input[type="submit"]').click();
      // Verify successful submission since validation doesn't trim whitespace
      cy.get('[data-cy="main-content"]').should('contain', '   ');
      // Verify no error message is displayed
      cy.get('.error').should('not.exist');
    });
  });
});