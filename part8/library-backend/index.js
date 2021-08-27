const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const typeDefs = gql`
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
      addBook: async (root, args) => {
        let author = await Author.findOne({ name: args.author })
        if (!author){
          author = new Author({ "name": args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author._id })
        try{
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      },
      editAuthor: async (root, args) => {
        const author = await Author.findOne({ name:  args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        return author.save()
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})