describe('E2E Test Purchase Flow on Saucedemo page', { testIsolation: false }, () => {
    const users = ['standard_user', 'problem_user'];/* set de ambos usuarios en un array para luego 
    recorrer el array con el forEach y ejecutar los mismos tests para cada usuario */
    it('Should visit Saucemo.com', () =>{
        cy.visit('https://www.saucedemo.com');
    })
    users.forEach((userType) => { /* recorrido de users, por cada user se van a ejecutar cada it */
        describe(`Purchase flow for ${userType}`, () => {
            it(`Should login as ${userType}`, () => {
                cy.login(userType);
            });
            
            it('Should add products to cart if not already added', () => {
                cy.addProducts();
            });

            it('Should do checkout', () => {
                cy.checkout('Juan', 'Perez', '12345');
            });

            it('Should logout', () => {
                cy.logout();
            });
        });
    });
});
