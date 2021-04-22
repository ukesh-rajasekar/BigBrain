context('Create and Delete a game questions - happy path', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/');
    });

    it('Questions created and deleted successfully', () => {
        const email = 'maximus@prime.com';
        const password = '****';
        const gameName = 'testing'
        const question = 'What makes a good leader?'

        
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

        cy.get('button[name=createGame]')
        .click()

        
        cy.get('div')
        .contains(gameName)
        .siblings('button')
        .click()


        cy.get('button[name=createQuestion]')
        .click()

        cy.get('input')
        .focus()
        .type(question)

        cy.get('button[name=addQuestion]')
        .click()

        cy.get('button[name=closeQuestion]')
        .click()




        cy.get('div')
        .then((content) => {
            expect(content.text()).to.contain(question)
        })

        cy.get('div')
        .contains(question)
        .siblings('button')
        .contains('Delete question')
        .click()


        cy.get('div')
        .then((content) => {
            Cypress.config('defaultCommandTimeout', 1000);
            expect(content.text()).to.not.contain(question)
        })


        
    })  



})