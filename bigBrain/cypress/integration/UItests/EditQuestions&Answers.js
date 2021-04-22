context('Edit a Question and add answers- happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });

  it('Questions and Answers edited successfully', () => {
    const email = 'maximus@prime.com';
    const password = '****';
    const gameName = 'testing'
    // question should be created already
    const question = 'What makes a good leader?'
    const newQuestion = 'What makes a good follower'

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

    cy.get('button[name=edittesting]')
      .contains('Edit Game')
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
      .contains(question)
      .siblings('button')
      .contains('Edit question')
      .click()

    cy.get('input[name=question]')
      .focus()
      .clear()
      .type(newQuestion)

    cy.get('select')
      .select('single-choice')

    cy.get('input[name=timeLimit]')
      .focus()
      .clear()
      .type('60')

    cy.get('input[name=points]')
      .focus()
      .clear()
      .type('40')

    cy.get('input[name=addAnswer]')
      .focus()
      .type('audacity')

    cy.get('button[name=addAnswer]')
      .click()

    cy.get('input[name=addAnswer]')
      .focus()
      .clear()
      .type('empathy')

    cy.get('button[name=addAnswer]')
      .click()

    cy.get('input[name=isCorrectAnswer]')
      .check()

    cy.get('button[name=save]')
      .click()

    cy.get('.Toastify__toast-body')
      .then((content) => {
        expect(content.text()).to.contain('Save Success')
      })
  })
})
