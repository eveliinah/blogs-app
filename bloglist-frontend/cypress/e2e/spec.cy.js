describe('blog tests', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Eveliina Heino',
      username: 'eve',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('login tests', function()  {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('eve')
      cy.get('#password').type('1234')
      cy.get('#logB').click()
      cy.get('#logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('maija')
      cy.get('#password').type('1234')
      cy.get('#logB').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(142, 59, 70)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'eve', password: '1234' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://localhost:3000/')

      cy.get('#create').click()

      cy.get('.blogs').contains('Blog created by cypress')
    })

    describe('test blogs created', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Existing blog',
          author: 'Cypress',
          url: 'https://fullstackopen.com/osa5/end_to_end_testaus'
        })

        cy.createBlog({
          title: 'Second blog',
          author: 'Cypress',
          url: 'https://fullstackopen.com/osa5/end_to_end_testaus'
        })
      })
      it('You can give a like to blog', () => {
        cy.contains('Existing blog')
          .contains('view')
          .click()

        cy.contains('Existing blog')
          .should('contain', 'https://fullstackopen.com/osa5/end_to_end_testaus')
          .and('have.property', 'hide')

        cy.contains('Existing blog').contains('like').click()

        cy.contains('Existing blog')
          .contains('likes 1')
      })

      it('You delete blog', () => {
        cy.contains('Existing blog')
          .contains('view')
          .click()

        cy.contains('Existing blog')
          .get('#delete')
          .click()

        cy.on('window:confirm', () => true)

        cy.get('.notification')
          .should('contain', 'Existing blog by Cypress deleted')
          .and('have.css', 'color', 'rgb(50, 104, 39)')

        cy.get('.blogs').contains('Existing blog').should('not.exist')

      })


      it('Blogs are ordered correctly', () => {
        cy.contains('Existing blog')
          .contains('view')
          .click()

        cy.contains('Existing blog').contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'Existing blog').and('contain', 'likes 1')

        cy.contains('Second blog')
          .contains('view')
          .click()
        cy.get('.blog').eq(1).should('contain', 'Second blog').and('contain', 'likes 0')

        cy.contains('Second blog').contains('like').click()
        cy.contains('Second blog').contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'Second blog').and('contain', 'likes 2')
      })

    })
  })
})

