const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')
const LibUser = require('./models/user')

const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const JWT_SECRET = config.JWT_SECRET

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const typeDefs = gql`

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String!]!
        ): Book,
        editAuthor(
          name: String!
          setBornTo: Int!
        ): Author
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        
        const author = await Author.findOne({ name: { $eq: args.author }}) 

        return  Book 
                  .find({ author: author ? {$eq: author._id} : {$exists: true} }) 
                  .find({ genres: args.genre ? {$in: args.genre} : {$exists: true} })
      },
      allAuthors: () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return {
        name: author.name,
        born: author.born || null,
        id: root.author //.toString()
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: { $eq: root.id } })
      return books.length
    }
  },
  Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        let author = await Author.findOne({ name: args.author })
        if (!author){
          author = new Author({ "name": args.author })
        }
        const book = new Book({ ...args, author: author._id })
        try{
          await book.save()
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const author = await Author.findOne({ name:  args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        return author.save()
      },
      createUser: (root, args) => {
        const user = new LibUser({ username: args.username, favoriteGenre: args.favoriteGenre })

        return user.save()
          .catch(error => {
            throw new UserInputError(err.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await LibUser.findOne({ username: args.username })

        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await LibUser.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})