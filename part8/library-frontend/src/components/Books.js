import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';  
import { ALL_BOOKS, GET_BOOKS_BY_GENRE, BOOK_ADDED} from '../queries'

const Books = ( {show} ) => {
  
  const allBooks = useQuery(ALL_BOOKS)
  const [getBooksByGenre, getBooksByGenreResult] = useLazyQuery(GET_BOOKS_BY_GENRE)

  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  //Any time there's data and no genre, this will render
  useEffect(() => {
    console.log("In use effect")
    if (allBooks.data && !genre){
      const books = allBooks.data.allBooks
      setBooks(books)
      const genres = allBooks.data.allBooks.reduce( (previousValue, currentValue) => {
        currentValue = currentValue.genres.filter( genre => previousValue.indexOf(genre) === -1 )
        return [...previousValue, ...currentValue]
      },[])
      setGenres(genres)
    }
  }, [allBooks.data, genre])

  // this run when there is a query for genre books
  useEffect(() => {
    if (getBooksByGenreResult.data){
      setBooks(getBooksByGenreResult.data.allBooks)
    }
  }, [getBooksByGenreResult])

  if (!show) {
    return null
  }
  
  const filterBooks = (genre) => {
    setGenre(genre)
    genre && getBooksByGenre({ variables: { genre }})
  }

  return (
    <div>
      <h2>books</h2>
      {genre !== null ? <div>in genre <em>{genre}</em></div> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>filter by genre</h2>
      <button onClick={() => filterBooks(null)}>all genres</button>
      {genres.map(a => 
          <button key={a} onClick={() => filterBooks(a)}>{a}</button>)}
    </div>
  )
}

export default Books