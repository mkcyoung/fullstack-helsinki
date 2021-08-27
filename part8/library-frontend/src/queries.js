import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author{
                name
                born
                bookCount
            }
            published
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
            author
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