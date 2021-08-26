import React, { useState, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client';  
import { ALL_AUTHORS, SET_BIRTH_YEAR } from '../queries'
import Select from 'react-select';

const SetYear = (props) => {

    const [author, setAuthor] = useState(null)
    const [year, setYear] = useState('')

    const selectInputRef = useRef();

    const result = useQuery(ALL_AUTHORS) // may need some async handling or something with this?

    const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
      })

    if (result.loading) {
        return <div> loading ...</div>
    }
    const allAuthors = result.data.allAuthors.map(a=> { return { 'value': a.name, 'label':a.name } })

    const submit = async (event) => {
        event.preventDefault()
        
        setBirthYear({  variables: { author: author.value, year } })

        setAuthor(null)
        setYear('')
        selectInputRef.current.select.clearValue();
    }

    return (
        <div>
            <form onSubmit={submit}>
            <Select
                ref={selectInputRef}
                defaultValue={author}
                onChange={setAuthor}
                options={allAuthors}
            />
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