import React, { useState } from 'react'
import { useMutation } from '@apollo/client';  
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries'


const SetYear = (props) => {

    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')

    const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
      })

    const submit = async (event) => {
        event.preventDefault()
        
        setBirthYear({  variables: { author, year } })

        setYear('')
        setAuthor('')
    }

    return (
        <div>
            <form onSubmit={submit}>
            <div>
                name
                <input
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                born
                <input
                value={year}
                onChange={({ target }) => setYear(parseInt(target.value))}
                />
            </div>
            <button type='submit'>update author</button>
            </form>
        </div>
    )
}


export default SetYear