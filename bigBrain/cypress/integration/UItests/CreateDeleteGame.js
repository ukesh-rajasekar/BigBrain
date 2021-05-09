context('Create-Delete Game - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
  });

  it('Create, Delete Game successfully', () => {
    const email = 'maximus@prime.com';
    const password = '****';
    const gameName = 'test'

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

    cy.get('.Toastify__toast-body')
      .then((content) => {
        expect(content.text()).to.contain(`Game ${gameName} created`)
      })

    cy.get('button[name=edittesting]')
      .contains('Edit Game')
      .click()

    cy.get('button[name=deleteGame]')
      .click()

    cy.get('div')
      .then((content) => {
        expect(content.text()).to.not.equal(gameName)
      })
  })
})
