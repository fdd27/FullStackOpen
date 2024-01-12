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

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#input-username').type('fdd')
      cy.get('#input-password').type('asd')
      cy.get('#submit-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('notfdd')
      cy.get('#input-password').type('sad')
      cy.get('#submit-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})