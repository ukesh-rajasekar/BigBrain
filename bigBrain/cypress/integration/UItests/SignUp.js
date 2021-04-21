context('Sign-Up flow - happy path', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/register');
    });

    it('Signed up successfully', () => {
        const name = 'maximus';
        const email = 'maximus@prime.com';
        const password = '****';
        const title = 'Dashboard'

        cy.get('input[name=name]')
            .focus()
            .type(name);

        
        cy.get('input[name=email]')
            .focus()
            .type(email);

            
        cy.get('input[name=password]')
        .focus()
        .type(password);

        cy.get('button')
        .contains('Signup')
        .click()

        cy.get('h1')
        .should('have.class', 'dashboard-title')
        .then((content) => { 
            expect(content.text()).to.contain(title)

        })
    })  



})