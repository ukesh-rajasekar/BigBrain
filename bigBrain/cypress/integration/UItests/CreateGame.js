context('Log In and Create Game - happy path', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/');
    });

    it('Create Game successfully', () => {
        const email = 'maximus@prime.com';
        const password = '****';
        const gameName = 'test game'

        
        cy.get('input[name=email]')
            .focus()
            .type(email);

            
        cy.get('input[name=password]')
        .focus()
        .type(password);

        cy.get('button')
        .contains('Log In')
        .click()


        cy.get('button[name=createGame]')
        .click()
        

        cy.get('input[name=name]')
        .focus()
        .type(gameName)

       
        cy.get('button[name=confirmGame]')
        .click()

        cy.get('h3')
        .should('contain', gameName)
        .then((content) => {
            expect(content.text()).to.contain(gameName)
        })

        
    })  



})