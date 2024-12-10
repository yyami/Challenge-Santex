// Login command
Cypress.Commands.add('login', (userType) => {
    cy.fixture('users').then((users) => {
        const user = users[userType];
        cy.get('#user-name').type(user.username);
        cy.get('#password').type(user.password);
        cy.get('#login-button').click();
        cy.get('.title').contains('Products');
    });
});

// Add products to cart
Cypress.Commands.add('addProducts', () => {
    /* recorre cada item de la lista para verificar que el botón tenga la opcion de agregar al carrito y solo en ese caso hace click para agregar un producto */
    cy.get('.inventory_item button').each(($btn) => { 
        if ($btn.text() === 'Add to cart') {
            cy.get($btn).click();
        }
    });
    cy.get('.shopping_cart_badge').contains('6');
});

// Checkout command
Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
    cy.get('.shopping_cart_link').click();
    cy.get('#checkout').click();
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#postal-code').type(postalCode);
    cy.get('#continue').click();
    cy.get('#finish').click();
    cy.wait(3000);
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
});

// Logout
Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.wait(3000)
})