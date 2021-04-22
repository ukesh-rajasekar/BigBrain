context('Start game, Stop game, See Results page - happy path', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/');
    });

    it('Start, Stop, See Results successfully', () => {
        const email = 'maximus@prime.com';
        const password = '****';
        //game should be present before starting
        const gameName = 'max'

        
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
        .then(() => {
            Cypress.config('defaultCommandTimeout', 1000);
          });



        cy.get('.mr-auto')
      .invoke('attr', 'href')
      .contains('Games')
      .click() 

      cy.get(`button[name=${gameName}]`)
      .contains('Start game')
      .click()

      cy.get('.Toastify__toast-body')
      .then((content) => {
        expect(content.text()).to.contain('Game started')
          
      }) 

      cy.get(`button[name=${gameName}]`)
      .contains('End game')
      .click()


      cy.get('.Toastify__toast-body')
      .then((content) => {
        expect(content.text()).to.contain('Game ended')
          
      }) 
        
   
      cy.get('button[name=yes]')
      .click()



      cy.get('h3').then((content) => {
        expect(content.text()).to.contain('LeaderBoard(TOP 5)')
    })

        
    })  



})