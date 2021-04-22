context('Log out and Log in flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });

  it('Log in and Log out successfully', () => {
    const email = 'maximus@prime.com';
    const password = '****';

    cy.get('input[name=email]')
      .focus()
      .type(email);

    cy.get('input[name=password]')
      .focus()
      .type(password);

    cy.get('button[name=login]')
      .contains('Log In')
      .click()

    cy.get('button[name=createGame]')
      .then((content) => {
        expect(content.text()).to.contain('Create Game')
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
