import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
            born
            bookCount
        }
        published
        genres
    }
`


export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const GET_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`


export const GET_BOOKS_BY_GENRE = gql`
    query getBooksByGenre($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published:Int, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author{
                name
                born
                bookCount
            }
            published
            genres
        }
    }
`

export const SET_BIRTH_YEAR = gql`
    mutation setBirthYear($author: String!, $year: Int!) {
        editAuthor(
            name: $author,
            setBornTo: $year,
        ){
            name
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`