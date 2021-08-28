import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';  
import { GET_USER, GET_BOOKS_BY_GENRE } from '../queries'

const Recommended = (props) => {
    // Alternative to this, I could have just loaded all books in a query, then handled the results with react!
    const user = useQuery(GET_USER)
    const [getBooksByGenre, getBooksByGenreResult] = useLazyQuery(GET_BOOKS_BY_GENRE)
    const [genre, setGenre] = useState(null)
    const [books, setBooks] = useState(null)

    useEffect(() => {
        console.log("In use effect")
        if (user.data){
          const genre = user.data.me.favoriteGenre
          setGenre(genre)
          getBooksByGenre({ variables: { genre }})
        }
      }, [user.data])

    useEffect(() => {
        if( getBooksByGenreResult.data ){ // you need to set this or else you will setbooks to undefined on first render
            setBooks(getBooksByGenreResult.data.allBooks)
        }
    }, [getBooksByGenreResult])

    if (!props.show){
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre <em>{genre}</em>
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
        </div>
        
        
    )
}

export default Recommended
