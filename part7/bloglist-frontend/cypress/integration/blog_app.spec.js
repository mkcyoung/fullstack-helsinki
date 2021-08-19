describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Michael Young',
      username: 'myoung',
      password: 'password'
    }
    const user2 = {
      name: 'Jared Leto',
      username: 'jleto',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('myoung')
      cy.get('#Password').type('password')
      cy.get('#login-button').click()

      cy.contains('Michael Young logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('myoung')
      cy.get('#Password').type('wrong-password')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('.error')
        .should('contain','Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function (){
      // log in here - use command defined in support/command.js
      cy.login({ username: 'myoung', password: 'password' })
    })

    it('A blog can be created', function(){

      cy.contains('create new blog').click()
      cy.get('#Title').type('Doofus Rules')
      cy.get('#Author').type('Doofus')
      cy.get('#Url').type('www.doofus.com')
      cy.get('#create-blog-button').click()

      cy.contains('Doofus Rules')
      cy.request('GET','http://localhost:3003/api/blogs').its('body').should('have.length',1)

    })

    describe('And a single blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title:'hello world',
          author:'Steve Jobs',
          url:'www.apple.com',
          likes: 0 })
      })

      it('A user can like a blog', function (){
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        // cy.get('@newBlog').then( blog => {
        //     cy.get('#like-button').should('contain.text',blog.likes + 1)
        // })
        cy.contains('likes: 1')
      })

      it('The user who created it can delete it', function () {
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('#remove-button').should('not.exist')
      })

      it('A different user cannot delete it', function () {
        //logout
        cy.get('#logout-button').click()
        //log in a different user
        cy.login({ username: 'jleto', password: 'password' })
        //attempt to delete
        cy.get('#view-button').click()
        cy.get('#remove-button').should('not.exist')
      })

    })

    describe('And multiple blogs exist', function() {
      beforeEach(function () {
        cy.createBlog({ title:'hello world', author:'Steve Jobs', url:'www.apple.com', likes:1 })
        cy.createBlog({ title:'apples are good', author:'Steve Jobs 2', url:'www.apple.com', likes:20 })
        cy.createBlog({ title:'mamma mia', author:'Steve Jobs 3', url:'www.apple.com', likes:4 })
      })

      it('the blogs are ranked in order of their likes', function (){
        // find all the blogs
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs).first().should('contain','apples are good')
          cy.wrap(blogs).last().should('contain','hello world')
          // const blogOrder = blogs.map((i,el) => {
          //     cy.wrap(el).find('#view-button').click()
          //     cy.get('#likes').invoke('text')
          // })
          // cy.log(blogOrder)

        })
      })
    })



  })
})