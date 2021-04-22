context('Log out and Log in flow - happy path', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/');
    });

    it('Log in and Log out successfully', () => {
        const email = 'maximus@prime.com';
        const password = '****';
        const title = 'Dashboard'

        
        cy.get('input[name=email]')
            .focus()
            .type(email);

            
        cy.get('input[name=password]')
        .focus()
        .type(password);

        cy.get('button[name=login]')
        .contains('Log In')
        .click()

        cy.get('h1')
        .should('have.class', 'dashboard-title')
        .then((content) => { 
            expect(content.text()).to.contain(title)
        })

        cy.get('button[name=logout]')
        .click()

        cy.get('button')
        .contains('Log In')
        .then((content) => {
            expect(content.text()).to.contain('Log In')
        })

        
    })  



})