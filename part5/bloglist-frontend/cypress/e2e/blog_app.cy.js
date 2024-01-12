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

  it('Login form is shown', function () {
    cy.get('#input-username').should('exist')
    cy.get('#input-password').should('exist')
    cy.get('#submit-button').should('exist')
  })

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#input-username').type('fdd')
      cy.get('#input-password').type('asd')
      cy.get('#submit-button').click()

      cy.contains('blogs')
    })

    it('Fails with wrong credentials', function () {
      cy.get('#input-username').type('notfdd')
      cy.get('#input-password').type('sad')
      cy.get('#submit-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'fdd', password: 'asd' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testurl.com')
      cy.get('#btnCreate').click()

      cy.contains('testTitle')
      cy.contains('testAuthor')
    })

    describe('When a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testurl.com' })
      })

      it('Blog can be liked', function () {
        cy.get('#btnView').click()
        cy.get('#btnLike').click()
        cy.get('.success').should('contain', 'Added a like')
      })

      it('Blog can be deleted', function () {
        cy.get('#btnView').click()
        cy.get('#btnDelete').click()
        cy.get('.success').should('contain', 'Deleted testTitle from testAuthor')
        cy.get('.short-view').should('not.exist')
      })

      it('Delete button is only seen by creator', function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, { name: 'tester', username: 'testUsername', password: 'testPassword' })
        cy.login({ username: 'testUsername', password:'testPassword' })

        cy.get('#btnView').click()
        cy.get('#btnDelete').should('not.exist')
      })
    })
  })
})