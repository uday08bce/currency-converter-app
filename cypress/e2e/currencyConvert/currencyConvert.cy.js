describe('Currency Converter', () => {
    it('Converts currency correctly', () => {
      // Visit the application
      cy.visit('/');
  
      // Enter source currency, target currency, and amount
      cy.get('input[placeholder="Source Currency"]').type('USD');
      cy.get('input[placeholder="Target Currency"]').type('EUR');
      cy.get('input[placeholder="Amount"]').type('10');
  
      // Click on the convert button
      cy.get('button').click();
      // Validate the converted amount
      cy.contains('Converted Amount: 8.5');
    });
    it('Currency conversion does not exist', () => {
        // Visit the application
        cy.visit('/');
    
        // Enter source currency, target currency, and amount
        cy.get('input[placeholder="Source Currency"]').type('USD');
        cy.get('input[placeholder="Target Currency"]').type('INR');
        cy.get('input[placeholder="Amount"]').type('10');
    
        // Click on the convert button
        cy.get('button').click();
        // Validate the converted amount
        cy.contains('Converted Amount: Exchange rate not available for the given currency');
      });
  });
  