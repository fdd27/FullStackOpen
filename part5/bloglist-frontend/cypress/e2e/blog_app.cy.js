describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Kristiyan Ivanov',
      username: 'fdd',
      password: 'asd'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.get('#input-username').should('exist')
    cy.get('#input-password').should('exist')
    cy.get('#submit-button').should('exist')
  })
})