import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';  
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, GET_BOOKS_BY_GENRE } from '../queries'

const NewBook = (props) => {
  // const allBooks = useQuery(ALL_BOOKS)
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  // const [allGenres, setAllGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK)

  // useEffect( () => {
  //   if (allBooks.data){

  //   }
  // }, [allBooks.data])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')

    createBook({  variables: { title, author, published, genres },
      refetchQueries: [
        { query: ALL_BOOKS }, 
        { query: ALL_AUTHORS },
      ],
      update: (store, response) => { // I'm confused why this is neccessary, shouldn't subscription/update cache take care of this?
        // I think key might be in here, need to update all of the genre queries, so this genre object should be everything, not just a few of them
        // Oh, but I think I only need to update the genre's I just created
        genres.forEach((genre) => {
          try {
            const dataInStore = store.readQuery({
              query: GET_BOOKS_BY_GENRE,
              variables: { genre }
            })
            store.writeQuery({
              query: GET_BOOKS_BY_GENRE, 
              variables: { genre },
              data: {
                allBooks: [...dataInStore.allBooks].concat(response.data.addBook)
              }
            })

          } catch(e) {
            console.log('not queried', genre)
          }
        })
      }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook