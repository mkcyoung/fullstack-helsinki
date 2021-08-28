import React from 'react'
import { useQuery } from '@apollo/client';  
import { GET_BOOKS_BY_GENRE } from '../queries'

const Recommended = (props) => {
    const genre = props.userGenre
    const result = useQuery(GET_BOOKS_BY_GENRE, {
         variables: {genre} 
    })

    if (!props.show){
        return null
    }

    if (result.loading){
        return <div>loading...</div>
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
                    {result.data.allBooks.map(a =>
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
