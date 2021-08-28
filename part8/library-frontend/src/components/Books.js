import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';  
import { ALL_BOOKS, GET_BOOKS_BY_GENRE, BOOK_ADDED} from '../queries'

const Books = ( {show} ) => {
  
  const allBooks = useQuery(ALL_BOOKS)
  const [getBooksByGenre, result] = useLazyQuery(GET_BOOKS_BY_GENRE, {
    fetchPolicy: "no-cache" //Lazy, but I'm tired, alternatively could manually update the cache using client, etc.
  })
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState('all')

  // useSubscription(BOOK_ADDED, {
  //   onSubscriptionData: 
  // })

  useEffect(() => {
    if(allBooks.data){
      setBooks(allBooks.data.allBooks)
    }
    
  }, [allBooks])

  useEffect(() => {
    if (result.data){
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  if (result.loading || allBooks.loading)  {
    return <div>loading...</div>
  }
  
  const genres = allBooks.data.allBooks.reduce( (previousValue, currentValue) => {
    currentValue = currentValue.genres.filter( genre => previousValue.indexOf(genre) === -1 )
    return [...previousValue, ...currentValue]
  },[])

  const filterBooks = (genre) => {

    setGenre(genre)
    genre === 'all' ? setBooks(allBooks.data.allBooks) : getBooksByGenre({ variables: { genre }})
  }

  return (
    <div>
      <h2>books</h2>
      {genre !== 'all' ? <div>in genre <em>{genre}</em></div> : null}
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
      <button onClick={() => filterBooks('all')}>all genres</button>
      {genres.map(a => 
          <button key={a} onClick={() => filterBooks(a)}>{a}</button>)}
    </div>
  )
}

export default Books