context('Sign-Up flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });

  it('Signed up successfully', () => {
    const name = 'ferris bueller';
    const email = 'maximus@prime.com';
    const password = '****';

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

    cy.get('.Toastify__toast-body')
      .then((content) => {
        expect(content.text()).to.contain('Signed up Successfully')
      })
  })
})
